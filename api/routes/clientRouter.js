const bcrypt = require('bcrypt');
const express = require('express');
const clientRouter = express.Router();
const clientModel = require('../models/clientModel');
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const nodemailer =require('nodemailer');
const { google } = require('googleapis');
const hbs = require('nodemailer-express-handlebars');
const randomToken = require('randomstring');
const sendMail = require('../mailer');

clientRouter.post('/api/user/register' , async  (req,res)=>{
    
   try {
        // check the validity of the infos
        let { firstName,lastName , address,phone,postalCode,email , password , password2 } = req.body;
        // removing whitespaces
        firstName = firstName.trim();
        lastName = lastName.trim();
        address = address.trim();
        phone = phone.trim();
        postalCode = postalCode.trim();
        email = email.trim();
        password = password.trim();
        password2 = password2.trim();


        let errors = [];

        if( 
            !firstName || 
            !lastName ||
            !address || 
            !phone || 
            !postalCode || 
            !email || 
            !password ||
            !password2
        )
        {
            errors.push('Please fill all the fields !');
        }

        if( !email.match(emailFormat) && errors.length ==0)
            errors.push('Please enter a valid email !');

        if( password !== password2 && errors.length ==0 )
            errors.push('verify your second password !');
        else if( password.length < 8 && errors.length ==0){
            errors.push( 'The password should contain 8 charachters at least !' );
        }

        let saveResult = null;
        if( errors.length === 0)
        {
            saveResult = await clientModel.save( {
                firstName ,
                lastName ,
                address , 
                phone , 
                postalCode ,
                email ,
                password 
            } );
            if( saveResult.errorCode )
            {
                errors = ['Internal error please try later !'];
            }
            else if( saveResult.emailInUse)
            {
                errors.push( 'Email already in use !');
            }
        }
        
        // if there is any error inform the user
        if( errors.length>0){
            res.send( { errors } );
        }
        else
        {
            const client = await clientModel.getUserById(saveResult.insertedId);
            await sendMail(client.data.email,client.data.token);
            res.send(saveResult);
        }
        
   } catch (error) {
       console.log( error);
   }
});


clientRouter.post('/api/user/update' , async (req,res)=>{
    const { firstName , lastName , address , postalCode, phone } = req.body;
    const id = req.session.client_id;
    let errors =[];
    if( !firstName || 
        !lastName ||
        !address ||
        !postalCode || 
        !phone  )
    {
        errors.push('Please fill all the fields !');
    }

    if( errors.length>0)
        res.json({errors});
    else {
        const result =await clientModel.update({
            firstName,
            lastName , 
            phone ,
            address , 
            postalCode , 
            id
        });
        console.log(result);
        if( result.success )
            res.json({success : true});
        else res.json({success : false});
    }

});

clientRouter.post('/api/user/update-password', async (req,res)=>{
    const {oldPassword , newPassword , confirmPassword} = req.body;
    const id = req.session.client_id;
    let errors = [];

    if( !oldPassword ||  !newPassword || !confirmPassword  )
        errors.push('Please fill all the fields !');
    if( newPassword.length < 8 && errors.length == 0 )
        errors.push( 'The password should contain 8 charachters at least !' );
    if( newPassword !== confirmPassword  && errors.length == 0 )
        errors.push('verify your second password !');

    const client = await clientModel.getUserById(id);
    
    const cryptedPassword = client.data.password;
    const passwordMatch = await bcrypt.compare(oldPassword , cryptedPassword);
    console.log(passwordMatch);
    if( !passwordMatch && errors.length == 0)
        errors.push('Invalid password !');
    
    
    if( errors.length>0)
        res.json({errors});
    else 
    {
        const update_result = await clientModel.updatePassword(id,newPassword);

        if( update_result.success)
            res.json({ success : true});
        else
            res.json({ success : false});
    }


});

clientRouter.post('/api/user/login' ,async  (req,res)=>{

    let { email , password , remember_me } = req.body;
    // remove whitespace
    email = email.trim();
    password = password.trim();

    let errors = [];
    if( !email ){
        errors.push({ type : 'error' , message : 'Please fill the email field !'});
    }
    else if( !email.match(emailFormat) ){
        errors.push({ type : 'error' , message : 'Please enter a valid email !'});
    }
    if( !password ){
        errors.push({ type : 'error' , message : 'Please fill the password field !'});
    }

    if( errors.length>0){
        res.send({errors});
    }
    else 
    {
        const result =await  clientModel.getUser( email );

        if( result.success ){
            if( result.data){

                const client = result.data ;

                // check the password 
                const cryptedPassword = client.password;
                const passwordMatch = await bcrypt.compare(password , cryptedPassword);
                if( passwordMatch){
                    if( !client.email_confirmed)
                    {
                        errors.push({ type : 'info' , message : 'Please verify your email !'});
                        res.send({ errors });
                    }
                    else
                    {
                        if( remember_me )
                        req.session.cookie.maxAge = 1000* 60 * 60 * 24 * 14; // the cookie will expire in 2 weeks 
                    
                        req.session.client_id = client.id;
                        errors= [];
                        res.send({  
                            errors ,
                            clientData :  {email : client.email} , 
                            logged : true 
                        });
                    }
                   
                }
                else{
                    errors.push({type : 'error' , message : 'Invalid password !'});
                    res.send({errors});
                }
            }
            else {
                errors.push({ type : 'error' , message : 'Invalid email adress !'});
                res.send({errors});
            }
        }
        else 
        {
            errors = [
                {
                    type : 'error', 
                    message : 'Internal error please try later !'
                }
            ];
            res.send({errors});
        }

    }

});

clientRouter.get('/api/user/checkLoggedIn' , (req,res)=>{
    res.send({
        isLogged : req.session.client_id ? true : false ,
        client_id : req.session.client_id 
    });
});

clientRouter.get('/api/user/logout' , (req,res)=>{
    req.session.destroy( err=>{
        if( err )
            res.redirect('/');
        else {
            res.clearCookie('client_cookie');
            res.send({loggedout : true });
        }
    });


});


clientRouter.get('/api/users/notifications/:clientID', async (req,res)=>{
    const { clientID } = req.params;
    const response = await clientModel.getNotifications(clientID);
    const notifications = response.map(item=>{
        return {
            ...item , 
            is_checked : item.is_checked ? true : false
        }
    });
    res.json(notifications);
});

clientRouter.get('/api/user/getData' ,async  (req,res)=>{
    const client_id = req.session.client_id;
    const client = await clientModel.getUserById(client_id);
    if( client.success ) 
        res.send({client : client.data});
    else res.send({client : null });
});


clientRouter.post('/api/user/info' ,async  (req,res)=>{
    const client_id =  req.body.client_id;
    const client = await clientModel.getUserById(client_id);
    if( client.success ) 
        res.send({client : client.data});
    else res.send({client : null });
});


clientRouter.post('/api/user/update-notification-status/:notifID',async (req,res)=>{
    const { notifID } = req.params;
    const response = await clientModel.changeNotificationStatus(notifID);
    //console.log(response.data);
    res.json(response);
});

clientRouter.post('/api/user/sendemail',async (req,res)=>{
    // setting google credentials
    /*const Auth0 = google.auth.OAuth2;
    const authClient = new Auth0({
        clientId : '591889027671-jhjq0oec8aif3v96ma1jri5o8269kctf.apps.googleusercontent.com',
        clientSecret : 'g2xwpODdqJtxP2er5xYJZhpJ',
        redirectUri : 'https://developers.google.com/oauthplayground'
    });

    authClient.setCredentials({refresh_token : '1//04tFOVQVWvbHyCgYIARAAGAQSNwF-L9IrCmkpbyjacGKKuYJ6XkpQp5-hoSYH4wzMdSYtogC2l43wNgYousy_3XQiotCaj1iNHU0'});
    const accessToken = authClient.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
             type: "OAuth2",
             user: "med.dev.checker@gmail.com", 
             clientId: "591889027671-jhjq0oec8aif3v96ma1jri5o8269kctf.apps.googleusercontent.com",
             clientSecret: "g2xwpODdqJtxP2er5xYJZhpJ",
             refreshToken: "1//04tFOVQVWvbHyCgYIARAAGAQSNwF-L9IrCmkpbyjacGKKuYJ6XkpQp5-hoSYH4wzMdSYtogC2l43wNgYousy_3XQiotCaj1iNHU0"
        }
   });

   smtpTransport.use('compile' ,hbs({
        viewEngine : {
            extname : '.hbs',
            layoutsDir : 'mailTemplate' ,
            partialsDir : 'mailTemplate' , 
            defaultLayout : 'mail'
        },
        viewPath : 'mailTemplate',
        extName : '.hbs'
    }));

   const mailOptions = {
    from: "med.dev.checker@gmail.com",
    to: "mohammed.dev.rise@outlook.com",
    subject: "Node.js Email with Secure OAuth",
    template : 'mail' , 
    context : {
        msg : 'Activate account'
    }
    };

    

    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
   });
*/
    const mailSend = await sendMail('mohammed.dev.rise@outlook.com');
    console.log(mailSend);

   res.end();
});


clientRouter.post('/api/user/confirm-email', async (req,res)=>{
    // get token
    const { token }=req.body;
    const { success } = await clientModel.confirmEmail(token);
    const response = success ? 
    { type : 'success' , title : 'Success' , text : 'Your email has been verified successfuly !'} : 
    { type: 'error' , title : 'Error' , text : 'An error occued during email verification, please try later !'};
    
    res.json(response);
});

clientRouter.get('/api/token' , async (req, res)=>{
    const token = randomToken.generate();
    res.json({token});
});



module.exports = clientRouter;
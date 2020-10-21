const db = require('../db');
const bcrypt = require('bcrypt');
const randomString = require('crypto-random-string');
const query = require('../db_helper');


const Client = {

    save :async  (user)=>{

        return  new Promise (async (resolve,reject)=>{
           try 
           {

               // generate a random token , this is usfel for email confirmation
               const generatedToekn = randomString({length : 25});
               // get the highest rate 
               let rate = null;
               const result_rate = await Client.getHighestRate();
               if( result_rate.success )
               {
                   rate = result_rate.data;
               }
                // cehck if email is in use
                db.query( 'SELECT DISTINCT 1 FROM client WHERE email = ? ',[user.email],async (err,res)=>{
                    if( err )
                        return resolve({errorCode:-1});
                    
                    if( res.length > 0)
                        return resolve( {emailInUse : true});
                    else
                    {
                        const hashedPassword = await bcrypt.hash(user.password,10);
                        db.query(`INSERT INTO client (first_name , last_name , address , phone , postal_code , email , password , token , email_confirmed , id_type_client) 
                                                    VALUES (?,?,?,?,?,?,? , ? , ? , ? ) `,
                        [user.firstName,user.lastName,user.address,user.phone,user.postalCode,user.email,hashedPassword , generatedToekn ,0 , rate!=null ? rate.idType : null ],
                        (err,res)=>{

                            if( err )
                                return resolve({errorCode : -1});
                            else 
                                return resolve( {insertedId : res.insertId} );
                        });
                    }
                });
           } 
           catch (error) 
           {
               resolve({errorCode:-1 , error});
           }
          
        });
    } , 
    update : async (clientInfo)=>{
        const sql = `UPDATE client SET 
        first_name = ? , 
        last_name = ? , 
        phone = ? ,
        address = ? , 
        postal_code = ? 
        WHERE id = ?
        `;
        const result = await query(sql,[
            clientInfo.firstName , 
            clientInfo.lastName ,
            clientInfo.phone , 
            clientInfo.address , 
            clientInfo.postalCode , 
            clientInfo.id
        ]);
        if( result.data )
            return {success : true}
        else return {success : false};
    },
    getUser : (email)=>{
        return new Promise((resolve,reject)=>{
            const returnResult = { success : false , data : null };
            try 
            {
                // init the query 
                const sql = 'SELECT * FROM client WHERE email = ? ';
                db.query( sql , [email] , (err,res)=>{
                    if( !err ){
                        if( res.length === 1) returnResult.data = res[0];
                        returnResult.success = true;

                        resolve(returnResult);
                    }
                    else resolve(returnResult);
                });
            } 
            catch (error) 
            {
                reject(returnResult)
            }
        });
    },
    getUserById : (id)=>{
        return new Promise((resolve,reject)=>{
            const returnResult = { success : false , data : null };
            try 
            {
                // init the query 
                const sql = 'SELECT id,first_name, last_name , email,address,phone,postal_code,token,password FROM client WHERE id = ? ';
                db.query( sql , [id] , (err,res)=>{
                    if( !err ){
                        if( res.length === 1)
                        {
                            returnResult.data = res[0];
                            returnResult.success = true;
                        }
                        
                        resolve(returnResult);
                    }
                    else resolve(returnResult);
                });
            } 
            catch (error) 
            {
                resolve(error)
            }
        });
    } , 
    getClientByEmail : async (email)=>{
        return new Promise((resolve,reject)=>{
           try {
                // the email field is unique
                const sql = 'SELECT id FROM client WHERE email = ?';
                db.query(sql,[email],(err,res)=>{
                    if(!err){
                        console.log(res[0]);
                        resolve(res[0].id);
                    }
                    else 
                        resolve(err);
                });
           } catch (error) {
               reject(error);
           }
        });
    } , 
    getNotifications :async (client_id)=>{
        return new Promise( (resolve,reject)=>{
            try {
                const sql = `SELECT 
                n.notification_id,
                n.notification_date , 
                n.content , 
                nc.category , 
                CAST(n.is_checked as INT) as is_checked
              FROM notification n JOIN notification_category nc ON n.categoty_id=nc.category_id
              WHERE n.client_id = ? `;

              db.query(sql,[client_id], (err,res)=>{
                  if( err) resolve(null);
                  resolve(res);
              });
            } catch (error) {
                reject(null);
            }
        });
    } , 
    changeNotificationStatus : async (notifID)=>{
        return new Promise ((resolve,reject)=>{
            try {
                const sql= `UPDATE notification n SET n.is_checked = 1
                WHERE n.notification_id = ?`;

                db.query(sql,[notifID], (err,res)=>{
                    if( err) resolve(null);
                    resolve({updated : true });
                });

            } catch (error) {
                reject(null);
            }
        });
    },
    confirmEmail : async (token)=>{
        
        let sql = 'SELECT email_confirmed FROM client WHERE token = ?';
        const res = await query(sql,[token]);
        console.log(res.data.length);
        if( res.data ) // response completed succeddfuly
        {
            if( res.data.length===0) return { success : false} // no such token in db
            
            if( res.data[0].email_confirmed ) return { success : true };
            else
            {
                // confirm email
                sql = 'UPDATE client SET email_confirmed = 1 WHERE token = ?';
                const confirmResult = await query(sql,[token]);
                if( confirmResult.data)
                {
                    return { success : confirmResult.data.changedRows? true: false };
                }
            }
        }
        else return { success : false}
    },
    getHighestRate :async ()=>{
        try {
            const sql = 'SELECT  tc.idType, tc.marge FROM type_client tc ORDER BY tc.marge DESC LIMIT 1';
            const result = await query(sql);

            if( result.data)
                return{success : true , data : result.data[0]};
            else
                return { success : false};
            
        } catch (error) {
            return{success : false}
        }

    } , 
    getTypeClient : async (client_id)=>{
        try {
            const sql= `SELECT tc.idType , IFNULL(tc.marge,0) AS marge
            FROM client c LEFT JOIN type_client tc ON c.id_type_client = tc.idType
            WHERE c.id = ${client_id}`;

            const result = await query(sql);
            if( result.data)
                return {success : true , data : result.data[0]};
            else
                return { success : false };

        } catch (error) {
            return{success : false}
        }
    } , 
    updatePassword : async (clientId , newPassword)=>{
        const hashedPassword = await bcrypt.hash(newPassword,10);
        const sql = 'UPDATE client SET password = ? WHERE id = ?';
        const result_query = await query(sql,[hashedPassword,clientId]);

        if( result_query.data)
            return { success : true };
        else 
            return { success : false};
    }

   
}

module.exports = Client;
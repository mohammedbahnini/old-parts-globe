const express = require('express');
const paymentRouter = express.Router();
const stripe = require('stripe');
const stripeObject = stripe('sk_test_51GuNlgK7kyPZtMq52CxQgaP1FIc319e6CpcpcgnfE5lDHubdcOQTss6tDtP0T1KKTpf2IB0pOLrgJBlkHFY84BiA00EgdtW9Wb');

paymentRouter.post('/api/pay' , async (req,res)=>{
    try {
        const { payment_method_id , amount } = req.body; 

        let intent = await stripeObject.paymentIntents.create({
            amount  : amount ,
            currency: 'usd',
            payment_method: payment_method_id , 
            confirm : true // confirm payment imediatly 
        });

        if( intent.status==='succeeded'){ // payment done
            res.status(200).json({success : true });
        }
        else 
            res.status(500).json({ error : 'Unexpected error'});

    } catch (error) {
        res.status(500).json({error});
    }
});

paymentRouter.post('/api/payment-intent/create' , async (req,res)=>{
    try {

        const {amount} = req.body;
        console.log(amount);
        const intent = await stripeObject.paymentIntents.create({
            amount , 
            currency : 'usd'
        });
        if(intent.client_secret)
            res.json({client_secret : intent.client_secret});
        else res.json({});

    } catch (error) {
        res.status(500).end();
    }

});

module.exports = paymentRouter;
const express = require('express');
const orderRouter = express.Router();
const orderModel = require('../models/orderModel');
const clientModel = require('../models/clientModel');

orderRouter.post('/api/order/create',async (req,res)=>{
   try 
   {
        
        const orderObject = req.body;
        console.log(orderObject);
        const clientID = await clientModel.getClientByEmail(orderObject.email);
        // check data is valid 
      
        if( clientID ) // check if the client is logged
        {
            // create an order
            
            const orderResult = await orderModel.save(orderObject);
            
            if( orderObject.saveData && orderResult.success) // update client info 
            {
                clientModel.update({
                    firstName : orderObject.firstName , 
                    lastName : orderObject.lastName , 
                    phone : orderObject.phone , 
                    address : orderObject.address , 
                    postalCode : orderObject.postalCode , 
                    id : clientID
                });

            }
            res.json(orderResult);
        }
        else res.json({success : false});
       
   } catch (error) {
       console.log(error);
   }
});

orderRouter.post('/api/order/validate' , async (req,res)=>{
    let errors = [];
    const orderObject = req.body;
    let { phone , address , postalCode } = orderObject;
    phone = phone.trim();
    address = address.trim();
    postalCode = postalCode.trim();

    if( !phone || 
        !address || 
        !postalCode  )
        errors.push('Fill all the fields !');
    if( orderObject.products.length === 0)
        errors.push('The order must contain one product at least !');
        

    if( errors.length>0)
        res.json({errors});
    else res.json({success : true});
});

orderRouter.get('/api/order/get/:clientID' , async (req,res)=>{
    const clientID = req.params.clientID;
    const response = await orderModel.getOrders(clientID);
    res.json(response);
});


orderRouter.get('/api/order/detail' , async (req,res)=>{
    const {orderID } = req.query;
    const detail = await orderModel.getOrder(orderID)
    res.json(detail);
});

module.exports = orderRouter;
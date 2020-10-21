const db = require('../db');
const bcrypt = require('bcrypt');
const clientModel = require('../models/clientModel');


const orderModel = {
    save : async (orderObject)=>{
        return new Promise(async (resolve,reject)=>{
            try {

                // init the response object 
                const response = {success : false};

               // get connection to begin the transaction
                db.getConnection( (err,connection)=>{
                    if( !err){
                        // begin transaction
                        connection.beginTransaction(async  (transactErr)=>{
                            if( transactErr)
                                resolve(response);
    
                                const sqlOrder = `INSERT INTO client_order ( IdClient, CreatedAt, Email, PhoneNumber, Address, PostalCode, PaymentProcedrue, Amount, Received, ReceivedAt, ShippingMethod)
                                VALUES ( ? , CURRENT_TIMESTAMP() , ?, ? , ? , ? , ? , ?, 0, NULL , ?)`;
    
                                const clientID = await clientModel.getClientByEmail(orderObject.email);
                                // save the order
                                connection.query(sqlOrder,[
                                    clientID, 
                                     orderObject.email ,
                                     orderObject.phone,
                                     orderObject.address , 
                                     orderObject.postalCode ,
                                     orderObject.payNow ? 'Payment with creedit card' : 'Payment until shipping',
                                     orderObject.amount ,
                                     orderObject.shippingMethod === 1 ? 'Shipping at home' : 'Shipping at warehouse' 
                                ],(errOrder,res)=>{

                                    if(errOrder)
                                    {
                                        connection.rollback( ()=>{
                                            resolve(response);
                                        });
                                    }
                                        
                                    
                                    const orderID = res.insertId ;
                                    
                                    // save products 
                                    for(let i=0;i<orderObject.products.length;i++){

                                        const { detail , warehouse,price,quantity,amount } = orderObject.products[i];
                                        const sql = `INSERT INTO client_order_line ( IdOrder, Product, Warehouse, Price, Quantity, Amount)
                                        VALUES ( ?, ?, ?, ?, ?, ?);`;

                                        connection.query(sql,[
                                            orderID , 
                                            detail , 
                                            warehouse , 
                                            price , 
                                            quantity , 
                                            amount
                                        ], (errProduct, resProduct)=>{
                                            if( errProduct) 
                                            {
                                                
                                                connection.rollback(()=>{
                                                    console.log(errProduct);
                                                    resolve(response);
                                                });
                                            }
                                            if( i=== orderObject.products.length-1)
                                            {

                                                connection.commit( (errCommit)=>{
                                                    if( errCommit )
                                                    {
                                                        resolve(response);
                                                    }
                                                    else 
                                                    {
                                                        connection.release();
                                                        response.success = true;
                                                        resolve(response);
                                                    }
                                                });
                                            }

                                            
                                        });
                                    }

                                })
                            
                        })
                    }
                    else 
                        resolve(response);
                });

               
               
             
            } catch (error) {
                reject(error);
            }
        })
        

    } , 
    getOrders : async (clientID) =>{
        return new Promise( (resolve,reject)=>{
            try {
                // init sql 
                const sql = `SELECT co.IdOrder, co.CreatedAt AS OrderDate , co.Amount , CAST( co.Received AS int ) AS Received , co.ReceivedAt FROM client_order co WHERE idClient = ?`;
                db.query(sql,[clientID], (err,res)=>{
                    if( err)
                        resolve(null);
                    
                    resolve(res);
                });
            } catch (error) {
                reject(error);
            }
        });
    } , 
    getOrder : async (orderID)=>{
        const self = this;
        return new Promise( (resolve,reject)=>{
            try {
                const sql = `SELECT 
                co.CreatedAt AS orderDate,
                c.first_name AS firstName ,
                c.last_name AS lastName ,
                co.Email , 
                co.Address , 
                co.PostalCode , 
                co.PaymentProcedrue , 
                co.PhoneNumber ,
                CAST(co.Received AS int ) as Received ,
                co.ReceivedAt , co.Amount 
              FROM client_order co JOIN client c ON c.id = co.IdClient
                WHERE co.IdOrder = ?
                ORDER BY co.CreatedAt DESC
              `;
                db.query(sql,[orderID] ,async  (err,res)=>{
                    if( err)
                        resolve(null);
                   const order = res[0];
                    // getting products
                    const products_sql = `SELECT col.Product , col.Warehouse , col.Price , col.Quantity , col.Amount FROM client_order_line col WHERE col.IdOrder = ?`;
                    db.query(products_sql,[orderID] , (productsErr,productsRes)=>{
                        if( productsErr)
                            resolve(null);
                        
                            const lines = productsRes;
                            resolve({
                                ...order,
                                products : lines
                            });
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    } 
}

module.exports = orderModel;
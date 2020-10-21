const express = require('express');
const soap = require('soap');
const axios = require('axios');
const {create,all} = require('mathjs');
const clientModel = require('../models/clientModel');
const rosskoRouter = express.Router();
const key = 'c8c3ebba526f7ac10cd0d17f002d0afe';
const math = create(all,{});

const rosskoModel = {
    getParts : async (text,client_id)=>{
    
        return new Promise( async (resolve,reject)=>{
            let rate = null;
            if( client_id == null ) // case user not connected
            {
                const result_rate = await clientModel.getHighestRate();
                if( result_rate.success )
                {
                    rate = result_rate.data;
                }
            }
            else // user connected
            {
                const result_rate = await clientModel.getTypeClient(client_id);
                if( result_rate.success )
                {
                    rate = result_rate.data;
                }
            }
            // define params
            const url = 'http://api.rossko.ru/service/v2.0/GetSearch';
            const options = {
                connection_timeout : 1,
                trace : true
            };

            const methodParams = {
                KEY1 : '233011cd6ecc8293d912fb79ec5dda32',
                KEY2 :'078918dc590cfbcacdbe82a0021dbaa0',
                TEXT : text
            };

            const getImage =async (brand,number)=>{
                try {
                    const url = `https://partsapi.ru/api.php?act=getPartPhoto&brand=${brand}&number=${number}&key=${key}`;
                    //console.log( url )
                    
                    const response=  await axios.get(url);
                    return response.data ;
                } catch (error) {
                    return 'static/img/products/variants/era-auto/default.jpg';
                }

                
            };
            const parts = [];
            const brands = [];
            soap.createClient(url , options , (err,client)=>{
                if( !err){
                    client.GetSearch(methodParams ,async (resultErr , result)=>{

                        if( result.SearchResult.success )
                        {
                            resultParts = result.SearchResult.PartsList.Part;

                            for (let index = 0; index < resultParts.length; index++) {
                                    
                                try 
                                {
                                    if( !brands.includes(resultParts[index].brand))
                                        brands.push( resultParts[index].brand );

                                    const emptyPart = {
                                        id : resultParts[index].guid,  
                                        brand : resultParts[index].brand,
                                        partNumber : resultParts[index].partnumber,
                                        title : resultParts[index].name,
                                        thumbnail : 'static/img/products/variants/era-auto/default.jpg',
                                        source : 'rsk',
                                        variants : [
                                            { thumbnail : 'static/img/products/variants/era-auto/default.jpg'}
                                        ],
                                        stocks : []
                                    };


                                    /*const url = `https://partsapi.ru/api.php?act=getPartPhoto&brand=${resultParts[index].brand}&number=${resultParts[index].partnumber}&key=${key}`;
                                    const response = await axios.get(url);
                                    const path = response.data;

                                    if( path.length> 0)
                                    {
                                        console.log(path);
                                        emptyPart.thumbnail = path[0].picture;
                                    }*/
                                        

                                    if( resultParts[index].stocks ){

                                        resultParts[index].stocks.stock.forEach(stock=>{
                                            console.log(stock);
                                            if(rate !== null ) // there is at least one type client in the database
                                            {
                                                const price = math.round(stock.price * rate.marge , 2);
                                                emptyPart.stocks.push( {
                                                    id : stock.id , 
                                                    price : price, 
                                                    count : stock.count , 
                                                    delivery : stock.delivery,
                                                    quantity : 1
                                                })
                                            }
                                            else 
                                            {
                                                emptyPart.stocks.push( {
                                                    id : stock.id , 
                                                    price : stock.price, 
                                                    count : stock.count , 
                                                    delivery : stock.delivery,
                                                    quantity : 1
                                                })
                                            }
                                        
                                        });
                                    }

                                    parts.push( emptyPart );

                            } catch (error) {
                                console.log(error)
                            }
                            }

                            resolve({ parts , brands }) ;
                        }
                        else 
                            resolve({
                                parts : [] , 
                                brands :  []
                            }) ;
                    });
                }
        
            });
        });

    }, 
    getSingle : async (id)=>{
        
        return new Promise( (resolve,reject)=>{
            const  itemCode  = id;

             // define params
            const url = 'http://api.rossko.ru/service/v2.0/GetSearch';
            const options = {
                connection_timeout : 1,
                trace : true
            };

            const methodParams = {
                KEY1 : '233011cd6ecc8293d912fb79ec5dda32',
                KEY2 :'078918dc590cfbcacdbe82a0021dbaa0',
                TEXT : itemCode
            };

            let parts = {};

            soap.createClient(url , options , (err,client)=>{
                if( !err){
                    client.GetSearch(methodParams ,async (resultErr , result)=>{
                        console.log(result);
                        if( result.SearchResult.success ){
                            resultParts = result.SearchResult.PartsList.Part;
                            console.log(resultParts);

                            if( resultParts.length>0)
                            {
                                parts = {
                                    id : resultParts[0].guid,  
                                    brand : resultParts[0].brand,
                                    partNumber : resultParts[0].partnumber,
                                    title : resultParts[0].name,
                                    thumbnail : '../static/img/products/variants/era-auto/default.jpg',
                                    source : 'rsk',
                                    variants : [
                                        {
                                            thumbnail : '../static/img/products/variants/era-auto/default.jpg'
                                        }
                                    ],
                                    stocks : []
                                };

                                
                                if( resultParts[0].stocks ){

                                    resultParts[0].stocks.stock.forEach(stock=>{
                                        parts.stocks.push( {
                                            id : stock.id , 
                                            price : stock.price, 
                                            count : stock.count , 
                                            delivery : stock.delivery,
                                            quantity : 1
                                        })
                                    });
                                }

                            //parts.push( parts );

                            }

                            resolve(parts);
                        }
                    });
                }
        
            });

    
        });




    }
}

module.exports = rosskoModel;
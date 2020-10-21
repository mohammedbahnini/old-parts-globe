const express = require('express');
const productModel = require('../models/productModel');
const rosskoModel = require('./../models/rosskoModel');
const productRouter = express.Router();

// GET PRODUCTS
productRouter.post('/api/products', async (req, res) => {
    try {
        /*console.log(req.body);
        const { text } = req.body;
        let products = await productModel.getProduct(text);
        if( products.data )
        {
            products = products.data.map(el=>{
                return {...el , stocks : [
                    { 
                        id : 1 , 
                        price : 850, 
                        count : 56 , 
                        delivery : 14,
                        quantity : 1
                    }
                ]}
            });
            res.json({
                parts : products
            });
        }
        else res.json([]);*/
        const { text } = req.body;
        const rossko = rosskoModel.getParts(text, null);
        const db_products = productModel.getProduct(text);


        Promise.all([rossko, db_products])
            .then(values => {
                const parts = [];
                const brands = [];
                values.forEach(value => {
                    parts.push(...value.parts);
                    brands.push(...value.brands);
                });

                res.json({ parts, brands });

            })
            .catch(error => {
                console.log(error);
                res.json({
                    parts: [],
                    brands: []
                })
            });

        //res.end();
    } catch (error) {
        console.log(error);
        res.json([]);
    }
});

//rosskoRouter.post('' , async (req,res)=>{
productRouter.post('/api/getSingleItem', async (req, res) => {
    const { itemCode, source } = req.body;

    let product = {};
    if (source === "rsk") // rossko
    {
        product = await rosskoModel.getSingle(itemCode);
    }
    else if (source === 'self') { // self data base
        product = await productModel.getSingleProduct(itemCode);
    }

    res.json(product);

});

module.exports = productRouter;
const db = require('../db');
const randomString = require('crypto-random-string');
const query = require('../db_helper');

const productModel = {
    getProduct: async (param) => {
        try {
            param = param.replace(/(\s+)/, '#');
            let condition = null;
            if (param.length > 0) {
                param = param.split('#');
                condition = param.map(el => `name LIKE '%${el}%' `);
                condition = condition.join(' OR ');
            }
            // init sql 
            const sql = `
            SELECT
            produit_id as id ,
            'TOYOTA' as brand , 
            '498797SF99F5464' as partNumber , 
            name as title , 
            'static/img/products/variants/era-auto/default.jpg' as  thumbnail
            FROM produit
            ${condition ? ' WHERE ' + condition : ''}`;


            const result = await query(sql);
            console.log(result);
            if (result.data) {
                // reformuler structure d'objet de retour
                const parts = result.data.map(el => {
                    return {
                        ...el,
                        source: 'self',
                        stocks: [
                            {
                                id: 1,
                                price: 850,
                                count: 56,
                                delivery: 14,
                                quantity: 1
                            }
                        ]
                    }
                });

                // regrouper les marques
                let brands = [];
                result.data.forEach(el => {
                    if (!brands.includes(el.brand)) brands.push(el.brand);
                })
                return { parts, brands };
            }
            else {
                return {
                    parts: [],
                    brands: []
                };
            }
        } catch (error) {
            console.log(error);
            return {
                parts: [],
                brands: []
            };
        }
    },
    getSingleProduct: async (id) => {
        try {

            let product = {};
            // init sql 
            const sql = `
            SELECT
            produit_id as id ,
            'TOYOTA' as brand , 
            '498797SF99F5464' as partNumber , 
            name as title , 
            '../static/img/products/variants/era-auto/default.jpg' as  thumbnail
            FROM produit
            WHERE 
            produit_id = ${id}`;

            const result = await query(sql);
            if (result.data) {
                product = {
                    ...result.data[0],
                    source: 'self',
                    variants: [
                        {
                            thumbnail: '../static/img/products/variants/era-auto/default.jpg'
                        }
                    ],
                    stocks: [
                        {
                            id: 1,
                            price: 850,
                            count: 56,
                            delivery: 14,
                            quantity: 1
                        }
                    ]
                };
            }
            return product;

        } catch (error) {
            console.log(error);
            return {};
        }
    }
}

module.exports = productModel;
const next = require('next');
require('dotenv').config();
const dev = process.env.ENV === 'dev'; // juyst for now
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT;


/* express section */
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

/** user routes */
const clientRouter = require('./routes/clientRouter');
const rosskoRouter = require('./routes/rosskoRouter');
const orderRouter = require('./routes/orderRouter');
const paymentRouter = require('./routes/paymentsRouter');
const productRouter = require('./routes/productRouter');

const orderModel = require('./models/orderModel');


nextApp.prepare().then(() => {
    const app = express();

    app.use(session({
        name: 'sess_id',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        store: new MySQLStore({
            host: '72.9.135.10',
            user: 'era_creator',
            password: 'Gu35T_2020',
            database: 'era_auto_parts'
        })
    }));

    app.use(express.json());
    app.use(clientRouter);
    app.use(rosskoRouter);
    app.use(orderRouter);
    app.use(paymentRouter);
    app.use(productRouter);

    const clientProfileRoutes = [
        '/account/user-information',
        '/account/notifications',
        '/account/invoices',
        '/account/addresses',
        '/account/recent-viewed-product',
        '/account/wishlist',
        '/account/recent-viewed-product',
        '/account/checkout',
        '/account/orders',
        '/account/edit-password'

    ];

    //check the user is connected
    const checker = (req, res, next) => {

        const requestedUrl = req.originalUrl;
        const matchedRoute = clientProfileRoutes.filter(url => url === requestedUrl);


        if (matchedRoute.length === 1 && !req.session.client_id)
            res.redirect('/login');
        else next();
    };


    app.use(checker);
    app.get('*', (req, res) => {
        return handle(req, res);
    });


    app.listen(port, () => {
        console.log(`server is running on port : ${port}`);
    })
});




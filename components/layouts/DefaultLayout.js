import React from 'react';
import Head from './modules/Head';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

const DefaultLayout = ({ children }) => (
    <div className="layout--default">
        <Head />
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
        <div id="loader-wrapper">
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
        </div>
    </div>
);

export default DefaultLayout;

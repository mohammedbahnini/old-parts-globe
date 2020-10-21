import React from 'react';

import DefaultLayout from '../components/layouts/DefaultLayout';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';
import BreadCrumb from '../components/elements/BreadCrumb';
import Register from '../components/Register';

const breadcrumb = [
    {
        text : "Home",
        url : "/"
    },
    {
        text : "Register"
    }
]

const RegisterPage = () => (
    <div className="site-content">
        <HeaderDefault />
        <HeaderMobile />
        <NavigationList />

        <main id="homepage-1">
            <BreadCrumb breacrumb={breadcrumb} />
            <Register />
        </main>
        <FooterFullwidth />
    </div>
);


export default RegisterPage;

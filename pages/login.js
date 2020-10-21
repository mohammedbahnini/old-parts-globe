import React from 'react';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';
import BreadCrumb from '../components/elements/BreadCrumb';
import Login from '../components/Login';

const breadcrumb = [
    {
        text : "Home",
        url : "/"
    },
    {
        text : "Login"
    }
]

const RegisterPage = () => (
    <div className="site-content">
        <HeaderDefault />
        <HeaderMobile />
        <NavigationList />

        <main id="homepage-1">
            <BreadCrumb breacrumb={breadcrumb} />
            <Login />
        </main>
        <FooterFullwidth />
    </div>
);


export default RegisterPage;

import React from 'react';
import axios from 'axios';

import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import EditPassword from '../../components/partials/account/EditPassword';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';

const UserInformationPage = (props) => {
    const client = props.client;

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Edit Password',
        },
    ];

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <EditPassword />
            </div>
            <Newsletters layout="container" />
            <FooterDefault />
        </div>
    );
};


export default UserInformationPage;

import React from 'react';

import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Addresses from '../../components/partials/account/Addresses';
import Notifications from '../../components/partials/account/Notifications';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import axios from 'axios';

const AccountNotificationsPage = (props) => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Notifications',
        },
    ];
    const {notifications}=props;
    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Notifications notifications={notifications}/>
            </div>
            <Newsletters layout="container" />
            <FooterDefault />
        </div>
    );
};



export async function getServerSideProps(ctx){
    const client_id  = ctx.req.session.client_id;
    // call api
    const response = await axios.get(`${process.env.api}/users/notifications/${client_id}`);
    console.log(response.data);
    return {
        props : {
            notifications : response.data
        }
    }
}

export default AccountNotificationsPage;

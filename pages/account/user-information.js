import React from 'react';
import axios from 'axios';

import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import UserInformation from '../../components/partials/account/UserInformation';
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
            text: 'User Information',
        },
    ];

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <UserInformation client={client} />
            </div>
            <Newsletters layout="container" />
            <FooterDefault />
        </div>
    );
};


export async function getServerSideProps(ctx){
    // getting client id 
    const clientID = ctx.req.session.client_id;
    const response = await axios.post(`${process.env.api}/user/info` , {
        client_id : clientID
    });
    return { props : { client : response.data.client}};
}

export default UserInformationPage;

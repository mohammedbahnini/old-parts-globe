import React from 'react';

import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import OrderDetail from '../../components/partials/account/OrderDetails';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import { useRouter } from 'next/router';

const OrderDetails = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Order detail',
        },
    ];
    const router = useRouter();
    //console.log(router.query);

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <OrderDetail  />
            </div>
            <Newsletters layout="container" />
            <FooterDefault />
        </div>
    );
};

export default OrderDetails;

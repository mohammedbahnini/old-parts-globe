import React from 'react';

import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import Newletters from '../../components/partials/commons/Newletters';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import LayoutShopSidebarWithoutBanner from '../../components/partials/shop/LayoutShopSidebarWithoutBanner';

const ShopSidebarPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop Sidebar without banner',
        },
    ];
    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <BreadCrumb breacrumb={breadCrumb} />
            <div className="ps-page--shop" id="shop-sidebar">
                <div className="container">
                    <LayoutShopSidebarWithoutBanner />
                </div>
            </div>
            <Newletters layout="container" />
            <FooterDefault />
        </div>
    );
};

export default ShopSidebarPage;

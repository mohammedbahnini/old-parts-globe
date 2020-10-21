import React from 'react';

import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import Newletters from '../../components/partials/commons/Newletters';
import LayoutShop from '../../components/partials/shop/LayoutShop';
import ShopCategories from '../../components/partials/shop/ShopCategories';
import ShopBrands from '../../components/partials/shop/ShopBrands';
import ShopBanner from '../../components/partials/shop/ShopBanner';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';

const ShopFullwidthPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop Fullwidth',
        },
    ];

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-container">
                    <ShopBanner />
                    <ShopBrands />
                    <ShopCategories />
                    <LayoutShop />
                </div>
            </div>
            <Newletters layout="container" />
            <FooterDefault />
        </div>
    );
};

export default ShopFullwidthPage;

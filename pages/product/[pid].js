import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import Newletters from '../../components/partials/commons/Newletters';
import CustomerBought from '../../components/partials/product/CustomerBought';
import RelatedProduct from '../../components/partials/product/RelatedProduct';
import ProductDetailFullwidth from '../../components/elements/detail/ProductDetailFullwidth';
import ProductWidgets from '../../components/partials/product/ProductWidgets';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import BreadCrumb from '../../components/elements/BreadCrumb';

const ProductDefaultPage = () => {
    const router = useRouter();
    const { pid } = router.query;
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: 'Product Detail',
        },
    ];

    /*Check exist productId*/

    useEffect(() => {
        console.log(isNaN(pid));
        if (isNaN(pid)) {
            Router.push('/page/page-404');
        }
    });

    return (
        <div className="site-content">
            <Head>
                <title>Martfury - Product Detail</title>
            </Head>
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">
                            <ProductDetailFullwidth productId={pid} />
                        </div>
                        <div className="ps-page__right">
                            <ProductWidgets />
                        </div>
                    </div>
                    <CustomerBought />
                    <RelatedProduct />
                </div>
            </div>
            <Newletters />
            <FooterDefault />
        </div>
    );
};

export default ProductDefaultPage;

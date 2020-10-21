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
import ProductDetail from '../../components/elements/detail/ProductDetail';

import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import BreadCrumb from '../../components/elements/BreadCrumb';
import axios from 'axios';

const ProductDefaultPage = (props) => {
    console.log(props);
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Product Detail',
        },
    ];
    const { product }= props;
    return (
        <div className="site-content">
            <Head>
                <title>Product Detail</title>
            </Head>
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />

            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">
                            <ProductDetail product={ product } />
                        </div>
                        <div className="ps-page__right">
                       
                        </div>
                    </div>

                </div>
            </div>
            <Newletters />
            <FooterDefault />
        </div>
    );
};

export const getServerSideProps= async (ctx)=>{
    const { guid , source } = ctx.req.query;
    const item = await axios.post(`${process.env.api}/getSingleItem` , { itemCode : guid , source});
    console.log(item.data);
    return {
        props : {
            product : item.data
        }
    }
}

export default ProductDefaultPage;

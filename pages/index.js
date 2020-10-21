import React from 'react';

import DefaultLayout from '../components/layouts/DefaultLayout';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import HomeBanner from '../components/partials/homepage/home-default/HomeBanner';
import SiteFeatures from '../components/partials/homepage/home-default/SiteFeatures';
import DownLoadApp from '../components/partials/commons/DownLoadApp';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';
import HomeDefaultTopCategories from '../components/partials/homepage/home-default/HomeDefaultTopCategories';

import AddCar from '../components/partials/homepage/home-default/AddCar';
import BestSellers from '../components/partials/homepage/home-default/BestSellers';
import TopRated from '../components/partials/homepage/home-default/TopRated';

const Index = () => (
    <div className="site-content">
        <HeaderDefault />
        <HeaderMobile />
        <NavigationList />

        <main id="homepage-1">
            <HomeBanner />
            <AddCar />
            <SiteFeatures />
            <HomeDefaultTopCategories/>
            <BestSellers />
            <TopRated />
            <DownLoadApp />
        </main>
        <FooterFullwidth />
    </div>
);

Index.getLayout = page => <DefaultLayout>{page}</DefaultLayout>;
export default Index;

import React from 'react';
import '../../scss/autopart.scss';

import NavigationList from '../../components/shared/navigation/NavigationList';
import SiteFeatures from '../../components/partials/homepage/autopart/SiteFeatures';
import AutopartPromotions from '../../components/partials/homepage/autopart/AutopartPromotions';
import AutopartCategories from '../../components/partials/homepage/autopart/AutopartCategories';
import AutopartRecommendForYou from '../../components/partials/homepage/autopart/AutopartRecommendForYou';
import AutopartBestSaleBrand from '../../components/partials/homepage/autopart/AutopartBestSaleBrand';
import ClientSay from '../../components/partials/commons/ClientSay';
import AutopartPromotions2 from '../../components/partials/homepage/autopart/AutopartPromotions2';
import AutopartDealHot from '../../components/partials/homepage/autopart/AutopartDealHot';
import AutopartBanner from '../../components/partials/homepage/autopart/AutopartBanner';
import HeaderAutoPart from '../../components/shared/headers/HeaderAutoPart';
import FooterSecond from '../../components/shared/footers/FooterSecond';
import HeaderMobileAutopart from '../../components/shared/headers/HeaderMobileAutopart';
import {
    technologyCategories,
    recommendProducts,
    productWidget,
} from '../../public/static/data/autopart';


const HomeAutopartPage = () => (
    <div className="site-content">
        <HeaderAutoPart />
        <HeaderMobileAutopart />
        <NavigationList />
        <main id="homepage-2">
            <AutopartBanner />
            <AutopartCategories data={technologyCategories} />
            <AutopartPromotions />
            <AutopartRecommendForYou data={recommendProducts} />
            <AutopartDealHot data={productWidget} />
            <AutopartPromotions2 />
            <AutopartBestSaleBrand />
            <ClientSay />
            <SiteFeatures />
        </main>
        <FooterSecond />
    </div>
);

export default HomeAutopartPage;

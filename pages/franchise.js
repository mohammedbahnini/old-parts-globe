import React from 'react';

import DefaultLayout from '../components/layouts/DefaultLayout';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';

import FranchiseComponent from '../components/partials/page/FranchiseComponent';

const Franchise = () => (
    <div className="site-content">
        <HeaderDefault />
        <HeaderMobile />
        <NavigationList />

        <main id="homepage-1">
            <FranchiseComponent />
        </main>
        <FooterFullwidth />
    </div>
);


export default Franchise;

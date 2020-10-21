import React from 'react';
import ThumbnailExtended from './modules/thumbnail/ThumbnailExtended';
import DefaultDescription from './modules/description/DefaultDescription';
import InformationExtended from './modules/information/InformationExtended';
import ThumbnailVideoFeatured from './modules/thumbnail/ThumbnailVideoFeatured';

const ProductDetailVideoFeatured = () => (
    <div className="ps-product--detail ps-product--fullwidth">
        <div className="ps-product__header">
            <ThumbnailVideoFeatured />
            {/**<InformationExtended /> */}
        </div>
        <DefaultDescription />
    </div>
);

export default ProductDetailVideoFeatured;

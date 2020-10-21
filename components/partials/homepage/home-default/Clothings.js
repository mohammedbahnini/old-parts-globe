import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import products from '../../../../public/static/data/home-1';
import Product from '../../../elements/products/Product';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';

class Clothings extends Component {
    render() {
        const carouselSetting = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 3,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        arrows: false,
                    },
                },
            ],
        };
        return (
            <div className="ps-product-list ps-clothings">
                <div className="ps-container">
                    <div className="ps-section__header">
                        <h3>Home, Garden & Kitchen</h3>
                        <ul className="ps-section__links">
                            <li>
                                <a href="shop-grid.html">New Arrivals</a>
                            </li>
                            <li>
                                <a href="shop-grid.html">Best seller</a>
                            </li>
                            <li>
                                <a href="shop-grid.html">Must Popular</a>
                            </li>
                            <li>
                                <a href="shop-grid.html">View All</a>
                            </li>
                        </ul>
                    </div>
                    <div className="ps-section__content">
                        <Slider
                            {...carouselSetting}
                            className="ps-carousel outside">
                            {products.home_1_clothing.map(product => (
                                <Product
                                    product={product}
                                    key={product.title}
                                />
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ post }) => ({ post });
export default connect(mapStateToProps)(Clothings);

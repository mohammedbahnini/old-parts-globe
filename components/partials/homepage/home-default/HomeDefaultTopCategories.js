import React from 'react';
import Link from 'next/link';

const HomeDefaultTopCategories = () => (
    <div className="ps-top-categories">
        <div className="ps-container">
            <h3>Top categories</h3>
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/15.jpg" alt="" />
                        <p>Original catalogs</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/16.jpg" alt="" />
                        <p>Catalog analogs</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/10.jpg" alt="" />
                        <p>Tires and wheels</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/17.jpg" alt="" />
                        <p>Auto detailing</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/11.jpg" alt="" />
                        <p>Maintenance</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/13.jpg" alt="" />
                        <p>Car glass</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/9.jpg" alt="" />
                        <p>Oils</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/12.jpg" alt="" />
                        <p>Accessories</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HomeDefaultTopCategories;

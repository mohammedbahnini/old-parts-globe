import React from 'react';
import Link from 'next/link';

const AutopartCategories = ({ data }) => (
    <section className="ps-top-categories">
        <div className="container">
            <div className="ps-section__header">
                <h3>TOP CATEGORIES OF THE MONTH</h3>
            </div>
            <div className="ps-section__content"></div>
            <div className="row align-content-lg-stretch">
                {data.map(category => (
                        <div className="col-md-4 col-sm-6 col-12" key={category.id}>
                            <div
                                className="ps-block--category-2 ps-block--category-auto-part"
                                data-mh="categories">
                                <div className="ps-block__thumbnail">
                                    <img src={category.thumbnail} alt="" />
                                </div>
                                <div className="ps-block__content">
                                    <h4>{category.title}</h4>
                                    <ul>
                                        {category.links &&
                                            category.links.map(link => (
                                                <li key={link}>
                                                    <Link href="/shop">
                                                        <a>{link}</a>
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    </section>
);

export default AutopartCategories;

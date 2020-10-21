import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
    getProducts,
    getProductsByCategory,
    getProductsByBrand,
} from '../../../store/product/action';

import Product from '../../elements/products/Product';
import ProductWide from '../../elements/products/ProductWide';
import ShopWidget from './modules/ShopWidget';
class LayoutShop extends Component {
    state = {
        listView: true,
        pageNumber: 0,
        pageSize: 18,
        pages: 1,
        products: [],
    };

    componentDidMount() {
        const { query } = this.props.router;
        if (query) {
            if (query.category) {
                this.props.dispatch(getProductsByCategory(query.category));
            }
            else if (query.brand) {
                console.log(query.brand);
                this.props.dispatch(getProductsByBrand(query.brand));
            }
            else {
                this.props.dispatch(getProducts());
            }
        } else {

        }

    }

    handleChangeViewMode = event => {
        event.preventDefault();
        this.setState({ listView: !this.state.listView });
    };

    render() {
        const { allProducts } = this.props;

        const viewMode = this.state.listView;
        return (
            <div className="ps-layout--shop">
                <ShopWidget />
                <div className="ps-layout__right">
                    <div className="ps-shopping">
                        <div className="ps-shopping__header">
                            <p>
                                <strong>
                                    {' '}
                                    {allProducts ? allProducts.length : 0}
                                </strong>{' '}
                                Products found
                            </p>
                            <div className="ps-shopping__actions">
                                <select
                                    className="ps-select form-control"
                                    data-placeholder="Sort Items">
                                    <option>Sort by latest</option>
                                    <option>Sort by popularity</option>
                                    <option>Sort by average rating</option>
                                    <option>Sort by price: low to high</option>
                                    <option>Sort by price: high to low</option>
                                </select>
                                <div className="ps-shopping__view">
                                    <p>View</p>
                                    <ul className="ps-tab-list">
                                        <li
                                            className={
                                                viewMode === true
                                                    ? 'active'
                                                    : ''
                                            }>
                                            <a
                                                href="#"
                                                onClick={
                                                    this.handleChangeViewMode
                                                }>
                                                <i className="icon-grid"></i>
                                            </a>
                                        </li>
                                        <li
                                            className={
                                                viewMode !== true
                                                    ? 'active'
                                                    : ''
                                            }>
                                            <a
                                                href="#"
                                                onClick={
                                                    this.handleChangeViewMode
                                                }>
                                                <i className="icon-list4"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="ps-shopping__content">
                            {viewMode === true ? (
                                <div className="ps-shopping-product">
                                    <div className="row">
                                        {allProducts && allProducts.length > 0
                                            ? allProducts.map(item => (
                                                  <div
                                                      className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 "
                                                      key={item.id}>
                                                      <Product product={item} />
                                                  </div>
                                              ))
                                            : ''}
                                    </div>
                                </div>
                            ) : (
                                <div className="ps-shopping-product">
                                    {allProducts && allProducts.length > 0
                                        ? allProducts.map(item => (
                                              <ProductWide
                                                  product={item}
                                                  key={item.id}
                                              />
                                          ))
                                        : ''}
                                </div>
                            )}
                            <div className="ps-shopping__footer">
                                <div className="ps-pagination">
                                    <ul className="pagination">
                                        <li className="active">
                                            <a href="#">1</a>
                                        </li>
                                        <li>
                                            <a href="#">2</a>
                                        </li>
                                        <li>
                                            <a href="#">3</a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Next Page
                                                <i className="icon-chevron-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/*  <Pagination
                                    defaultCurrent={1}
                                    total={allProducts ? allProducts.length : 0}
                                    pageSize={this.state.pageSize}
                                    onChange={this.handlePagination.bind(this)}
                                />*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.product;
};

export default withRouter(connect(mapStateToProps)(LayoutShop));

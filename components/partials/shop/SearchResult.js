import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
    getProducts,
    getProductsByKeyword,
} from '../../../store/product/action';

import CustomProduct from '../../elements/products/CustomProduct';
import ProductList from '../../elements/products/ProductList';
import ShopWidget from './modules/ShopWidget';
import Pagination  from './Pagination';
import axios from 'axios';
import { Spin , Checkbox , Slider} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

class SearchResult extends Component {
    state = {
        listView: true,
        allProducts: [],
        filtredProducts : [],
        currentProducts : [],
        loadingData : true , 
        currentPage : 1 , 
        productPerPage : 10 ,
        pageNumbers : [], 
        brands : [], 
        filterBrands : [] ,
        priceMin : 0 , 
        priceMax : 99999
    };

    componentDidMount() {

        const { query } = this.props.router;

        if (query) {

            let currentComponent = this;

            axios.post(`${process.env.api}/products` ,
            {
                text : query.keyword
            }).then( result =>{
                const pages =[];
                for(let i=1 ; i<= Math.ceil(result.data.parts.length / this.state.productPerPage); i ++)
                    pages.push(i);
                
                currentComponent.setState({
                    allProducts : result.data.parts ,
                    filtredProducts : result.data.parts ,
                    brands : result.data.brands ,
                    loadingData : false , 
                    pageNumbers : pages
                });

                currentComponent.getCurrentProducts(this.state.currentPage);

            });

        }

    }

    async filterProducts(){
        console.log(this.state.priceMin);
        console.log(this.state.priceMax);

        let products = this.state.allProducts;
        let pages= [];
        for(let i=1 ; i<= Math.ceil(this.state.allProducts.length / this.state.productPerPage); i ++)
                pages.push(i);

        // FILTER BY BRAND
        if( this.state.filterBrands.length>0)
        {
            products = this.state.allProducts.filter(el=>this.state.filterBrands.includes(el.brand));
            pages= [];
            for(let i=1 ; i<= Math.ceil(products.length / this.state.productPerPage); i ++)
                    pages.push(i);
        }
        // FILTER BY PRICE
        if( this.state.priceMin != 0 || this.state.priceMax != 99999)
        {
            products = products.filter(el=>{
                if( el.stocks.length>0)
                {
                    const matchedPrices = el.stocks.filter( stock=> stock.price>= this.state.priceMin && stock.price <= this.state.priceMax );
                    if( matchedPrices.length >0 )
                        return true ;
                }
            });
            pages= [];
            for(let i=1 ; i<= Math.ceil(products.length / this.state.productPerPage); i ++)
                    pages.push(i);
        }
        console.log(products);
        await this.setState({
                filtredProducts : products , 
                pageNumbers : pages
            });
        this.getCurrentProducts(1);
        
    }

    async handleChangePrice(value)
    {
        await this.setState({
            priceMin: value[0],
            priceMax: value[1],
        });
        await this.filterProducts();
    }

    async handleChangeBrands(value)
    {
        await this.setState({
            filterBrands : value
        });
        await this.filterProducts();
    }

    getPagination(currentPage){
        return(
            <ul className="pagination">
                {this.state.pageNumbers.map(page=>{
                     <li className={page == currentPage ? 'active' : ''} onClick={()=>this.getCurrentProducts(page)}>
                     <a href="#">1</a>
                 </li>
                })}
            </ul>
        )
    }

    getCurrentProducts(pageNumber){

        const indexLastProduct = pageNumber * this.state.productPerPage; 
        const indexFirstProduct = indexLastProduct - this.state.productPerPage;
        this.setState({
            currentPage : pageNumber,
            currentProducts : this.state.filtredProducts.slice(indexFirstProduct,indexLastProduct)
        });
        console.log('get current product');
    }

    handleChangeViewMode = event => {
        event.preventDefault();
        this.setState({ listView: !this.state.listView });
    };


    render() {
        const self = this;
        const {brands} = this.state;
        const filtredProducts = this.state.filtredProducts;
        let currentProducts = this.state.currentProducts;
        const listView = this.state.listView;
        const pages = [];
        this.state.pageNumbers.map(page=>{
            pages.push(
            <li className={this.state.currentPage == page ? 'active' : ''} onClick={()=>self.getCurrentProducts(page)} >
                <a>{page}</a>
            </li>
            );
        });


        //console.log(allProducts);
        const loaderIcon = <LoadingOutlined style={{ fontSize: 100, color : 'black' }} spin />;

        // init the view condionaly
        const loader =   
        (
            <div className="ps-search-loader">
                <Spin indicator={loaderIcon} />
            </div>
        );
        
        const reasultHeader = filtredProducts && filtredProducts.length > 0 ? 
        (
            <p>
                <strong>
                    {filtredProducts ? filtredProducts.length : 0}
                </strong>
                <span className="ml-1">Products found</span>
            </p>
            
        )
        :
        (
            <p>Not found! Try with another keyword.</p>
        );


        return (
            <div className="ps-layout--shop">
              
              <div className="ps-layout__left">

                <aside className="widget widget_shop">
                    <h4 className="widget-title" style={{color:'black !important'}}>By Brands</h4>
                    <figure>
                        <Checkbox.Group
                            options={brands}
                            onChange={(e)=>this.handleChangeBrands(e)}
                        />
                    </figure>
                    <figure>
                        <h4 className="widget-title" style={{color:'black !important'}}>By Price</h4>
                        <Slider
                            range
                            defaultValue={[0, 99999]}
                            max={99999}
                            onAfterChange={(e)=>this.handleChangePrice(e)}
                        />
                        <p>
                            Price: {this.state.priceMin} .p - {this.state.priceMax} .p
                        </p>
                    </figure>
                </aside>
            </div>

                
                <div className="ps-layout__right search_result">

                    {  this.state.loadingData &&  loader  }
                { !this.state.loadingData && 
                (
                    <div className="ps-shopping">
                    <div className="ps-shopping__header">

                        {reasultHeader}

                        <div className="ps-shopping__actions">
                            <div className="ps-shopping__view" style={{display : 'none'}}>
                                <p>View</p>
                                <ul className="ps-tab-list">
                                    <li
                                        className={ listView === true ? 'active' : '' }>
                                        <a
                                            href="#"
                                            onClick={this.handleChangeViewMode} >
                                            <i className="icon-grid"></i>
                                        </a>
                                    </li>
                                    <li
                                        className={ listView !== true ? 'active' : '' }>
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
                    {filtredProducts.length>0 && (
                        <div className="ps-shopping__content">
                        {listView === false ? (
                            <div className="ps-shopping-product">
                                <div className="row">
                                    {currentProducts.map( item => (
                                            <div
                                                className="col-lg-4 col-md-4 col-sm-6 col-6 "
                                                key={item.id}>
                                                <CustomProduct product={item} />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ) : 
                        (
                            <div className="ps-shopping-product">
                                { <ProductList products={currentProducts} />}
                            </div>
                        )}
                            <div className="ps-shopping__footer">
                                <div className="ps-pagination">
                                <ul className="pagination">
                                    {pages}
                                </ul>
                                </div>
                            </div>
                        </div>
                    )}
                   
                </div>
            
                )}
                
                   </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.product;
};
export default withRouter(connect(mapStateToProps)(SearchResult));

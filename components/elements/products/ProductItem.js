import React,{Component,Fragment} from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../../store/cart/action';
import { notification } from 'antd';
import Link from 'next/link';
import axios from 'axios';

class ProductItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            product : this.props.product
        };
    }

    handleAddItemToCart = (e,stock) => {
        e.preventDefault();
        const {
            id,
            brand , 
            partNumber , 
            title , 
            thumbnail ,
        } = this.state.product;

        const product = {
            id,
            brand,
            partNumber ,
            title ,
            thumbnail , 
            quantity :  stock.quantity ,
            warehouse : stock.id,
            price : stock.price
        };
        this.props.dispatch(addItem(product));
    };

    handleIncrease = (e,stock)=>{
        const product = this.state.product;

        if( product.stocks.length>0)
        {
            product.stocks.forEach( item =>{
                if( item.id === stock.id )
                {
                    if( stock.quantity+1 > item.count)
                    {
                        notification['warning']({
                            message : 'Warning',
                            description : 'You reach the limit of the warehouse\'s quantity',
                            duration : 5
                        })
                    }
                    else item.quantity++;
                    
                }
            });
        }
        this.setState({product})
    };


    handleDecrease = (e,stock)=>{
        const product = this.state.product;

        if( product.stocks.length>0)
        {
            product.stocks.forEach( item =>{
                if( item.id === stock.id )
                {
                    if( stock.quantity-1 >= 1)
                        item.quantity--;
                    
                }
            });
        }
        this.setState({product})
    }

    productStocks = (stocks)=>{
        const lines = [];

        for(let i =1 ; i< stocks.length ; i++){
            const line = [];

            line.push(<td className="text-center">{stocks[i].id}</td>);
            line.push(<td className="text-center">
                <div className="product-quantity-control">
                    <button className="btn-quantity" onClick={e=>this.handleDecrease(e,stocks[i])}>-</button>
                    <span className="product-quantity">{stocks[i].quantity}</span>
                    <button className="btn-quantity" onClick={(e)=>this.handleIncrease(e,stocks[i])}>+</button>
                </div>
            </td>);
            line.push(<td className="text-center">{stocks[i].delivery} day(s)</td>);
            line.push(<td>{this.formatNumber(stocks[i].price)}</td>);
            line.push(<td>
                        <button className="btn_add_to_cart" onClick={(e) =>this.handleAddItemToCart(e,stocks[i])}>Add to cart</button>
                    </td>);

            lines.push(<tr>{line}</tr>);
        }
        return lines;
    }

    formatNumber = (num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')+' p.';
    }

   


    render(){
        const product = this.state.product ;

        return (
            <Fragment>
                <tr>
                    <td rowSpan={product.stocks.length>0 ? product.stocks.length : 1}>
                    <div className="product-row">
                        <img className="product-image" src={product.thumbnail} alt="" width="100"/>
                        <div className="product-detaill" >
                            <h6>{product.brand}</h6>
                            <p>{product.partNumber}</p>
                            <p>
                            <Link
                                href={`/product/item?guid=${product.id}&source=${product.source}`} className='product-link'
                            >
                                <a className="ps-product__title">{product.title}</a>
                            </Link>
                            </p>
                        </div>

                    </div>
                    </td>
                    {product.stocks.length>0 && (
                    <Fragment>
                        <td  className="text-center">{product.stocks[0].id}</td>
                        <td  className="text-center">
                            <div className="product-quantity-control">
                                <button className="btn-quantity" onClick={e=>this.handleDecrease(e,product.stocks[0])}>-</button>
                                <span className="product-quantity">{product.stocks[0].quantity}</span>
                                <button className="btn-quantity" onClick={(e)=>this.handleIncrease(e,product.stocks[0])}>+</button>
                            </div>
                        </td>
                        <td className="text-center">{product.stocks[0].delivery} day(s)</td>
                        <td>{this.formatNumber(product.stocks[0].price)}</td>
                        <td>
                            <button className="btn_add_to_cart" onClick={(e) =>this.handleAddItemToCart(e,product.stocks[0])}>Add to cart</button>
                        </td>
                    </Fragment>
                    ) }
                </tr>

            {product.stocks.length>0 && this.productStocks(product.stocks) }
            
            <tr className="product-separator">
                <td colSpan="6"></td>
            </tr>
            </Fragment>
        );

    }
}
const mapStateToProps = state => {
    return state.setting;
};
export default connect(mapStateToProps)(ProductItem);

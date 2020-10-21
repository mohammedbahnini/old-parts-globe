import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableNotifications from './modules/TableNotifications';
import Link from 'next/link';
import ProductCart from '../../elements/products/ProductCart';
import Router from 'next/router';
import axios from 'axios';
import { getClientData } from '../../../helpers/auth';

class OrderDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount = async()=>{
        const { orderID } =  Router.query;
        const response = await axios.get(`${process.env.api}/order/detail?orderID=${orderID}`);

        this.setState({...response.data});
    }

    render(){
        const order = this.state;
        

        return (
            <div>
                {order && (
                    <section className="ps-my-account ps-page--account">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="ps-section__left">
                                    <AccountMenuSidebar activeLink='Orders'/>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="ps-page__content">
                                    <div className="ps-section--account-setting">
                                        <div className="ps-section__header">
                                            <h3>
                                                Order #500884010 -
                                                <strong>{order.Received ? 'Recevied' : 'Not received yet'}</strong>
                                            </h3>
                                        </div>
                                        <div className="ps-section__content">
                                            <div className="row">
                                                <div className="col-md-4 col-12">
                                                    <figure className="ps-block--invoice">
                                                        <figcaption>
                                                            Address
                                                        </figcaption>
                                                        <div className="ps-block__content">
                                                            <strong>
                                                                {order.firstName} {order.lastName}
                                                            </strong>
                                                            <p>
                                                                Address: {order.Address}
                                                            </p>
                                                            <p>
                                                                Phone: {order.PhoneNumber}
                                                            </p>
                                                        </div>
                                                    </figure>
                                                </div>
                                                <div className="col-md-4 col-12">
                                                    <figure className="ps-block--invoice">
                                                        <figcaption>
                                                            Shipping Fee
                                                        </figcaption>
                                                        <div className="ps-block__content">
                                                            <p>
                                                                Shipping Fee: Free
                                                            </p>
                                                        </div>
                                                    </figure>
                                                </div>
                                                <div className="col-md-4 col-12">
                                                    <figure className="ps-block--invoice">
                                                        <figcaption>
                                                            Payment
                                                        </figcaption>
                                                        <div className="ps-block__content">
                                                            <p>
                                                                Payment Method: {order.PaymentProcedrue}
                                                            </p>
                                                        </div>
                                                    </figure>
                                                </div>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table ps-table--shopping-cart">
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>Price</th>
                                                            <th>Quantity</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.products && (
                                                            order.products.map(
                                                                product => (
                                                                    <tr
                                                                        key={
                                                                            product.Warehouse
                                                                        }>
                                                                        <td>
                                                                            {product.Product}
                                                                        </td>
                                                                        <td className="price">
                                                                            $
                                                                            {
                                                                                product.Price
                                                                            }
                                                                        </td>
        
                                                                        <td>{product.Quantity}</td>
                                                                        <td className="price">
                                                                            $
                                                                            {
                                                                                product.Price
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                                        )
                                                        ) }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Link href="/account/orders">
                                                <a className="ps-btn ps-btn--sm ">
                                                    Back to orders
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                )}
            </div>

        )
    }
}


export default OrderDetail;



/*class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
      
        const invoiceProducts = [
            {
                id: '6',
                thumbnail: '/static/img/products/shop/5.jpg',
                title: 'Grand Slam Indoor Of Show Jumping Novel',
                vendor: "Robert's Store",
                sale: true,
                price: '32.99',
                salePrice: '41.00',
                rating: true,
                ratingCount: '4',
                badge: [
                    {
                        type: 'sale',
                        value: '-37%',
                    },
                ],
            },
            {
                id: '7',
                thumbnail: '/static/img/products/shop/6.jpg',
                title: 'Sound Intone I65 Earphone White Version',
                vendor: 'Youngshop',
                sale: true,
                price: '100.99',
                salePrice: '106.00',
                rating: true,
                ratingCount: '5',
                badge: [
                    {
                        type: 'sale',
                        value: '-5%',
                    },
                ],
            },
        ];
        return (
           
        );
    }
}

export default InvoiceDetail;*/

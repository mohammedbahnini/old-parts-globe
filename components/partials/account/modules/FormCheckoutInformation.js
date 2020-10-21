import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input , Radio, notification ,Button , Alert } from 'antd';
import { getClientData, isLoggedIn } from '../../../../helpers/auth';
import { CardNumberElement , CardExpiryElement , CardCvcElement , ElementsConsumer} from '@stripe/react-stripe-js'
import axios from 'axios';
import  {LoadingOutlined} from '@ant-design/icons';
import {  clearCart } from '../../../../store/cart/action';
import { connect } from 'react-redux';


const customStyle = {
    style: {
        base: {
            fontSize: '14px'
        },
        invalid: {
          color: '#c23d4b',
        }
      }
}

const containerInputStyle = {
    padding : '18px',
    border : '1px solid #ccc',
    width : '100%'
}







class FormCheckoutInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            first_name : '',
            last_name : '' , 
            phone : '' ,
            address : '',
            postal_code : '' , 
            save_data : true ,
            pay_now : false ,
            amount  : this.props.amount  , 
            processing : false , 
            chekoutCompleted : false , 
            shipping_method : 1, 
            errors : []
        }

    }
    // shipping method : 
    // 1 : shipping at home 
    // 2 : shipping at warehouse

    

    // loading client data if is logged 
    async componentDidMount(){

        const isLogged = await isLoggedIn();
        if( isLogged )
        {
            const client = await getClientData();
            this.setState({ ...this.state , ...client , loading : false});
        }
        else {
            Router.push('/login');
        }
       
    }

    // change the state
    onChangeInput = (e)=>{
        const { name , value } = e.target;
        this.setState( { [name] : value });
    }

    onChangeChekbox = (e)=>{
        const { name , checked } = e.target;
        this.setState({ [name] : checked});
    }



    handleLoginSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Router.push('/account/shipping');
            } else {
            }
        });
    };


    showErrorPayment = ()=>{
        notification.open({
            message: 'Failure',
            type : 'error' ,
            description: 'An error occured during the payment !',
            duration: 500
        });
    }

    handleCheckout =async  (e)=>{
        e.preventDefault();
        this.setState({processing : true });

        // validate order data
        const order = {
            firstName : this.state.first_name,
            lastName : this.state.last_name ,
            email : this.state.email , 
            phone : this.state.phone ,
            address : this.state.address , 
            postalCode:this.state.postal_code , 
            payNow : this.state.pay_now ,
            amount : this.props.amount , 
            shippingMethod : this.state.shipping_method ,
            saveData : this.state.save_data ,
            products  : this.props.cartItems.map( product => { 
                return {
                    detail : product.title , 
                    warehouse : product.warehouse ,
                    price : product.price , 
                    quantity : product.quantity ,
                    amount : product.price * product.quantity
                }
            })
        }
        const validateRes = await axios.post(`${process.env.api}/order/validate`,order);

        if( validateRes.data.success)
        {
            let canCreateOrder = true ;
            // check if the user wants to pay imediatly

            if( this.state.pay_now)
            {
                // make a payment with credit card 
                const { stripe , elements} = this.props;

                // get client_secret 
                const paymentIntentReq = await axios.post(`${process.env.api}/payment-intent/create`,{amount  : Math.ceil(this.props.amount*100)});
                
                if( !paymentIntentReq.data.client_secret)
                {
                    this.setState({
                        errors : [],
                        processing : false ,
                        chekoutCompleted : false
                    });
                    this.showErrorPayment();
                    canCreateOrder=false;
                    return;
                }
                const {client_secret} = paymentIntentReq.data;

                // create a payment_method_id
                const result = await stripe.createPaymentMethod({
                    type: 'card',
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                    // include some additional informations
                    name: `${this.state.first_name} ${this.state.last_name}`,
                    email : this.state.email , 
                    phone : this.state.phone 
                    },
                });
                console.log(result);
                if( !result.paymentMethod)
                {
                    this.setState({
                        errors : [],
                        processing : false ,
                        chekoutCompleted : false
                    });
                    this.showErrorPayment();
                    canCreateOrder=false;
                    return;
                }
                // confirm the payment 
                const confirmPaymentMethod =await  stripe.confirmCardPayment(client_secret ,{
                    payment_method : result.paymentMethod.id
                });

                if( confirmPaymentMethod.error)
                {
                    this.setState({
                        errors : [],
                        processing : false ,
                        chekoutCompleted : false
                    });
                    this.showErrorPayment();
                    canCreateOrder = false;
                    return;
                }
                else if( confirmPaymentMethod.paymentIntent.status === 'succeeded')
                {
                    canCreateOrder = true ;
                }

            }

            if( canCreateOrder)
            {
                // then create an order             
                const orderResponse = await axios.post(`${process.env.api}/order/create`,order);

                if( orderResponse.data.errors)
                {
                    this.setState({
                        errors : orderResponse.data.errors ,
                        chekoutCompleted : false ,
                        processing : false
                    });
                }
                if( orderResponse.data.success) {
                    this.setState({
                        chekoutCompleted : true,
                        processing : false,
                        errors : []
                    });
                    // order created 
                    notification.open({
                        message: 'Success',
                        type : 'success' ,
                        description: 'Your order has been created successfuly !',
                        duration: 5,
                    });
                    this.props.clearCart();
                    Router.push('/account/orders'); // show orders
                }
                else 
                {
                    this.setState({
                        chekoutCompleted : false , 
                        errors : [], 
                        processing : false
                    });
                    notification.open({
                        message: 'Error',
                        type : 'error' ,
                        description: 'An error occured during creatin your order , please try later !',
                        duration: 5,
                    });
                }
            }
        }
        else if( validateRes.data.errors)
        {
            this.setState({
                errors : validateRes.data.errors,
                processing : false,
                chekoutCompleted : false
            })
        }

        
    
    }

    render() {

        const { amount, cartItems, cartTotal } = this.props;
        const radioStyle = {
            display: 'block'
          };
        const errorsStyle = {marginBottom : '20px'};
        return (

            <Fragment>
               
                <Form
                className="ps-form--checkout"
                onSubmit={this.handleCheckout}>
                <div className="ps-form__content">
                    <div className="row">

                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            {this.state.errors.map(error=>{
                                return (
                                    <div style={errorsStyle}>
                                        <Alert message={error} type="error" showIcon />
                                    </div>
                                )
                            })}

                            <div className="ps-form__billing-info">
                                <h3 className="ps-form__heading">
                                    Contact information
                                </h3>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-6">
                                        <Form.Item label="Email address">
                                            <Input
                                                className="form-control"
                                                type="text"
                                                placeholder="Email address"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onChangeInput}
                                                disabled
                                            />
                                        </Form.Item>
                                        </div>

                                        <div className="col-sm-6">
                                        <Form.Item  label="Phone number">
                                            <Input
                                                className="form-control"
                                                type="text"
                                                placeholder="Phone number"
                                                name="phone"
                                                value={this.state.phone}
                                                onChange={this.onChangeInput}
                                            />
                                        </Form.Item>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <Form.Item  label="First name">
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="First Name"
                                                        name="first_name"
                                                        value={this.state.first_name}
                                                        onChange={this.onChangeInput}
                                                        disabled
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <Form.Item label="Last name">
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Last Name"
                                                        name="last_name"
                                                        value={this.state.last_name}
                                                        onChange={this.onChangeInput}
                                                        disabled
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>
                                
                                <h3 className="ps-form__heading">
                                    Shipping address
                                </h3>

                                <div className="form-group">
                                    <Form.Item  label="Address">
                                        <Input.TextArea
                                            className="form-control"
                                            type="text"
                                            placeholder="Address"
                                            name="address"
                                            value={this.state.address}
                                            autoSize={ {minRows:2,maxRows:5}}
                                            onChange={this.onChangeInput}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <Form.Item  label="Postal code">
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Postal code"
                                                        value={this.state.postal_code}
                                                        name="postal_code"
                                                        onChange={this.onChangeInput}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                               
                                <div className="'form-group">
                                    <Form.Item label="Payment method">
                                    <Radio.Group  value={this.state.pay_now} name="pay_now" onChange={(e)=>this.onChangeInput(e)}>
                                        <Radio style={radioStyle} value={true}>
                                        Pay now
                                        </Radio>
                                        <Radio style={radioStyle} value={false}>
                                        Payment until shipping
                                        </Radio>

                                    </Radio.Group>
                                    </Form.Item>
                                </div>
                               {this.state.pay_now && (
                                    <div className="form-group">
                                       <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                <Form.Item  label="Credit card number">
                                                <div style={containerInputStyle}>
                                                    <CardNumberElement options={customStyle}/>
                                                </div>
                                                </Form.Item>
                                            </div>

                                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                                                <Form.Item  label="Expary date">
                                                <div style={containerInputStyle}>
                                                    <CardExpiryElement options={customStyle}/>
                                                </div>
                                                </Form.Item>
                                            </div>

                                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                                                <Form.Item  label="C.V.C">
                                                <div style={containerInputStyle}>
                                                    <CardCvcElement options={customStyle}/>
                                                </div>
                                                </Form.Item>
                                            </div>
                                       </div>
                                    </div>
                               )}
                                <div className="'form-group">
                                    <Form.Item label="Shipping method">
                                    <Radio.Group  value={this.state.shipping_method} name="shipping_method" onChange={(e)=>this.onChangeInput(e)}>
                                        <Radio style={radioStyle} value={1}>
                                        Shipping at home
                                        </Radio>
                                        <Radio style={radioStyle} value={2}>
                                        Shipping at warehouse
                                        </Radio>

                                    </Radio.Group>
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="keep-update"
                                            checked={this.state.save_data}
                                            name="save_data"
                                            onChange={this.onChangeChekbox}
                                        />
                                        <label htmlFor="keep-update">
                                            Save this information for next time
                                        </label>
                                    </div>
                                </div>
                                <div className="ps-form__submit">
                                    <Link href="/account/cart">
                                        <a>
                                            <i className="icon-arrow-left mr-2"></i>
                                            Return to shopping cart
                                        </a>
                                    </Link>
                                    <div className="ps-block__footer">
                                        <button className="ps-btn" disabled={this.state.processing || this.state.chekoutCompleted}>
                                            {this.state.processing && ( <LoadingOutlined style={{marginRight:'15px'}} />)}
                                            {this.state.chekoutCompleted && 'Purchase completed succesfuly'}
                                            {this.state.processing && 'Processing'}
                                            {!this.state.processing && !this.state.chekoutCompleted && 'Validate purchase'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <h3>Your order</h3>
                                <div className="ps-block--checkout-order">
                                    <div className="ps-block__content">
                                        <figure>
                                            <figcaption>
                                                <strong>Product</strong>
                                                <strong>total</strong>
                                            </figcaption>
                                        </figure>
                                        <figure className="ps-block__items">
                                            {cartItems &&
                                            cartItems.map(product => (
                                                <Link
                                                    href="/"
                                                    key={`${product.id}_${product.warehouse}`}>
                                                    <a>
                                                        <strong>
                                                            {product.title} - ({product.warehouse})
                                                            <span>
                                                                    x
                                                                {
                                                                    product.quantity
                                                                }
                                                                </span>
                                                        </strong>
                                                        <small>
                                                            $
                                                            {product.quantity *
                                                            product.price}
                                                        </small>
                                                    </a>
                                                </Link>
                                            ))}
                                        </figure>
                                        <figure>
                                            <figcaption>
                                                <strong>Subtotal</strong>
                                                <small>${amount}</small>
                                            </figcaption>
                                        </figure>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
            </Fragment>



            
        );
    }
}

const WrapForm = Form.create()(FormCheckoutInformation);


const i = (props)=>{

    const {amount , cartItems , cartTotal , clearCart } = props;
    return (
        <ElementsConsumer>
             {({stripe, elements}) => (
            <WrapForm clearCart={clearCart}  stripe={stripe} elements={elements} amount={amount} cartItems={cartItems} cartTotal={cartTotal} />
        )}
        </ElementsConsumer>
    )
}
const mapDispatchToProps = (dispatch)=>{
    return {
        clearCart : ()=>dispatch(clearCart())
    }
}

const InjectedForm = connect(null, mapDispatchToProps)(i);

export default InjectedForm;

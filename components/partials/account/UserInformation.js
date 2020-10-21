import React, { Component, Fragment } from 'react';
import { Form, Input, Radio, DatePicker } from 'antd';
import axios from 'axios';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Alert , notification } from 'antd';
import  {LoadingOutlined} from '@ant-design/icons';

class UserInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.client , 
            updating : false , 
            errors : []
        };
    }

    handleInput(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleUpdate = (e)=>{
        e.preventDefault();
        this.setState({updating : true});
        setTimeout(async ()=>{

            const result_update = await axios.post(`${process.env.api}/user/update` , {
                firstName : this.state.first_name , 
                lastName : this.state.last_name, 
                address : this.state.address , 
                postalCode : this.state.postal_code, 
                phone : this.state.phone
            });
            console.log(result_update);
            this.setState({updating : false});
            if( result_update.data.errors)
            {
                this.setState({errors : result_update.data.errors});
            }
            else if( result_update.data.success)
            {
                this.setState({errors : []});
                notification['success']({
                    message : 'Success',
                    description : 'Your personal informations has been updated successfuly !',
                    duration : 5 
                });
                
            }
            else 
            {
                this.setState({errors : []});
                notification['error']({
                    message : 'Error',
                    description : 'An error occured during updating your informations , try later !',
                    duration : 5 
                });
            }
        },1000)

       
    }

    render() {
        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
                active: true,
            },
            {
                text: 'Notifications',
                url: '/account/notifications',
                icon: 'icon-alarm-ringing',
            },
            {
                text: 'Invoices',
                url: '/account/invoices',
                icon: 'icon-papers',
            },
            {
                text: 'Address',
                url: '/account/address',
                icon: 'icon-map-marker',
            },
            {
                text: 'Recent Viewed Product',
                url: '/account/recent-viewed-product',
                icon: 'icon-store',
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-heart',
            },
            {
                text : 'Orders' ,
                url : '/account/orders',
                icon :'icon-folder'
            }
        ];

        const errorsStyle = {marginBottom : '20px'};
        return (
       <Fragment>
           {this.state && (
                <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-section__left">

                                <AccountMenuSidebar activeLink='Account Information' />
                            </div>
                        </div>
                        <div className="col-lg-8">
                       
                            <div className="ps-page__content">
                                <Form
                                    className="ps-form--account-setting"
                                    onSubmit={this.handleUpdate}>
                                    <div className="ps-form__header">
                                        <h3>Account Information</h3>
                                    </div>
                                    <div className="ps-form__content">
                                    {this.state.errors.map( error => {
                                        return (
                                            <div style={errorsStyle}>
                                                <Alert message={error} type="error" showIcon />
                                            </div>
                                        )
                                    })
                                    }
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <Form.Item label="First name">
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="First name"
                                                            name="first_name"
                                                            onChange={(e)=>this.handleInput(e)}
                                                            value={this.state.first_name}
                                                        />
                                                    </Form.Item>
                                                </div>

                                                <div className="col-sm-6">
                                                    <Form.Item label="Last name">
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Last name"
                                                            name="last_name"
                                                            onChange={(e)=>this.handleInput(e)}
                                                            value={this.state.last_name}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <Form.Item label="Address">
                                                <Input.TextArea
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Address"
                                                    name="address"
                                                    value={this.state.address}
                                                    onChange={(e)=>this.handleInput(e)}
                                                    autoSize={ {minRows:2 , maxRows : 5}}
                                                />
                                            </Form.Item>             
                                        </div>


                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <Form.Item label="Phone Number">
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Phone number"
                                                        name="phone"
                                                        value={this.state.phone}
                                                        onChange={(e)=>this.handleInput(e)}
                                                    />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <Form.Item label="Email">
                                                      
                                                            <Input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Email address"
                                                                value = {this.state.email}
                                                                name="email"
                                                                disabled
                                                            />
                                                        
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                <Form.Item label="Postal code">
                                                      
                                                      <Input
                                                          className="form-control"
                                                          type="text"
                                                          placeholder="Postal code"
                                                          value = {this.state.postal_code}
                                                          onChange={(e)=>this.handleInput(e)}
                                                          name="postal_code"
                                                      />
                                                  
                                              </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group submit">
                                            <button className="ps-btn">
                                                {this.state.updating && (<LoadingOutlined style={{marginRight:'15px'}} />)}
                                                {this.state.updating && 'Updating...'}
                                                {this.state.updating == false && 'Update'}
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           )}
       </Fragment>
           
        );
    }
}
const WrapFormUserInformation = Form.create()(UserInformation);
export default WrapFormUserInformation;

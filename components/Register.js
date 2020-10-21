import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import { Alert , notification } from 'antd';
import  {LoadingOutlined} from '@ant-design/icons';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors : [] ,
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            password2 : '',
            phone: '',
            address : '',
            postalCode : '' ,
            process : false , 
            registerd : false
        };

       
    }

    onChangeInput = (e)=>{
        const { name , value } = e.target;
        this.setState({ [name] : value });
    }


    handleSubmit = e => {
        e.preventDefault();
        this.setState({process : true , errors: []});
        setTimeout(()=>{
            const { firstName , lastName , address , phone , email,password , password2 , postalCode } = this.state;
            
            // perform a request to the server 
            axios.post(`${process.env.api}/user/register`,{
                firstName  ,
                lastName  ,
                address , 
                phone  ,
                email , 
                password  ,
                password2 , 
                postalCode
            }).then( res =>{
                this.setState({process : false });
                const data = res.data;
                if( data.errors )
                {
                    this.setState({
                        errors : data.errors
                    });  
                }
                else if( data.insertedId )
                {
                    this.setState({errors : [] , registerd : true  });
                    
                    notification['success']({
                        message : 'Success',
                        description : 'Your account has been created successfuly , now you can login to you account .',
                        duration : 5 ,
                        onClose : ()=>{
                            Router.push('/login');
                        }
                    });
                    Router.push('/login');
                    
                }
            });

        },2000);
        
    };

    render() {

        const errorsStyle = {marginBottom : '20px'};

        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onSubmit={this.handleSubmit}>

                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Register An Account</h5>
                                {
                                    this.state.errors.map( error => {
                                        return (
                                            <div style={errorsStyle}>
                                                <Alert message={error} type="error" showIcon />
                                            </div>
                                        )
                                    })
                                }
                                <div className="form-group">
                                    <Form.Item>
                                       <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="First name"
                                            name="firstName"
                                            onChange={e=> this.onChangeInput(e)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item>
                                       <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Last name"
                                            name="lastName"
                                            onChange={e=> this.onChangeInput(e)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item>
                                       <Input
                                            className="form-control"
                                            type="email"
                                            placeholder="Email address"
                                            name="email"
                                            onChange={e=> this.onChangeInput(e)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item>
                                       <Input.TextArea
                                            className="form-control"
                                            type="text"
                                            placeholder="Address,appartement,etc..."
                                            name="address"
                                            autoSize={{minRows:2,maxRows:5}}
                                            onChange={this.onChangeInput}
                                        />
                                    </Form.Item>

                                </div>
                                <div className="form-group">
                                    <Form.Item>
                                       <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Postal code"
                                            name="postalCode"
                                            onChange={e=> this.onChangeInput(e)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item>
                                       <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Phone number"
                                            name="phone"
                                            onChange={e=> this.onChangeInput(e)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            onChange={e=> this.onChangeInput(e)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Confirm password"
                                            name="password2"
                                            onChange={e=> this.onChangeInput(e)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth"
                                        disabled={this.state.process || this.state.registerd}>
                                        {this.state.process && (<LoadingOutlined style={{marginRight:'15px'}} />)}
                                        {this.state.process && 'Registring...'}
                                        {this.state.registerd && ('You are registred')}
                                        {this.state.process==false && this.state.registerd==false && ('Register')}
                                    </button>
                                </div>
                            </div>
                           
                        </div>
                    </Form>
                </div>
              
            </div>

            /* check ths info */
           
        );
    }
}
const WrapFormRegister = Form.create()(Register);
const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(WrapFormRegister);

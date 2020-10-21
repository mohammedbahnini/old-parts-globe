import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../store/auth/action';
import { isLoggedIn } from '../helpers/auth';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, notification, Alert } from 'antd';
import { connect } from 'react-redux';



import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            email: 'mohammed.gosoft@gmail.com',
            password: '123456789',
            rememberMe: false,
            process: false,
            isLogged: false
        };
    }


    onChangeInput = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async componentDidMount() {
        // check is logged in 
        const isLogged = await isLoggedIn();
        if (isLogged)
            Router.push('/');
    }



    handleLoginSubmit = async (e) => {
        e.preventDefault();
        this.setState({ process: true, errors: [] });
        setTimeout(async () => {
            const email = this.state.email;
            const password = this.state.password;
            const remember_me = this.state.rememberMe;
            const api_path = `${process.env.HOST}/api/user/login`;
            console.log(process.env.API);
            console.log(api_path);
            const result = await axios.post(api_path,
                {
                    email,
                    password,
                    remember_me
                });

            this.setState({ errors: result.data.errors, process: false });
            if (result.data.errors.length === 0) // login success
            {
                this.setState({ isLogged: true });
                this.props.dispatch(login());
                Router.push('/account/user-information');
            }
        }, 2000);

    };

    render() {

        const errorsStyle = { marginBottom: '20px' };
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onSubmit={this.handleLoginSubmit}>

                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Log In Your Account</h5>

                                {
                                    this.state.errors.map(error => {
                                        return (
                                            <div style={errorsStyle} key={error.message}>
                                                <Alert message={error.message} type={error.type} showIcon />
                                            </div>
                                        )
                                    })
                                }

                                <div className="form-group">
                                    <Form.Item>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Email address"
                                            name="email"
                                            onChange={this.onChangeInput}
                                            value={this.state.email}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password..."
                                            name="password"
                                            onChange={this.onChangeInput}
                                            value={this.state.password}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="remember-me"
                                            name="rememberMe"
                                            onChange={this.onChangeInput}
                                        />
                                        <label htmlFor="remember-me">
                                            Rememeber me
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth"
                                        disabled={this.state.process || this.state.isLogged}
                                    >
                                        {this.state.process && (<LoadingOutlined style={{ marginRight: '15px' }} />)}
                                        {this.state.process && 'Logging in ...'}
                                        {this.state.isLogged && ('You are logged')}
                                        {this.state.process == false && this.state.isLogged == false && ('Login')}
                                    </button>
                                </div>

                                <div>
                                    You do not have an account yet ,
                                    <Link href="/register">
                                        <a>Create one</a>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
const WrapFormLogin = Form.create()(Login);

const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(WrapFormLogin);

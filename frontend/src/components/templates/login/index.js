import './style.scss';
import { Row, Col, Form, Button, Divider, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../store/user/action';
import { useRouter } from 'next/router';
import CustomInputField from '../../elements/input';
import {Link} from 'react-router-dom'
const LoginTemplate = (props) => {

    
    const initialValues = {
        username: '',
        password: '',
    };


    const rules = {
        password: [
            {
                required: true,
            }
        ],
    };

    const onFinish = async values => { 

        const { username, password } = values
        
        

    };

    const onFinishFailed = () => { };

    return (
        <React.Fragment>
            <Row className="login-page">
                <Col xs={ 24 } lg={ 24 }>
                    <div className="app-login-content">
                        <Row className='w-100' justify="center">
                            <Col span={ 10 } className="c-2">
                                <Form
                                    name="login"
                                    initialValues={ initialValues }
                                    onFinish={ onFinish }
                                    onFinishFailed={ onFinishFailed }>
                                        
                                    <div className="form-header">
                                        <Link to="/">
                                            <img alt="logo" className="logo" src="/logo.svg" />
                                            <span className="logo-title">Logo</span>
                                        </Link>
                                       
                                    </div>

                                    <Form.Item 
                                        className='m-0' 
                                        name='username'>
                                        <CustomInputField 
                                            placeholder="Username"
                                            customStyle='style#1'
                                        />
                                    </Form.Item>
                                    <br/>
                                    <Form.Item 
                                        className='m-0' 
                                        name='password'
                                        rules={ rules.password }>
                                        <CustomInputField
                                            placeholder="Password"
                                            customStyle='style#1'
                                            type='password'
                                            
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Link to="/forgot-password">
                                            <a className="forgot-password">
                                                <span>Forgot Password</span>
                                            </a>
                                        </Link>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            name="signin"
                                            className="signin-button"
                                            htmlType="submit"
                                            type="primary">
                                            <span>Sign in</span>
                                        </Button>
                                    </Form.Item>

                                    <Form.Item>
                                        <Link to="/register">
                                            <Button
                                                name="signin"
                                                className="signin-button"
                                                type="primary">
                                                <span>Register</span>
                                            </Button>
                                        </Link>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default (LoginTemplate);

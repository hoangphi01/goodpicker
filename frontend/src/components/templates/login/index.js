import './style.scss';
import { Row, Col, Form, Button, Space, message, Image, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import CustomInputField from '../../elements/input';
import {Link, withRouter} from 'react-router-dom'
import {FacebookOutlined } from "@ant-design/icons"

const { TabPane } = Tabs;


const LoginTemplate = (props) => {

    
    // const initialValues = {
    //     username: '',
    //     password: '',
    // };


    const rulesLogin = {
        password: [
            {
                required: true,
            }
        ],
    };

    const rulesRegister = {
        email: [
            {
                type: 'email',
            },
            {
                required: true,
            },
        ],
        firstName: [
            {
                required: true,
            }
        ],
        lastName: [
            {
                required: true,
            }
        ],
        username: [
            {
                required: true,
            }
        ],
        password: [
            {
                required: true,
            }
        ],
    };

    const onFinishLogin = async values => { 

        props.history.push('/');
        

    };

    const onFinishLoginFailed = () => { };

    const onFinishRegister = async values => { 

        
        props.history.push('/');
        

    };

    const onFinishRegisterFailed = () => { };




    const [error, setError] = useState(null);
    const[initialLoginValue, setInitialLoginValue] = useState({
        email: '',
        password: '',
    });
    const[initialRegisterValue, setInitialRegisterValue] = useState({
        email: '',
        password: '',
        firstName:'',
        lastName:'',
        username: '',

    });

    return (
        <React.Fragment>
            <Row className="signup-page">
                <Col xs={ 24 } lg={ 24 }>
                    <div className="app-signup-content">
                        <Row className='w-100' justify="end">
                            <Col span={ 8 } className="c-2">
                            
                                <Form>
                                        
                                    <div className="form-header">
                                        <Link to="/">
                                            <Image alt="logo" className="logo-img" src="/logo/logo_full.png" />
                                        </Link>
                                    </div>
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab = "Login" key ="1">
                                            <Form 
                                                name="login"
                                                initialValues={ initialLoginValue }
                                                onFinish={ onFinishLogin }
                                                onFinishFailed={ onFinishLoginFailed }>
                                                <Form.Item 
                                                    className='m-0' 
                                                    name='email'>
                                                    <CustomInputField 
                                                        placeholder="Email"
                                                        customStyle='style#2'
                                                        onChange={e=>setInitialLoginValue(e.target.value)}
                                                    />
                                                </Form.Item>
                                                <br/>
                                                <Form.Item 
                                                    className='m-0' 
                                                    name='password'
                                                    rules={ rulesLogin.password }>
                                                    <CustomInputField
                                                        placeholder="Password"
                                                        customStyle='style#2'
                                                        type='password'
                                                        onChange={e=>setInitialLoginValue(e.target.value)}
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
                                                        className="signup-button"
                                                        htmlType="submit"
                                                        type="primary"
                                                        onClick={onFinishLogin}>
                                                        <span>Sign in</span>
                                                    </Button>
                                                </Form.Item>
                                                <Space align="start"
                                                    size="middle">
                                                    <label for="login-with" classname="login-with">Login with:</label>
                                                    <FacebookOutlined />

                                                </Space>
                                            </Form>
                                        </TabPane>

                                        <TabPane tab = "Register" key ="2">
                                            <Form 
                                                name="login"
                                                initialValues={ initialRegisterValue }
                                                onFinish={ onFinishRegister }
                                                onFinishFailed={ onFinishRegisterFailed }>
                                                <Form.Item 
                                                className='m-0' 
                                                name='firstName'
                                                rules={ rulesRegister.firstName }>
                                                <CustomInputField
                                                    placeholder="First Name"
                                                    customStyle='style#2'
                                                />
                                                </Form.Item>

                                                <Form.Item 
                                                    className='m-0' 
                                                    name='lastName'
                                                    rules={ rulesRegister.lastName }>
                                                    <CustomInputField
                                                        placeholder="Last Name"
                                                        customStyle='style#2'
                                                    />
                                                </Form.Item>

                                                <Form.Item 
                                                    className='m-0' 
                                                    name='username'
                                                    rules={ rulesRegister.username }>
                                                    <CustomInputField 
                                                        placeholder="Username"
                                                        customStyle='style#2'
                                                    />
                                                </Form.Item>


                                                <Form.Item 
                                                    className='m-0' 
                                                    name='email'
                                                    rules={ rulesRegister.email }>
                                                    <CustomInputField
                                                        placeholder="Email"
                                                        customStyle='style#2'
                                                    />
                                                </Form.Item>

                                                <Form.Item 
                                                    className='m-0' 
                                                    name='password'
                                                    rules={ rulesRegister.password }>
                                                    <CustomInputField
                                                        placeholder="Password"
                                                        customStyle='style#2'
                                                        type='password'
                                                    />
                                                </Form.Item>
                                                
                                                <Form.Item 
                                                    className='m-0' 
                                                    name='re-password'
                                                    rules={ rulesRegister.password }>
                                                    <CustomInputField
                                                        placeholder="Type Password Again"
                                                        customStyle='style#2'
                                                        type='password'
                                                    />
                                                </Form.Item>

                                                <Form.Item>
                                                    <Button
                                                        name="signup"
                                                        className="signup-button"
                                                        htmlType="submit">
                                                        <span>Sign Up</span>
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </TabPane>
                                    </Tabs>
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

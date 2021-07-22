import './style.scss';
import { Row, Col, Form, Button, Divider, message } from 'antd';
import React, { useEffect } from 'react';

import CustomInputField from '../../elements/input';
import {Link} from 'react-router-dom'
const RegisterTemplate = (props) => {

    
    const initialValues = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    };

    const rules = {
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

    const onFinish = async values => {
        
        const { username, password } = values;

       
    };

    const onFinishFailed = () => { };

    return (
        <React.Fragment>
            <Row className="signup-page">

                <Col xs={ 24 } lg={ 24 }>
                    <div className="app-signup-content">
                        <Row className='w-100' justify="center">
                            <Col span={ 12 }>
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
                                        name='firstName'
                                        rules={ rules.firstName }>
                                        <CustomInputField
                                            placeholder="First Name"
                                            customStyle='style#1'
                                        />
                                    </Form.Item>

                                    <Form.Item 
                                        className='m-0' 
                                        name='lastName'
                                        rules={ rules.lastName }>
                                        <CustomInputField
                                            placeholder="Last Name"
                                            customStyle='style#1'
                                        />
                                    </Form.Item>

                                    <Form.Item 
                                        className='m-0' 
                                        name='username'
                                        rules={ rules.username }>
                                        <CustomInputField 
                                            placeholder="Username"
                                            customStyle='style#1'
                                        />
                                    </Form.Item>


                                    <Form.Item 
                                        className='m-0' 
                                        name='email'
                                        rules={ rules.email }>
                                        <CustomInputField
                                            placeholder="Email"
                                            customStyle='style#1'
                                        />
                                    </Form.Item>

                                    <Form.Item 
                                        className='m-0' 
                                        name='password'
                                        rules={ rules.password }>
                                        <CustomInputField
                                            placeholder="Password"
                                            customStyle='style#1'
                                        />
                                    </Form.Item>
                                    
                                    <Form.Item 
                                        className='m-0' 
                                        name='password'
                                        rules={ rules.password }>
                                        <CustomInputField
                                            placeholder="Type Password Again"
                                            customStyle='style#1'
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
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default (RegisterTemplate);

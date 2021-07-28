import './style.scss'
import React, { useEffect, useState,useRef } from 'react'
import { Row, Col, Form, 
    Button, Steps, message, 
    Tabs, Modal } from 'antd'
import CustomInputField from '../../../components/elements/input'



const AccountDetails = (props) => {


    const rulesRegister = {
        email: [
            {
                type: 'email'
            },
            {
                required: true
            }
        ],
        firstName: [
            {
                required: true
            }
        ],
        lastName: [
            {
                required: true
            }
        ],
        username: [
            {
                required: true
            }
        ],
        password: [
            {
                required: true
            }
        ]
    }
    
    const [initialRegisterValue, setInitialRegisterValue] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        username: ''
    })

    const onFinishRegister = () => {}
    const onFinishRegisterFailed = () => {}

    return(
        <React.Fragment>
        <Form name="login"
            initialValues={initialRegisterValue}
            onFinish={onFinishRegister}
            onFinishFailed={onFinishRegisterFailed}>
            

            <Form.Item
                className="m-0"
                name="lastName"
                rules={rulesRegister.lastName}
                >
                <CustomInputField
                    placeholder="Họ và Tên"
                    customStyle="style#2"
                />
            </Form.Item>

            <Form.Item
                className="m-0"
                name="username"
                rules={rulesRegister.username}
                >
                <CustomInputField
                    placeholder="Tên người dùng"
                    customStyle="style#2"
                />
            </Form.Item>

            <Form.Item
                className="m-0"
                name="email"
                rules={rulesRegister.email}
                >
                <CustomInputField
                    placeholder="Email"
                    customStyle="style#2"
                />
            </Form.Item>

            <Form.Item
                className="m-0"
                name="password"
                rules={rulesRegister.password}
                >
                <CustomInputField
                    placeholder="Mật khẩu"
                    customStyle="style#2"
                    type="password"
                />
            </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default AccountDetails
import './style.scss'
import React, { useEffect, useState,useRef } from 'react'
import { Row, Col, Form, 
    Button, Steps, message, 
    Tabs, Modal } from 'antd'
import CustomInputField from '../../../components/elements/input'



const PaymentDetails = (props) => {
    return(
        <React.Fragment>
        <Form>
            <Form.Item
            className="m-0"
            name="firstName"
            // rules={rulesRegister.firstName}
            >
            <CustomInputField
                placeholder="Số điện thoại"
                customStyle="style#2"
            />
            </Form.Item>

            

            {/* <Form.Item
                className="m-0"
                name="email"
                // rules={rulesRegister.email}
                >
                <CustomInputField
                    placeholder="Tài khoản thanh toán"
                    customStyle="style#2"
                />
            </Form.Item> */}

            <Form.Item
                className="m-0"
                name="password"
                // rules={rulesRegister.password}
                >
                <CustomInputField
                    placeholder="Ngân hàng"
                    customStyle="style#2"
                />
            </Form.Item>

            <Form.Item
                className="m-0"
                name="lastName"
                // rules={rulesRegister.lastName}
                >
                <CustomInputField
                    placeholder="Chi nhánh"
                    customStyle="style#2"
                />
            </Form.Item>

            <Form.Item
                className="m-0"
                name="username"
                // rules={rulesRegister.username}
                >
                <CustomInputField
                    placeholder="Số tài khoản liên kết với ví"
                    customStyle="style#2"
                />
            </Form.Item>

            <Form.Item
                className="m-0"
                name="username"
                // rules={rulesRegister.username}
                >
                <CustomInputField
                    placeholder="Mã xác nhận"
                    customStyle="style#2"
                />
            </Form.Item>

            {/* <Form.Item
                className="m-0"
                name="username"
                // rules={rulesRegister.username}
                >
                <CustomInputField
                    placeholder="Địa chỉ cụ thể"
                    customStyle="style#2"
                />
            </Form.Item> */}
            </Form>
        </React.Fragment>
    )
}

export default PaymentDetails
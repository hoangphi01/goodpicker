import './style.scss'
import React, { useEffect, useState,useRef } from 'react'
import { Row, Col, Form, 
    Button, Steps, message, 
    Tabs, Modal } from 'antd'
import CustomInputField from '../../../components/elements/input'



const PersonalDetails = (props) => {
    return(
        <React.Fragment>
            <Form>

                <Form.Item
                className="m-0"
                name="phone"
                // rules={rulesRegister.firstName}
                >
                <CustomInputField
                    placeholder="Số điện thoại"
                    customStyle="style#2"
                />
                </Form.Item>
                
                <Form.Item
                className="m-0"
                name="birthday"
                // rules={rulesRegister.firstName}
                >
                <CustomInputField
                    placeholder="Ngày sinh"
                    customStyle="style#2"
                />
                </Form.Item>

                

                <Form.Item
                    className="m-0"
                    name="gender"
                    // rules={rulesRegister.email}
                    >
                    <CustomInputField
                        placeholder="Giới tính"
                        customStyle="style#2"
                    />
                </Form.Item>

                

                <Form.Item
                    className="m-0"
                    name="address"
                    // rules={rulesRegister.username}
                    >
                    <CustomInputField
                        placeholder="Địa chỉ cụ thể"
                        customStyle="style#2"
                    />
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default PersonalDetails
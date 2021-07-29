import './style.scss'
import React, { useEffect, useState,useRef } from 'react'
import { Row, Col, Form, 
    Button, Steps, message, 
    Tabs, Modal } from 'antd'
import CustomInputField from '../../../components/elements/input'



const ChangePassword = (props) => {
    const onFinishSubmit = () => {
        message.success('Change password complete')
        props.history.push('/')
    }
    return(
        <React.Fragment>
            <Form>

                <Form.Item
                className="m-0"
                name="old-password"
                // rules={rulesRegister.firstName}
                >
                <CustomInputField
                    placeholder="Mật khẩu cũ"
                    customStyle="style#2"
                />
                </Form.Item>
                
                <Form.Item
                className="m-0"
                name="new-password"
                // rules={rulesRegister.firstName}
                >
                <CustomInputField
                    placeholder="Mật khẩu mới"
                    customStyle="style#2"
                />
                </Form.Item>

                

                <Form.Item
                    className="m-0"
                    name="re-new-password"
                    // rules={rulesRegister.email}
                    >
                    <CustomInputField
                        placeholder="Nhập lại mật khẩu mới"
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

                <Form.Item>
                    <Button
                        name="submit"
                        className="submit-button"
                        htmlType="submit"
                        type="primary"
                        onClick={onFinishSubmit}
                    >
                        <span>Hoàn tất</span>
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default ChangePassword
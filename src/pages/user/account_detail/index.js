import './style.scss'
import React, { useEffect, useState,useRef } from 'react'
import { Row, Col, Form, 
    Button, Steps, message, 
    Tabs, Modal, Image, Upload } from 'antd'
import CustomInputField from '../../../components/elements/input'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import ImageUpload from '../../new-post/image-upload'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
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

    // const [loading, setLoad] = useState(false)
    const [loading, setLoading] = useState(
        false
    )
    const [imageUrl,setImageUrl] = useState('')
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
    const handleChange = info => {
        if (info.file.status === 'uploading') {
          setLoading({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            setImageUrl({imageUrl}),
            setLoading({
              loading: false,
            }),
          );
        }
      };

    // const resetClear = React.useCallback(() => {
	// 	dispatch({ type: 'reset_images' })
	// }, [])
    const onFinishRegister = () => {}
    const onFinishRegisterFailed = () => {}
    

    return(
        <React.Fragment>
        <Form name="login"
            initialValues={initialRegisterValue}
            onFinish={onFinishRegister}
            onFinishFailed={onFinishRegisterFailed}>
            


            <Form.Item className="m-1"
                name="image">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
            </Form.Item>

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
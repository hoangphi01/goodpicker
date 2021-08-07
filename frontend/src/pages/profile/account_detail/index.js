import './style.scss'
import React, { useEffect, useState,useRef } from 'react'
import { Form, Alert, Col, Row} from 'antd'
import CustomInputField from '../../../components/elements/input'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import AvatarUpload from './avatar-upload';
import { useAuthState } from '../../../hooks/useAuth';

const newAvatar = (state, action) => {
	switch (action.type) {
		case 'get_categories':
			return { ...state, categories: action.categories }
		case 'update_files':
			return { ...state, fileList: action.fileList }
		case 'update_index':
			return { ...state, mainIndex: action.mainIndex }
		case 'upload_success':
			return {
				...state,
				status: 'success',
				message: 'Cập nhật thành công',
				clear: true
			}
		case 'upload_fail':
			return {
				...state,
				status: 'error',
				message:
					'Đã có lỗi trong quá trình cập nhật. Vui lòng kiểm tra thông tin đã nhập'
			}
		case 'reset_status':
			return { ...state, status: 'idle' }
		case 'reset_images':
			return { ...state, clear: false }
		// case 'no_images':
		// 	return {
		// 		...state,
		// 		status: 'error',
		// 		message: 'Bài đăng cần kèm theo ảnh. Vui lòng thêm ảnh vào bài đăng.'
		// 	}
		default:
			throw new Error('Impossible!')
	}
}


const AccountDetails = () => {

    const {user, cookies} = useAuthState()

    const rules = {
        email: [
            {
                type: 'email',
                required: true,
                message: 'Vui lòng nhập Email'
            }
        ],
        name: [
            {
                required: true,
                message: 'Vui lòng nhập Họ và Tên'
            }
        ],
        username: [
            {
                required: true,
                message: 'Vui lòng nhập tên người dùng'
            }
        ]
    }
    
    const [state, dispatch] = React.useReducer(newAvatar,{
        status: 'idle',
        clear: false,
        message: null,
        fileList: [],
        mainIndex: 0,
        categories: [],
        initialValues: {
            name: '',
            username: '',
            email: ''
        }
    })


    const updateFileList = fileList => {
		dispatch({ type: 'update_files', fileList })
	}

	const updateMainIndex = mainIndex => {
		dispatch({ type: 'update_index', mainIndex })
	}

	const resetClear = React.useCallback(() => {
		dispatch({ type: 'reset_images' })
	}, [])

	const onAlertClose = () => {
		dispatch({ type: 'reset_status' })
	}

    
    

    return(
        <React.Fragment>
            <div>
                {state.message ? (
                    <Alert
                        className={`new-post__alert new-post__alert--${state.status}`}
                        message={state.message}
                        type={state.status}
                        closable
                        onClose={onAlertClose}
                    />
                ) : null}
            <div className="profile-acount-page">
            <Col>
                <Row className="profile-avatar">
                    <AvatarUpload
                        className="new-post-upload"
                        updateFileList={updateFileList}
                        updateMainIndex={updateMainIndex}
                        clear={state.clear}
                        resetClear={resetClear}
                    />
                </Row>
                    <Col className="profile-item">
                        <Form.Item
                            className="m-0"
                            name="lastName"
                            rules={rules.name}
                            >
                            <CustomInputField
                                placeholder="Họ và Tên"
                                customStyle="style#2"
                            />
                        </Form.Item>

                        <Form.Item
                            className="m-0"
                            name="username"
                            rules={rules.username}
                            >
                            <CustomInputField
                                placeholder="Tên người dùng"
                                customStyle="style#2"
                            />
                        </Form.Item>
                        

                        <Form.Item
                            className="m-0"
                            name="email"
                            rules={rules.email}
                            >
                            <CustomInputField
                                placeholder="Email"
                                customStyle="style#2"
                                defaultValue = {user.email}
                                disabled
                            />
                        </Form.Item>
                    </Col>
                </Col>

                </div>
            </div>
        </React.Fragment>
    )
}

export default AccountDetails
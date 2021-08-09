// import './style.scss'
// import { Row, Col, Form, Button, Space, message, Tabs,Steps } from 'antd'
// import React, { useEffect, useState } from 'react'
// import CustomInputField from '../../components/elements/input'
// import { Link, withRouter, useHistory } from 'react-router-dom'
// import { FacebookOutlined } from '@ant-design/icons'
// import Logo from '../../components/elements/logo'
// import AccountDetails from './account_detail'
// import PersonalDetails from './personal_detail'
// import SiteLayout from '../../components/layouts/site-layout'
// import ChangePassword from './change_password'
// import { useAuthState } from '../../hooks/useAuth'
// import Custom404 from '../404'
// import axios from 'axios'

// const {TabPane} = Tabs
// const { Step } = Steps;

// const updateUserProfile = (state, action) => {
// 	switch (action.type) {
// 		case 'get_user':
// 			return { ...state, user: action.user }
// 		case 'update_infomation':
// 			return { ...state, infor: action.info }
// 		case 'update_index':
// 			return { ...state, mainIndex: action.mainIndex }
// 		case 'upload_success':
// 			return {
// 				...state,
// 				status: 'success',
// 				message: 'Cập nhật thành công',
// 				clear: true
// 			}
// 		case 'upload_fail':
// 			return {
// 				...state,
// 				status: 'error',
// 				message:
// 					'Đã có lỗi trong quá trình cập nhật. Vui lòng kiểm tra thông tin đã nhập'
// 			}
// 		case 'reset_status':
// 			return { ...state, status: 'idle' }
// 		case 'reset_images':
// 			return { ...state, clear: false }
// 		// case 'no_images':
// 		// 	return {
// 		// 		...state,
// 		// 		status: 'error',
// 		// 		message: 'Bài đăng cần kèm theo ảnh. Vui lòng thêm ảnh vào bài đăng.'
// 		// 	}
// 		// default:
// 		// 	throw new Error('Impossible!')
// 	}
// }

// const steps = [
// 	{
// 	  title: 'Thông tin tài khoản',
// 	  content: <AccountDetails />,
// 	},
// 	{
// 	  title: 'Thông tin cá nhân',
// 	  content: <PersonalDetails />,
// 	},
// ];
// const UserProfilePage = props => {
	
// 	const [current, setCurrent] = React.useState(0);

// 	const next = () => {
// 		setCurrent(current + 1);
// 	};

// 	const prev = () => {
// 		setCurrent(current - 1);
// 	};


// 	const [form] = Form.useForm()
// 	const { user, cookies } = useAuthState()
// 	const history = useHistory()
	
// 	const [state, dispatch] = React.useReducer(updateUserProfile, {
// 		status: 'idle',
// 		clear: false,
// 		message: null,
// 		infor: '',
// 		mainIndex: 0,
// 		users: '',
// 		initialValues: {
// 			name: user.name,
// 			username: user.username,
// 			email: user.email,
// 			phone: user.phone,
// 			birthday: user.birthday,
// 			gender: user.gender,
// 			address: user.address,
// 			// avatar: user.userImage
// 		}
// 	})

	

	

	

// 	React.useLayoutEffect(() => {
// 		if (!user) {
// 			history.push('/')
// 		}

// 		const getCategories = async () => {
// 			const res = await axios.get('/api/categories')

// 			dispatch({ type: 'get_users', categories: res.data })
// 		}
// 		getCategories()
// 	}, [user, history])

// 	const onFinish = async values => {
// 		message.success('Processing complete!')
		

// 	}

// 	return (
// 		<SiteLayout>
// 		<div>
// 		{cookies['gp_token']? (
// 			<Row className="profile-page">
// 				<Col xs={24} lg={24}>
					
// 					<div className="app-profile-content">
// 						<Row className="w-100" justify="center">
// 							<Col span={12} className="c-2">
								
									
// 									<Tabs defaultActiveKey="1" size="large" tabBarGutter = "150px">
										
// 											<TabPane tab="Thông tin người dùng" key="1" className="info-user-tab">
// 												<Form 
// 													className ="update-user-info"
// 													layout="vertical"
// 													onFinish={onFinish}
// 													scrollToFirstError
// 													initialValues={state.initialValues}
// 												>
// 												<Steps current={current}>
// 													{steps.map(item => (
// 													<Step key={item.title} title={item.title} />
// 													))}
// 												</Steps>
// 												<div className="steps-content">{steps[current].content}</div>
// 												<div className="steps-action">
// 													{current > 0 && (
// 													<Button className="prev-button"
// 														name = "previous" 
// 														style={{ margin: '0 8px' }} 
// 														onClick={() => prev()}>
// 														Previous
// 													</Button>
// 													)}
// 													{current < steps.length - 1 && (
// 													<Button className="next-button" 
// 														name = "next"
// 														type="primary" 
// 														onClick={() => next()}>
// 														Next
// 													</Button>
// 													)}
// 													{current === steps.length - 1 && (
// 													<Button className="next-button" 
// 														name = "done"
// 														type="primary" 
// 														htmlType="submit">
// 														Done
// 													</Button>
// 													)}
													
// 												</div>
// 																							{/* </Form> */}
// 											</Form>

// 												</TabPane>

// 										<TabPane tab="Thay đổi mật khẩu" key="2" className="info-user-tab">
// 											<ChangePassword/>
// 										</TabPane>
// 									</Tabs>
								
// 							</Col>
// 						</Row>
// 					</div>
// 				</Col>
// 			</Row>
// 			) : (
// 				<Custom404/>
// 			)
// 			}
// 			</div>
// 		</SiteLayout>
// 	)
// }

// export default UserProfilePage
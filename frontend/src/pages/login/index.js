import './style.scss'
import { Row, Col, Form, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomInputField from '../../components/elements/input'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../components/elements/logo'
import SiteLayout from '../../components/layouts/site-layout'
import APIservice from '../../service/APIservice'
import { useCookies } from 'react-cookie'

const LoginPage = props => {
	const rules = {
		email: [
			{ type: 'email', message: 'Địa chỉ email không hợp lệ.' },
			{ required: true, message: 'Vui lòng nhập email.' }
		],
		realName: [{ required: true, message: 'Vui lòng nhập tên của bạn.' }],
		username: [{ required: true, message: 'Vui lòng nhập tên người dùng.' }],
		password: [{ required: true, message: 'Vui lòng nhập mật khẩu.' }]
	}

	const [error, setError] = useState(null)

	const initialLoginValue = {
		email: '',
		password: ''
	}

	const initialRegisterValue = {
		email: '',
		password: '',
		firstName: '',
		realName: '',
		username: ''
	}

	const [token, setToken] = useCookies(['mytoken'])
	let history = useHistory()

	React.useEffect(() => {
		if (token['mytoken']) {
			history.push('/')
		}
		console.log(token)
	}, [history, token])

	const onFinishLogin = async initialLoginValue => {
		APIservice.login({
			email: initialLoginValue.email,
			password: initialLoginValue.password
		})
			.then(res => {
				setToken('mytoken', res.data.token)
				localStorage.setItem('mytoken', res.data.token)
				console.log(res)
			})
			// .then(setRedirect(true))
			.catch(err => {
				console.log(err)
			})
	}

	const onFinishRegister = async initialRegisterValue => {
		props.history.push('/profile')
	}

	const [activeTab, setActiveTab] = useState('login')

	return (
		<SiteLayout>
			<div className="signup-page">
				<div className="app-signup-sidebar"></div>
				<div className="app-signup-content">
					<Row justify="end">
						<Col xs={24} md={8} className="c-2">
							<div className="form-header">
								<Link to="/">
									<Logo className="logo--form" />
								</Link>
							</div>

							{activeTab === 'login' ? (
								<Form
									name="login"
									initialValues={initialLoginValue}
									onFinish={onFinishLogin}
								>
									<Form.Item className="m-0" name="email" rules={rules.email}>
										<CustomInputField
											placeholder="Email"
											customStyle="style#2"
										/>
									</Form.Item>

									<Form.Item
										className="m-0"
										name="password"
										rules={rules.password}
									>
										<CustomInputField
											placeholder="Mật khẩu"
											customStyle="style#2"
											type="password"
										/>
									</Form.Item>

									<Form.Item>
										<Link className="forgot-password" to="/forgot-password">
											<span>Quên mật khẩu?</span>
										</Link>
									</Form.Item>

									<Form.Item>
										<Button
											name="signin"
											className="signup-button"
											htmlType="submit"
											type="primary"
										>
											<span>Đăng nhập</span>
										</Button>
									</Form.Item>
									<div className="auth-alt">
										<span className="auth-alt auth-alt--sub">hoặc</span>
										<span
											className="auth-alt auth-alt--main"
											onClick={() => setActiveTab('register')}
										>
											Tạo tài khoản
										</span>
									</div>
								</Form>
							) : (
								<Form
									name="register"
									initialValues={initialRegisterValue}
									onFinish={onFinishRegister}
								>
									<Form.Item
										className="m-0"
										name="realName"
										rules={rules.realName}
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

									<Form.Item className="m-0" name="email" rules={rules.email}>
										<CustomInputField
											placeholder="Email"
											customStyle="style#2"
										/>
									</Form.Item>

									<Form.Item
										className="m-0"
										name="password"
										rules={rules.password}
									>
										<CustomInputField
											placeholder="Mật khẩu"
											customStyle="style#2"
											type="password"
										/>
									</Form.Item>

									<Form.Item
										className="m-0"
										name="re-password"
										rules={rules.password}
									>
										<CustomInputField
											placeholder="Nhập lại mật khẩu"
											customStyle="style#2"
											type="password"
										/>
									</Form.Item>

									<Form.Item>
										<Button
											name="signup"
											className="signup-button"
											htmlType="submit"
											onClick={onFinishRegister}
										>
											<span>Đăng ký</span>
										</Button>
									</Form.Item>

									<div className="auth-alt">
										<span className="auth-alt auth-alt--sub">hoặc</span>
										<span
											className="auth-alt auth-alt--main"
											onClick={() => setActiveTab('login')}
										>
											Đăng nhập
										</span>
									</div>
								</Form>
							)}
						</Col>
					</Row>
				</div>
			</div>
		</SiteLayout>
	)
}

LoginPage.propTypes = {}

export default LoginPage

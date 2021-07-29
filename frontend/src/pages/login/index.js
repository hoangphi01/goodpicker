import './style.scss'
import { Row, Col, Form, Button, Space, message, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomInputField from '../../components/elements/input'
import { Link, withRouter } from 'react-router-dom'
import { FacebookFilled } from '@ant-design/icons'
import Logo from '../../components/elements/logo'
import SiteLayout from '../../components/layouts/site-layout'


const { TabPane } = Tabs

const LoginPage = (props) => {
	

	const rulesLogin = {
		password: [
			{
				required: true
			}
		]
	}

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

	

	const [error, setError] = useState(null)
	const [initialLoginValue, setInitialLoginValue] = useState({
		email: '',
		password: ''
	})
	const [initialRegisterValue, setInitialRegisterValue] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		username: ''
	})

	const onFinishLogin = async initialLoginValue => {
		props.history.push('/')
	}

	const onFinishLoginFailed = () => {}

	const onFinishRegister = async initialRegisterValue => {
		props.history.push('/profile')
	}

	const onFinishRegisterFailed = () => {}

	return (
		<React.Fragment>
			<Row className="signup-page">
				<Col xs={24} lg={24}>
                    <div className="app-signup-header">
                        <SiteLayout/>
                    </div>
                    <div className="app-signup-sidebar">

                    </div>
					<div className="app-signup-content">
						<Row className="w-100" justify="end">
							<Col span={8} className="c-2">
								<Form>
									<div className="form-header">
										<Link to="/">
											<Logo width={120} />
										</Link>
									</div>
									<Tabs defaultActiveKey="1" size="large" tabBarGutter = "90px" >
										<TabPane tab="Đăng nhập" key="1" className="login-tab" >
											<Form
												name="login"
												initialValues={initialLoginValue}
												onFinish={onFinishLogin}
												onFinishFailed={onFinishLoginFailed}
											>
												<Form.Item className="m-0" name="email">
													<CustomInputField
														placeholder="Email"
														customStyle="style#2"
														onChange={e => setInitialLoginValue(e.target.value)}
													/>
												</Form.Item>
												<br />
												<Form.Item
													className="m-0"
													name="password"
													rules={rulesLogin.password}
												>
													<CustomInputField
														placeholder="Mật khẩu"
														customStyle="style#2"
														type="password"
														onChange={e => setInitialLoginValue(e.target.value)}
													/>
												</Form.Item>

												<Form.Item>
													<Link to="/forgot-password">
														<a className="forgot-password">
															<span>Quên mật khẩu?</span>
														</a>
													</Link>
												</Form.Item>

												<Form.Item>
													<Button
														name="signin"
														className="signup-button"
														htmlType="submit"
														type="primary"
														onClick={onFinishLogin}
													>
														<span>Đăng nhập</span>
													</Button>
												</Form.Item>
												<Space align="start" size="middle">
													<label for="login-with" classname="login-with">
														Đăng nhập với:
													</label>
													<FacebookFilled style={{color: "#2a27ce"}} />
												</Space>
											</Form>
										</TabPane>

										<TabPane tab="Đăng ký" key="2" className="register-tab">
											<Form
												name="login"
												initialValues={initialRegisterValue}
												onFinish={onFinishRegister}
												onFinishFailed={onFinishRegisterFailed}
											    >
												

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

												<Form.Item
													className="m-0"
													name="re-password"
													rules={rulesRegister.password}
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
	)
}

LoginPage.propTypes = {
	
}

export default LoginPage

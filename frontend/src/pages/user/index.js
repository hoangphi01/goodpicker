import './style.scss'
import { Row, Col, Form, Button, Space, message, Tabs,Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomInputField from '../../components/elements/input'
import { Link, withRouter } from 'react-router-dom'
import { FacebookOutlined } from '@ant-design/icons'
import Logo from '../../components/elements/logo'
import AccountDetails from './account_detail'
import PersonalDetails from './personal_detail'
// import PaymentDetails from './payment_detail'
import SiteLayout from '../../components/layouts/site-layout'
import ChangePassword from './change_password'


const {TabPane} = Tabs
const { Step } = Steps;

const steps = [
	{
	  title: 'Thông tin người dùng',
	  content: <AccountDetails />,
	},
	{
	  title: 'Thông tin cá nhân',
	  content: <PersonalDetails />,
	},
	// {
	//   title: 'Thông tin thanh toán',
	//   content: <PaymentDetails />,
	// },
  ];
const UserProfilePage = props => {
	
	const [current, setCurrent] = React.useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const onDone = () => {
		message.success('Processing complete!')
		props.history.push('/')

	}

	return (
		<React.Fragment>
			<Row className="profile-page">
				<Col xs={24} lg={24}>
					<div className="app-profile-header">
						<SiteLayout/>
					</div>
					<div className="app-profile-content">
						<Row className="w-100" justify="center">
							<Col span={12} className="c-2">
								<Form>
									
									<Tabs defaultActiveKey="1" size="large" tabBarGutter = "40px">
										<TabPane tab="Thông tin người dùng" key="1" className="info-user-tab">
										<Steps current={current}>
											{steps.map(item => (
											<Step key={item.title} title={item.title} />
											))}
										</Steps>
										<div className="steps-content">{steps[current].content}</div>
										<div className="steps-action">
											{current > 0 && (
											<Button className="prev-button"
												name = "previous" 
												style={{ margin: '0 8px' }} 
												onClick={() => prev()}>
												Previous
											</Button>
											)}
											{current < steps.length - 1 && (
											<Button className="next-button" 
												name = "next"
												type="primary" 
												onClick={() => next()}>
												Next
											</Button>
											)}
											{current === steps.length - 1 && (
											<Button className="next-button" 
												name = "done"
												type="primary" 
												onClick={onDone}>
												Done
											</Button>
											)}
											
										</div>
										</TabPane>

										<TabPane tab="Thay đổi mật khẩu" key="2" className="info-user-tab">
											<ChangePassword/>
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

export default UserProfilePage

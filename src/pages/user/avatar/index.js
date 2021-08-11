import './style.scss'
import { Row, Col, Image, Button, Form } from 'antd'
import React, { useState, useEffect } from 'react'
import DEFAVT from '../../../img/default_avatar.jpg'
import { useAuthState } from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'

const AvatarSide = ({ visitedUser }) => {
	const { user } = useAuthState()

	return (
		<React.Fragment>
			<Col className="user-avatar">
				<Row className="user-avatar-title">
					<h2>
						<b>Trang cá nhân</b>
					</h2>
				</Row>
				<br />
				<Row
					className="user-avatar-content"
					gutter={{ xs: 10, sm: 32, md: 120 }}
				>
					<Col className="user-avatar-content-img">
						<Row>
							<Image
								id="avatar"
								className="img-fluid"
								src={visitedUser.userImage}
								fallback={DEFAVT}
							/>
						</Row>
						<Row>
							{user && user.id === visitedUser.id ? (
								<Link to="/profile">
									<Button className="user-avatar-button">
										Chỉnh sửa trang cá nhân
									</Button>
								</Link>
							) : null}
						</Row>
					</Col>

					<Col className="user-avatar-content-info">
						<h3>
							<b>{visitedUser.username}</b>
						</h3>
						<h6>
							<i>{visitedUser.name}</i>
						</h6>
						{visitedUser.userPhoneNumber ? (
							<Row>
								<h5>
									<b>Thông tin liên hệ: </b>
									{visitedUser.userPhoneNumber}
								</h5>
							</Row>
						) : null}

						<br />
						<Row>
							<h5>
								<b>Email: </b>
								{visitedUser.email}
							</h5>
						</Row>
						<br />
						<Row>
							<h5>
								<b>Địa chỉ: </b>
								{visitedUser.userProvinceID.userProvinceName}
							</h5>
						</Row>
						<br />
						<Row>
							<h5>
								<b>Xếp hạng: </b>5/5
							</h5>
						</Row>
					</Col>
				</Row>
			</Col>
		</React.Fragment>
	)
}

export default AvatarSide

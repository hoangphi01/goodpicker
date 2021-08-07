import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Menu, Dropdown, Tooltip, Skeleton } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { useAuthState, useLogout } from '../../../../../hooks/useAuth'
import AuthService from '../../../../../service/AuthService'

const HeaderControl = () => {
	const { user, cookies } = useAuthState()
	const logout = useLogout()

	const onLogOut = async () => {
		AuthService.logout(cookies['gp_token']).then(() => logout())
	}

	const menu = (
		<Menu>
			<Link to="/users">
				<Menu.Item key="profile">Quản lí tài khoản</Menu.Item>
			</Link>
			<Link to="/wallet">
				<Menu.Item key="wallet">Ví của tôi</Menu.Item>
			</Link>
			<Menu.Divider />
			<Menu.Item key="logout" onClick={onLogOut}>
				Đăng xuất
			</Menu.Item>
		</Menu>
	)

	return (
		<div className="header-section header-section--right">
			{cookies['gp_token'] ? (
				user ? (
					<>
						<Link to="new-post" className="header-icon">
							<Tooltip mouseEnterDelay={0.4} title="Thêm sản phẩm">
								<button className="header-btn header-btn--icon">
									<FileAddOutlined />
								</button>
							</Tooltip>
						</Link>

						<div className="header-auth">
							<Dropdown
								overlay={menu}
								trigger={['click']}
								placement="bottomLeft"
								arrow
							>
								{user.userImage ? (
									<Avatar
										size="large"
										src={user.userImage}
										className="header-auth__avatar"
									/>
								) : (
									<Avatar
										size="large"
										className="header-auth__avatar header-auth__avatar--default"
									>
										{user.name[0].toUpperCase()}
									</Avatar>
								)}
							</Dropdown>
						</div>
					</>
				) : (
					<div>
						<Skeleton.Avatar
							className="header-skeleton"
							shape="circle"
							size="large"
							active
						/>
						<Skeleton.Avatar
							className="header-skeleton"
							shape="circle"
							size="large"
							active
						/>
						<Skeleton.Avatar
							className="header-skeleton"
							shape="circle"
							size="large"
							active
						/>
					</div>
				)
			) : (
				<Link to="/login">
					<div className="header-auth">
						<button className="header-btn header-btn--auth">Đăng nhập</button>
					</div>
				</Link>
			)}
		</div>
	)
}

export default HeaderControl

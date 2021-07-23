import './style.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../../../elements/logo'

const AppHeader = () => {
	return (
		<Layout.Header className="header">
			<Link to="/">
				<Logo type="mini" className="logo--header" />
			</Link>

			<div className="header-right">
				<Link to="/login">
					<div className="header-auth">
						<button className="header-auth-button header-auth-button--login">
							Đăng nhập
						</button>
						{/* <div className="header-auth-divider"></div>
						<button className="header-auth-button header-auth-button--signup">
							Đăng kí
						</button> */}
					</div>
				</Link>
			</div>
		</Layout.Header>
	)
}

export default AppHeader

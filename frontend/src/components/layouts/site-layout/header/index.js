import './style.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Tooltip } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import Logo from '../../../elements/logo'
import RippleButton from '../../../elements/ripple-button'

const AppHeader = () => {
	return (
		<Layout.Header className="header">
			<div className="header-section header-section--left">
				<Link to="/about-us">About us</Link>
				<Link to="/flagship">Flagship</Link>
			</div>

			<Link to="/">
				<Logo type="mini" className="logo--header" />
			</Link>

			<div className="header-section header-section--right">
				<Link to="new-post" className="header-icon">
					<Tooltip mouseEnterDelay={0.4} title="Thêm sản phẩm">
						<button className="header-btn header-btn--icon">
							<FileAddOutlined />
						</button>
					</Tooltip>
				</Link>

				<Link to="/login">
					<div className="header-auth">
						<button className="header-btn header-btn--auth">Đăng nhập</button>
					</div>
				</Link>
			</div>
		</Layout.Header>
	)
}

export default AppHeader

import './style.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../../../elements/logo'
import HeaderControl from './control'

const AppHeader = () => {
	return (
		<Layout.Header className="header">
			<div className="header-section header-section--left">
				<Link to="/about-us">
					<button className="header-btn">Về chúng tôi</button>
				</Link>
			</div>

			<Link to="/">
				<Logo type="mini" className="logo--header" />
			</Link>

			<HeaderControl />
		</Layout.Header>
	)
}

export default AppHeader

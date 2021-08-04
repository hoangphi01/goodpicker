import './style.scss'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Tooltip } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import Logo from '../../../elements/logo'
import APIservice from '../../../../service/APIservice'

const AppHeader = () => {
	const [email,setEmail] = useState('')

	// useEffect(()=> {
	// 	APIservice.homeUser({email})
		
	// })

	const onLogOut = async name => {
		
		APIservice.logout({
			email
		})
		.then(
			setEmail(''),		
			localStorage.clear()
		)	
	}

	let menu;

	if(email === '') {
		menu =	(<Link to="/login">
					<div className="header-auth">
						<button className="header-btn header-btn--auth">Đăng nhập</button>
					</div>
				</Link>)
	}
	else {
		menu =  (<Link to="/" onClick={onLogOut}>
					<div className="header-auth">
						<button className="header-btn header-btn--auth">Đăng xuất</button>
					</div>
				</Link>)
	}

	
	return (
		<Layout.Header className="header">
			<div className="header-section header-section--left">
				<button className="header-btn">
					<Link to="/about-us">About us</Link>
				</button>
				<button className="header-btn">
					<Link to="/flagship">Flagship</Link>
				</button>
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
				<div>
					{menu}
				</div>
			</div>
		</Layout.Header>
	)
}

export default AppHeader

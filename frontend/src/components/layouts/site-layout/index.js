import './style.scss'

import React from 'react'
import AppFooter from './footer'
import AppHeader from './header'
// import AppSidebar from './sidebar';
import { Layout } from 'antd'

const SiteLayout = ({ children }) => {
	return (
		<Layout className="app-container">
			{/* <AppSidebar /> */}
			<Layout className="layout">
				<AppHeader />
				<Layout.Content>{children}</Layout.Content>
				<AppFooter />
			</Layout>
		</Layout>
	)
}

export default SiteLayout

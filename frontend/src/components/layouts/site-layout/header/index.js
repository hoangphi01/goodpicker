import './style.scss'
import { Layout } from 'antd'
import Logo from '../../../elements/logo'

const AppHeader = () => {
	return (
		<Layout.Header className="header">
			<Logo type="mini" className="logo--header" />
		</Layout.Header>
	)
}

export default AppHeader

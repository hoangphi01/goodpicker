import './style.scss'

import logo from '../../../img/logo_full.png'
import miniLogo from '../../../img/logo_mini.png'
import PropTypes from 'prop-types'

const Logo = ({ className = '', width, alt = 'logo', type = 'full' }) => {
	return type === 'full' ? (
		<img className={className} src={logo} alt={alt} width={width} />
	) : type === 'mini' ? (
		<img className={className} src={miniLogo} alt={alt} width={width} />
	) : null
}

Logo.propTypes = {
	className: PropTypes.string,
	alt: PropTypes.string,
	type: PropTypes.oneOf(['full', 'mini']),
	width: PropTypes.number
}

export default Logo

import './style.scss'

import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import {
	Button,
	Layout,
	message,
	Card,
	Avatar,
	Form,
	Input,
	Select,
	Divider
} from 'antd'

import { RightOutlined } from '@ant-design/icons'

import {
	USER_STATUS,
	USER_ROLE,
	STATUS_CODE,
	RESULT_MESSAGE
} from '../../constants'

const UserProfileTemplate = props => {
	return (
		<React.Fragment>
			<h1>Pro5</h1>
		</React.Fragment>
	)
}

UserProfileTemplate.propTypes = {
	id: PropTypes.string.isRequired
}

export default UserProfileTemplate

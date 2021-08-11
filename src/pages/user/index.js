import './style.scss'
import { Row, Col, Layout, Skeleton } from 'antd'
import React, { Suspense } from 'react'
import SiteLayout from '../../components/layouts/site-layout'
import AvatarSide from './avatar'
import ContentSide from './content'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const UserPage = () => {
	const history = useHistory()
	const { userId } = useParams()
	const [user, setUser] = React.useState(null)

	React.useEffect(() => {
		const getUser = async () => {
			const res = await axios.get(`/api/users/${userId}`)
			setUser(res.data)
		}

		getUser()
	}, [])

	return (
		<SiteLayout>
			{user ? (
				<Col className="user-main-content" span={18}>
					<Row className="user-avatar-side">
						<AvatarSide />
					</Row>

					<Row className="user-content-side">
						<ContentSide userId={user.id} userName={user.name} />
					</Row>
				</Col>
			) : null}
		</SiteLayout>
	)
}

export default UserPage

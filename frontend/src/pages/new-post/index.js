import './style.scss'

import React from 'react'
import axios from 'axios'
import SiteLayout from '../../components/layouts/site-layout'
import { Row, Col, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import ImageUpload from './image-upload'

const NewPost = () => {
	// React.useEffect(() => {
	// 	if (!user) {
	// 		router.push('/')
	// 	}
	// }, [])

	const initialValues = {}

	const rules = []

	const [state, setState] = React.useState({
		successMessage: null,
		errorMessage: null
	})

	const onFinish = async values => {
		// try {
		// 	const res = await fetchMethod(`/api/${route}`, {
		// 		...values,
		// 		image: state.imageUrl ? state.imageUrl : initialValues.image,
		// 		creator: user._id
		// 	})
		// 	const data = res.data
		// 	setState({
		// 		...state,
		// 		successMessage: data.message,
		// 		errorMessage: null
		// 	})
		// 	router.reload()
		// } catch (error) {
		// 	setState({
		// 		...state,
		// 		successMessage: null,
		// 		errorMessage: error.response.data.message
		// 	})
		// }
	}

	const onFormFocus = () => {
		// setState({
		// 	...state,
		// 	errorMessage: null,
		// 	successMessage: null
		// })
	}

	return (
		<SiteLayout>
			<div className="new-post">
				<div className="new-post_title">Tạo bài đăng mới</div>

				<Row></Row>

				<Form
					onFinish={onFinish}
					onFocus={onFormFocus}
					className="new-post-form"
					layout="vertical"
				>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col xs={24} md={12}>
							<Form.Item label="Tên sản phẩm" name="name">
								<Input className="new-post-form__input" type="text" />
							</Form.Item>

							<Form.Item label="Giá sản phẩm" name="price">
								<Input className="new-post-form__input" type="number" />
							</Form.Item>

							<Form.Item label="Danh mục" name="category">
								<Input className="new-post-form__input" type="text" />
							</Form.Item>
						</Col>

						<Col xs={24} md={12}>
							<ImageUpload className="new-post-upload" />
						</Col>
					</Row>

					<Form.Item label="Mô tả" name="description">
						<Input.TextArea className="new-post-form__input" rows={7} />
					</Form.Item>

					<div className="new-post-form-submit">
						<button className="new-post-form-submit__btn new-post-form-submit__btn--cancel">
							<Link to="/profile">Hủy</Link>
						</button>

						<button
							className="new-post-form-submit__btn new-post-form-submit__btn--submit"
							type="submit"
						>
							Đăng bài
						</button>
					</div>
				</Form>
			</div>
		</SiteLayout>
	)
}

export default NewPost

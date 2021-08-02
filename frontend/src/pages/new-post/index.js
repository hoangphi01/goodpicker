import './style.scss'

import React from 'react'
import axios from 'axios'
import SiteLayout from '../../components/layouts/site-layout'
import { Row, Col, Form, Input, InputNumber, Select, Modal, Alert } from 'antd'
import { Link } from 'react-router-dom'
import ImageUpload from './image-upload'
import Loader from '../../components/elements/loader'

const newPostReducer = (state, action) => {
	switch (action.type) {
		case 'get_categories':
			return { ...state, categories: action.categories }
		case 'update_files':
			return { ...state, fileList: action.fileList }
		case 'update_index':
			return { ...state, mainIndex: action.mainIndex }
		case 'upload_success':
			return {
				...state,
				status: 'success',
				message: 'Đăng bài thành công',
				clear: true
			}
		case 'upload_fail':
			return {
				...state,
				status: 'error',
				message:
					'Đã có lỗi trong quá trình đăng bài. Vui lòng kiểm tra thông tin đã nhập'
			}
		case 'reset_status':
			return { ...state, status: 'idle' }
		case 'reset_images':
			return { ...state, clear: false }
		case 'no_images':
			return {
				...state,
				status: 'error',
				message: 'Bài đăng cần kèm theo ảnh. Vui lòng thêm ảnh vào bài đăng.'
			}
		default:
			throw new Error('Impossible!')
	}
}

const NewPost = () => {
	const rules = {
		name: [{ required: true, message: 'Vui lòng điền tên sản phẩm' }],
		price: [{ required: true, message: 'Vui lòng điền giá sản phẩm' }],
		category: [{ required: true, message: 'Vui lòng chọn một danh mục' }]
	}

	const [state, dispatch] = React.useReducer(newPostReducer, {
		status: 'idle',
		clear: false,
		message: null,
		fileList: [],
		mainIndex: 0,
		categories: [],
		initialValues: {
			name: '',
			price: '',
			category: '',
			description: ''
		}
	})

	const [form] = Form.useForm()

	React.useLayoutEffect(() => {
		// if (!user) {
		// 	router.push('/')
		// }

		const getCategories = async () => {
			const res = await axios.get('/api/categories')

			dispatch({ type: 'get_categories', categories: res.data })
		}
		getCategories()
	}, [])

	const onFinish = async values => {
		if (state.fileList.length === 0) {
			window.scrollTo(0, 0)
			return dispatch({ type: 'no_images' })
		}

		let formData = new FormData()

		for (const key in values) {
			formData.append(key, values[key])
		}

		formData.append('goodsCreateId', '1')
		formData.append('goodsLocation', 'Ha Noi')
		formData.append('mainIndex', state.mainIndex)

		state.fileList.forEach((file, i) => formData.append(`images${i}`, file))

		const modal = Modal.info({
			className: 'new-post-modal',
			title: <span className="new-post-modal__title">Đang xử lý</span>,
			content: (
				<div className="new-post-modal-content">
					<div>
						Bài đăng của bạn đang được xử lý, Vui lòng chờ trong giây lát.
					</div>
					<Loader size={150} />
				</div>
			),
			icon: null,
			okButtonProps: { hidden: true }
		})

		try {
			await axios.post('/api/goods/', formData)

			form.resetFields()
			dispatch({ type: 'upload_success' })
		} catch (error) {
			dispatch({ type: 'upload_fail' })
		} finally {
			window.scrollTo(0, 0)
			modal.destroy()
		}
	}

	const updateFileList = fileList => {
		dispatch({ type: 'update_files', fileList })
	}

	const updateMainIndex = mainIndex => {
		dispatch({ type: 'update_index', mainIndex })
	}

	const resetClear = React.useCallback(() => {
		dispatch({ type: 'reset_images' })
	}, [])

	const onAlertClose = () => {
		dispatch({ type: 'reset_status' })
	}

	return (
		<SiteLayout>
			<div className="new-post">
				{state.message ? (
					<Alert
						className={`new-post__alert new-post__alert--${state.status}`}
						message={state.message}
						type={state.status}
						closable
						onClose={onAlertClose}
					/>
				) : null}

				<div className="new-post__title">Tạo bài đăng mới</div>

				<Form
					className="new-post-form"
					layout="vertical"
					form={form}
					onFinish={onFinish}
					scrollToFirstError
					initialValues={state.initialValues}
				>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col xs={24} md={{ span: 12, push: 12 }}>
							<ImageUpload
								className="new-post-upload"
								updateFileList={updateFileList}
								updateMainIndex={updateMainIndex}
								clear={state.clear}
								resetClear={resetClear}
							/>
						</Col>
						<Col xs={24} md={{ span: 12, pull: 12 }}>
							<Form.Item
								label="Tên sản phẩm"
								name="goodsName"
								rules={rules.name}
							>
								<Input className="new-post-form__input" type="text" />
							</Form.Item>

							<Form.Item
								label="Giá sản phẩm"
								name="goodsPrice"
								rules={rules.price}
							>
								<InputNumber
									className="new-post-form__input"
									type="number"
									min={0}
									step={1000}
								/>
							</Form.Item>

							<Form.Item
								label="Danh mục"
								name="goodsCategoryID"
								rules={rules.category}
							>
								<Select className="new-post-form__select">
									{state.categories.map(category => (
										<Select.Option
											key={category.goodsCategoryName}
											value={category.goodsCategoryID}
										>
											{category.goodsCategoryName}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item label="Mô tả" name="goodsDescription">
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

import './style.scss'

import React from 'react'
import axios from 'axios'
import SiteLayout from '../../components/layouts/site-layout'
import { Row, Col, Form, Upload, Modal, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'

const NewPost = () => {
	// React.useEffect(() => {
	// 	if (!user) {
	// 		router.push('/')
	// 	}
	// }, [])

	// const [state, setState] = React.useState({
	// 	successMessage: null,
	// 	errorMessage: null,
	// 	imageUrl: '',
	// 	upload: false
	// })

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

	const onImageChange = imageUrl => {
		// setState({ ...state, imageUrl })
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
						<Col md={12}>
							<Form.Item label="Tên sản phẩm" name="name">
								<Input className="new-post-form__input" type="text" />
							</Form.Item>

							<Form.Item label="Giá sản phẩm" name="price">
								<Input className="new-post-form__input" type="number" />
							</Form.Item>

							<Form.Item label="Phân loại" name="category">
								<Input className="new-post-form__input" type="text" />
							</Form.Item>
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

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

// class PicturesWall extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: '',
//     previewTitle: '',
//     fileList: [

//     ],
//   };

//   handleCancel = () => this.setState({ previewVisible: false });

//   handlePreview = async file => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }

//     this.setState({
//       previewImage: file.url || file.preview,
//       previewVisible: true,
//       previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
//     });
//   };

//   handleChange = ({ fileList }) => this.setState({ fileList });

//   render() {
//     const { previewVisible, previewImage, fileList, previewTitle } = this.state;
//     const uploadButton = (
//       <div>
//         <PlusOutlined />
//         <div style={{ marginTop: 8 }}>Upload</div>
//       </div>
//     );
//     return (
//       <>
//         <Upload
//           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 8 ? null : uploadButton}
//         </Upload>
//         <Modal
//           visible={previewVisible}
//           title={previewTitle}
//           footer={null}
//           onCancel={this.handleCancel}
//         >
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </>
//     );
//   }
// }
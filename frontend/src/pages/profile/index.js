import './style.scss'
import { Row, Col, Form, Button, Space, message, Tabs,Steps, Result, Select, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomInputField from '../../components/elements/input'
import { Link, withRouter, useHistory, useParams } from 'react-router-dom'
import AvatarUpload from './avatar-upload'
import SiteLayout from '../../components/layouts/site-layout'
import ChangePassword from './change_password'
import { useAuthenticate, useAuthState } from '../../hooks/useAuth'
import Custom404 from '../404'
import axios from 'axios'
import { Alert, Modal } from 'antd'
import Loader from '../../components/elements/loader'
import UploadAvatar from './upload-avatar'

const {TabPane} = Tabs;

const optionProvince = [
	{value:'angiang', label: 'An Giang',},
	{value:'baria-vungtau', label: 'Bà Rịa - Vũng Tàu',},
	{value:'baclieu', label: 'Bạc Liêu',},
	{value:'backan', label: 'Bắc Kạn',},
	{value:'bacgiang', label: 'Bắc Giang',},
	{value:'bacninh', label: 'Bắc Ninh',},
	{value:'bentre', label: 'Bến Tre',},
	{value:'binhdinh', label: 'Bình Định',},
	{value:'binhphuoc', label: 'Bình Phước',},
	{value:'binhthuan', label: 'Bình Thuận',},
	{value:'camau', label: 'Cà Mau',},
	{value:'caobang', label: 'Cao Bằng',},
	{value:'cantho', label: 'Cần Thơ (TP)',},
	{value:'danang', label: 'Đà Nẵng (TP)',},
	{value:'daklak', label: 'Đắk Lắk',},
	{value:'daknong', label: 'Đắk Nông',},
	{value:'dienbien', label: 'Điện Biên',},
	{value:'dongnai', label: 'Đồng Nai',},
	{value:'dongthap', label: 'Đồng Tháp',},
	{value:'gialai', label: 'Gia Lai',},
	{value:'hagiang', label: 'Hà Giang',},
	{value:'hanam', label: 'Hà Nam',},
	{value:'hanoi', label: 'Hà Nội (TP)',},
	{value:'hatay', label: 'Hà Tây',},
	{value:'hatinh', label: 'Hà Tĩnh',},
	{value:'haiduong', label: 'Hải Dương',},
	{value:'haiphong', label: 'Hải Phòng (TP)',},
	{value:'hoabinh', label: 'Hòa Bình',},
	{value:'hcm', label: 'Hồ Chí Minh (TP)',},
	{value:'haugiang', label: 'Hậu Giang',},
	{value:'hungyen', label: 'Hưng Yên',},
	{value:'khanhhoa', label: 'Khánh Hòa',},
	{value:'kiengiang', label: 'Kiên Giang',},
	{value:'kontum', label: 'Kon Tum',},
	{value:'laichau', label: 'Lai Châu',},
	{value:'laocai', label: 'Lào Cai',},
	{value:'langson', label: 'Lạng Sơn',},
	{value:'lamdong', label: 'Lâm Đồng',},
	{value:'longan', label: 'Long An',},
	{value:'namdinh', label: 'Nam Định',},
	{value:'nghean', label: 'Nghệ An',},
	{value:'ninhbinh', label: 'Ninh Bình',},
	{value:'ninhthuan', label: 'Ninh Thuận',},
	{value:'phutho', label: 'Phú Thọ',},
	{value:'phuyen', label: 'Phú Yên',},
	{value:'quangbinh', label: 'Quảng Bình',},
	{value:'quangnam', label: 'Quảng Nam',},
	{value:'quangngai', label: 'Quảng Ngãi',},
	{value:'quangninh', label: 'Quảng Ninh',},
	{value:'quangtri', label: 'Quảng Trị',},
	{value:'soctrang', label: 'Sóc Trăng',},
	{value:'sonla', label: 'Sơn La',},
	{value:'tayninh', label: 'Tây Ninh',},
	{value:'thaibinh', label: 'Thái Bình',},
	{value:'thainguyen', label: 'Thái Nguyên',},
	{value:'thanhhoa', label: 'Thanh Hóa',},
	{value:'thuathienhue', label: 'Thừa Thiên – Huế',},
	{value:'tiengiang', label: 'Tiền Giang',},
	{value:'travinh', label: 'Trà Vinh',},
	{value:'tuyenquang', label: 'Tuyên Quang',},
	{value:'vinhlong', label: 'Vĩnh Long',},
	{value:'vinhphuc', label: 'Vĩnh Phúc',},
	{value:'yenbai', label: 'Yên Bái',},
	
]

const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = event => {
        // event.preventDefault;
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{marginRight:3}}
            >
            {label}
        </Tag>
    );
}


const newAvatar = (state, action) => {
	switch (action.type) {
		case 'get_provinces':
			return { ...state, provinces: action.provinces }
		case 'update_files':
			return { ...state, fileImg: action.fileImg }
		case 'upload_success':
			return {
				...state,
				status: 'success',
				message: 'Cập nhật thành công',
				clear: true
			}
		case 'upload_fail':
			return {
				...state,
				status: 'error',
				message:
					'Đã có lỗi trong quá trình cập nhật. Vui lòng kiểm tra thông tin đã nhập'
			}
		case 'reset_status':
			return { ...state, status: 'idle' }
		case 'reset_images':
			return { ...state, clear: false }
		// case 'no_images':
		// 	return {
		// 		...state,
		// 		status: 'error',
		// 		message: 'Bài đăng cần kèm theo ảnh. Vui lòng thêm ảnh vào bài đăng.'
		// 	}
		default:
			throw new Error('Impossible!')
	}
}


const UserProfilePage = () => {
	
	const rules = {
        email: [
            {
                type: 'email',
                required: true,
                message: 'Vui lòng nhập Email'
            }
        ],
        name: [
            {
                required: true,
                message: 'Vui lòng nhập Họ và Tên'
            }
        ],
        username: [
            {
                required: true,
                message: 'Vui lòng nhập tên người dùng'
            }
        ],
		phone: [
            {
                required: true,
                message: 'Vui lòng nhập Số điện thoại'
            }
        ],
        birthday: [
            {
                type: 'date',
                required: true,
                message: 'Vui lòng nhập Ngày sinh'
            }
        ],
        gender: [
            {
                required: true,
                message: 'Vui lòng nhập giới tính'
            }
        ],
        address: [
            {
                required: true,
                message: 'Vui lòng nhập địa chỉ'
            }
        ]
    }


	const { user, cookies } = useAuthState()
	
	const [state, dispatch] = React.useReducer(newAvatar, {
		status: 'idle',
		clear: false,
		message: null,
		fileImg: [],
		users: '',
		provinces: [],
		initialValues: {
            username:'', //user.username,
            email:'', // user.email,
			name:'',// user.name,
			phone:'',// user.phone,
            birthday:'',// user.birthday,
            gender:'', //user.gender,
            address:'', //user.address,
			image:'',// user.userImage,
		}
	})
	
	const [form] = Form.useForm()
	
	const history = useHistory()
	const authenticate = useAuthenticate()
	const userid =user.id;
	React.useLayoutEffect(() => {
		if (!user) {
			history.push('/')
		}

		const getUsers = async () => {
			const res = await axios.get(`/api/provinces/`)
			// console.log(res.data.name)
			dispatch({ type: 'get_provinces', provinces: res.data })
		}
		getUsers()
	}, [user, history])

	// React.useEffect(()=> {
	// 	const pushUsers = async () => {
	// 		const res = await axios.push(`/api/users/${userid}/`)
	// 	}
	// 	pushUsers()
	// }, [user, history])

	const onFinish = async values => {

		let formData = new FormData()

		for (const key in values) {
			formData.append(key, values[key] ?? '')
		}

		formData.append('userId', user.id)
		formData.append('name',values.name)
		formData.append('username',values.username)
		formData.append('phone',values.phone)
		formData.append('birthday',values.birthday)
		formData.append('gender',values.gender)
		formData.append('address',values.address)
		formData.append('email',values.email)
		// if(values.image!= null) {
		// 	formData.append('userImage',values.image)
		// }



		// state.fileImg.forEach((file, i) => formData.append(`images${i}`, file))

		const modal = Modal.info({
			className: 'new-user-modal',
			title: <span className="new-user-modal__title">Đang xử lý</span>,
			content: (
				<div className="new-user-modal-content">
					<div>
						Đang xử lý cập nhật của bạn, vui lòng chờ trong giây lát.
					</div>
					<Loader size={150} />
				</div>
			),
			icon: null,
			okButtonProps: { hidden: true }
		})

		try {
			await axios.patch(`/api/users/${userid}/`, formData, {
				headers: {
					Authorization: `Bearer ${cookies['gp_token']}`
				}
			})
			.then(res => {
				console.log(res.data)
				authenticate({user: res.data, token: cookies['gp_token']})
				// history.push('/user')
			})

			form.resetFields()
			dispatch({ type: 'upload_success' })
		} catch (error) {
			dispatch({ type: 'upload_fail' })
		} finally {
			window.scrollTo(0, 0)
			modal.destroy()
		}
	}


	const onAlertClose = () => {
		dispatch({ type: 'reset_status' })
	}

	return (
		<SiteLayout>
		<div>
		{cookies['gp_token']? (
			<Row className="profile-page">
				<Col xs={24} lg={24}>
					<div className="app-profile-content">
						<Row className="w-100" justify="center">
							<Col span={12} className="c-2">
									<Tabs defaultActiveKey="1" size="large" tabBarGutter = "40px">
										<TabPane tab="Thông tin người dùng" key="1" className="info-user-tab">
											<div>
												{state.message ? (
													<Alert
														className={`update-user__alert update-user__alert--${state.status}`}
														message={state.message}
														type={state.status}
														closable
														onClose={onAlertClose}
													/>
												) : null}
											<div className="profile-acount-page">
												<Col>
													
												<Form 
													className ="update-user-info"
													layout="vertical"
													onFinish={onFinish}
													scrollToFirstError
													initialValues={state.initialValues}
												>
													<Col className="profile-item">
													<Col className="profile-avatar"
														span={6}
														offset={7}>
														
														<Form.Item
															name = "image">
															<UploadAvatar
																// updateFileImg = {updateFileImg}
															/>
														</Form.Item>
													</Col>
														<Form.Item
															className="m-0"
															name="name"
															rules={rules.name}
															// label="Họ và Tên"
															>
															<CustomInputField
																placeholder="Họ và Tên"
																customStyle="style#2"
															/>
														</Form.Item>

														<Form.Item
															className="m-0"
															name="username"
															rules={rules.username}
															// label="Tên người dùng"
															>
															<CustomInputField
																placeholder="Tên người dùng"
																customStyle="style#2"
															/>
														</Form.Item>
														

														<Form.Item
															className="m-0"
															name="email"
															rules={rules.email}
															// label="Email"
															>
															<CustomInputField
																placeholder="Email"
																customStyle="style#2"
																// disabled
															/>
														</Form.Item>

														<Form.Item
															className="m-0"
															name="phone"
															rules={rules.phone}
															// label="Số điện thoại"
															>
															<CustomInputField
																placeholder="Số điện thoại"
																customStyle="style#2"
															/>
															</Form.Item>
															
															<Form.Item
															className="m-0"
															name="birthday"
															rules={rules.birthday}
															// label="Ngày sinh"
															>
															<CustomInputField
																placeholder="Ngày sinh"
																customStyle="style#2"
															/>
															</Form.Item>

															

															<Form.Item
																className="m-0"
																name="gender"
																rules={rules.gender}
																// label="Giới tính"
																>
																<CustomInputField
																	placeholder="Giới tính"
																	customStyle="style#2"
																/>
															</Form.Item>

															

															<Form.Item
																className="m-0"
																name="address"
																rules={rules.address}
																>
																{/* <Select 
																	style={{width:'60%'}}
																	options={ optionProvince }
																	// placeholder={t('Dân tộc')}
																	size='large'
																	defaultValue={ optionProvince[0] }
																/> */}

																<Select className="address-province-form__select"
																	// bordered
																	>
																	{state.provinces.map(address => {
																		<Select.Option
																			key={address.provinceName}
																			value={address.provinceId}
																			>
																			{address.provinceName}
																		</Select.Option>
																	})}
																</Select>
															</Form.Item>

															<Form.Item
															className="">
																<Button
																	name="submit"
																	className="submit-button"
																	htmlType="submit"
																	type="primary"																	>
																	<span>Hoàn tất</span>
																</Button>
															</Form.Item>
														</Col>							
													</Form>
												</Col>

											</div>
										</div>

									</TabPane>

									<TabPane tab="Thay đổi mật khẩu" key="2" className="info-user-tab">
										<ChangePassword/>
									</TabPane>
								</Tabs>
								
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
			) : (
				<Custom404/>
			)
			}
			</div>
		</SiteLayout>
	)
}

export default UserProfilePage
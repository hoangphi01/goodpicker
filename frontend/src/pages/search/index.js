import './style.scss'

import React from 'react'
import axios from 'axios'
import { Form, Row, Col, Input, Select, DatePicker, InputNumber } from 'antd'
import SiteLayout from '../../components/layouts/site-layout'

const SearchPage = () => {
	const [categories, setCategories] = React.useState([])

	React.useLayoutEffect(() => {
		const getCategories = async () => {
			const res = await axios.get('/api/categories')

			setCategories(res.data)
		}
		getCategories()
	}, [])

	const onFinish = values => {
		console.log(values)
	}

	return (
		<SiteLayout>
			<div className="new-post">
				<div className="new-post__title">Kết quả tìm kiếm</div>

				<Form className="new-post-form" layout="vertical" onFinish={onFinish}>
					<Row gutter={{ xs: 0, md: 4, lg: 8 }}>
						<Col xs={24} md={12}>
							<Form.Item name="goodsName" label="Tên món đồ">
								<Input className="new-post-form__input" />
							</Form.Item>
						</Col>

						<Col xs={24} md={6}>
							<Form.Item name="goodsCategoryID" label="Danh mục">
								<Select className="new-post-form__select">
									{categories.map(category => (
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

						<Col xs={24} md={6}>
							<Form.Item name="ordering" label="Sắp xếp theo">
								<Select className="new-post-form__select">
									<Select.Option value="goodsPrice">Giá tăng dần</Select.Option>
									<Select.Option value="-goodsPrice">
										Giá giảm dần
									</Select.Option>
									<Select.Option value="-goodsUpdateTime">
										Mới nhất
									</Select.Option>
									<Select.Option value="goodsUpdateTime">Cũ nhất</Select.Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={{ xs: 0, md: 4, lg: 8 }}>
						<Col xs={24} md={12}>
							<Form.Item name="goodsUpdateTime" label="Ngày cập nhật">
								<DatePicker.RangePicker
									className="new-post-form__input"
									format="DD-MM-YYYY"
								/>
							</Form.Item>
						</Col>

						<Col xs={24} md={6}>
							<Form.Item label="Giá từ" name="goodsPrice_gte">
								<InputNumber
									className="new-post-form__input"
									min={0}
									step={1000}
									formatter={value =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									parser={value => value.replace(/[^\d]/g, '')}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} md={6}>
							<Form.Item name="goodsPrice_lte" label="đến">
								<InputNumber
									className="new-post-form__input"
									min={0}
									step={1000}
									formatter={value =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									parser={value => value.replace(/[^\d]/g, '')}
								/>
							</Form.Item>
						</Col>
					</Row>

					<div className="new-post-form-submit">
						<button
							className="new-post-form-submit__btn new-post-form-submit__btn--submit"
							type="submit"
						>
							Tìm kiếm
						</button>
					</div>
				</Form>

				<div className="search-page-divider"></div>

				<div className="search-page-result-set">
					<div className="search-page-result-card"></div>
				</div>
			</div>
		</SiteLayout>
	)
}

export default SearchPage

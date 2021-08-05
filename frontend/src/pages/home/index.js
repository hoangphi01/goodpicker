import './style.scss'

import React, { useEffect, useState } from 'react'
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi'
import axios from 'axios'
import { Row, Col, Skeleton } from 'antd'
import CustomCarousel from './carousel'
import SiteLayout from '../../components/layouts/site-layout'
import APIservice from '../../service/APIservice'

TimeAgo.addDefaultLocale(vi)
const timeAgo = new TimeAgo('vi-VN')

const homeReducer = (state, action) => {
	switch (action.type) {
		case 'get_categories':
			return { ...state, categories: action.categories }
		case 'add_goods':
			return {
				...state,
				goods: { ...state.goods, [action.category]: action.goods }
			}
		default:
			throw new Error('Impossible!')
	}
}

const HomePage = () => {
	const [state, dispatch] = React.useReducer(homeReducer, {
		categories: [],
		goods: {}
	})

	const { categories, goods } = state

	React.useLayoutEffect(() => {
		const getCategories = async () => {
			const res = await axios.get('/api/categories')

			dispatch({ type: 'get_categories', categories: res.data })
		}
		getCategories()
	}, [])

	React.useEffect(() => {
		categories.forEach(async category => {
			const res = await axios.get(
				`/api/goods?goodsCategoryID=${category.goodsCategoryID}&goodsStatus=false&ordering=-goodsUpdatedTime`
			)

			dispatch({
				type: 'add_goods',
				category: category.goodsCategoryName,
				goods: res.data
			})
		})
	}, [categories])

	const [email, setEmail] = useState('')
	useEffect(() => {
		const config = {
			headers: {
				Authorization: 'Bearer' + localStorage.getItem('token')
			}
		}
		APIservice.homeUser({ email, config }).then(res => {
			localStorage.setItem('token', res.data.token)
		})
	})

	const renderSkeleton = () => {
		var skeletons = []
		for (let i = 0; i < 4; i++)
			skeletons.push(
				<Col
					key={`categoryItemSke#${i + 1}`}
					md={6}
					className="newest-category-item"
				>
					<Skeleton.Input
						className="newest-category-item-skeleton__img"
						active
					/>

					<Skeleton active paragraph={{ rows: 3 }} />
				</Col>
			)
		return <>{skeletons}</>
	}

	return (
		<SiteLayout>
			<div className="homepage">
				<CustomCarousel />

				<div className="newest">
					{categories.map(category => (
						<div className="newest-category">
							<div className="newest-category__title">
								{category.goodsCategoryName}
							</div>

							<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								{goods[category.goodsCategoryName]
									? goods[category.goodsCategoryName].map(item => (
											<Col
												key={item.goodsUpdatedTime}
												md={6}
												className="newest-category-item"
											>
												<div className="newest-category-item-img-wrapper">
													<img
														src={
															item.images.find(image => {
																console.log(image)
																return image.isMain === true
															}).image
														}
														alt={item.goodsName}
													/>
												</div>
												<div className="newest-category-item__ago">
													{timeAgo.format(
														Date.now() -
															(new Date() - new Date(item.goodsUpdatedTime))
													)}
												</div>
												<div className="newest-category-item__name">
													{item.goodsName}
												</div>
												<div className="newest-category-item__price">
													{item.goodsPrice.toLocaleString()}đ
												</div>
											</Col>
									  ))
									: renderSkeleton()}
							</Row>
						</div>
					))}
				</div>
			</div>
		</SiteLayout>
	)
}

export default HomePage

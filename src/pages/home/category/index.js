import './style.scss'

import React from 'react'
import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi'
import { Col, Row, Skeleton } from 'antd'

TimeAgo.addDefaultLocale(vi)
const timeAgo = new TimeAgo('vi-VN')

const Category = ({ categoryId, categoryName }) => {
	const [goods, setGoods] = React.useState([])

	React.useEffect(() => {
		const getGoods = async () => {
			const res = await axios.get(
				`/api/goods?goodsCategoryID=${categoryId}&goodsStatus=false&limit=4&ordering=-goodsUpdatedTime`
			)
			setGoods(res.data.results)
		}

		getGoods()
	}, [categoryId])

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
		<div className="newest-category">
			<div className="newest-category__title">{categoryName}</div>

			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
				{goods.length !== 0
					? goods.map(item => (
							<Col
								key={item.goodsUpdatedTime}
								md={6}
								className="newest-category-item"
							>
								<div className="newest-category-item-img-wrapper">
									<img
										src={item.images.find(image => image.isMain === true).image}
										alt={item.goodsName}
									/>
								</div>
								<div className="newest-category-item__ago">
									{timeAgo.format(
										Date.now() - (new Date() - new Date(item.goodsUpdatedTime))
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
	)
}

export default Category

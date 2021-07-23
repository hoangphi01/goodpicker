import './style.scss'

import React from 'react'
import { Row, Col, Skeleton } from 'antd'
import CustomCarousel from './carousel'
import SiteLayout from '../../components/layouts/site-layout'
import ao1 from '../../img/ao1.jpg'
import vay from '../../img/vay.png'

const HomePage = () => {
	const [fakeData, setFakeData] = React.useState(null)

	React.useEffect(() => {
		setTimeout(
			() =>
				setFakeData([
					{
						src: ao1,
						name: 'Áo gió nam mới sử dụng vài lần',
						price: 1399000,
						lastUpdate: 1
					},
					{
						src: vay,
						name: 'váy dear jose mới mua 3 tháng',
						price: 799000,
						lastUpdate: 2
					},
					{
						src: ao1,
						name: 'Áo gió nam mới sử dụng vài lần',
						price: 1399000,
						lastUpdate: 3
					},
					{
						src: vay,
						name: 'váy dear jose mới mua 3 tháng',
						price: 799000,
						lastUpdate: 4
					}
				]),
			2000
		)
	}, [])

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
					<div className="newest-category">
						<div className="newest-category__title">Quần áo</div>

						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							{fakeData
								? fakeData.map(data => (
										<Col
											key={data.lastUpdate}
											md={6}
											className="newest-category-item"
										>
											<img src={data.src} alt="Ao gio" />
											<div className="newest-category-item__ago">
												{Math.floor(data.lastUpdate)} phút trước
											</div>
											<div className="newest-category-item__name">
												{data.name}
											</div>
											<div className="newest-category-item__price">
												{data.price.toLocaleString()}đ
											</div>
										</Col>
								  ))
								: renderSkeleton()}
						</Row>
					</div>
				</div>
			</div>
		</SiteLayout>
	)
}

export default HomePage

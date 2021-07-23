import './style.scss'

import React from 'react'
import { Rate, Row, Col, Skeleton } from 'antd'
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
						rating: 5
					},
					{
						src: vay,
						name: 'váy dear jose mới mua 3 tháng',
						price: 799000,
						rating: 4.7
					},
					{
						src: ao1,
						name: 'Áo gió nam mới sử dụng vài lần',
						price: 1399000,
						rating: 5
					},
					{
						src: vay,
						name: 'váy dear jose mới mua 3 tháng',
						price: 799000,
						rating: 4.7
					}
				]),
			2000
		)
	}, [])

	const renderSkeleton = () => {
		var skeletons = []
		for (let i = 0; i < 4; i++)
			skeletons.push(
				<Col md={6} className="hotpicks-category-item">
					<Skeleton.Image />
					<Skeleton.Input
						active
						style={{ width: 200, margin: '0.5rem 0' }}
						size="small"
					/>
					<Skeleton.Input
						active
						style={{ width: 200, margin: '0.5rem 0' }}
						size="small"
					/>
					<Skeleton.Input
						active
						style={{ width: 200, margin: '0.5rem 0' }}
						size="small"
					/>
				</Col>
			)
		return <>{skeletons}</>
	}

	return (
		<SiteLayout>
			<div>
				<CustomCarousel />

				<div className="hotpicks">
					<div className="hotpicks-category">
						<div className="hotpicks-category__title">Quần áo</div>

						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							{fakeData
								? fakeData.map(data => (
										<Col md={6} className="hotpicks-category-item">
											<img src={data.src} alt="Ao gio" />
											<Rate disabled allowHalf value={data.rating} />
											<div className="hotpicks-category-item__name">
												{data.name}
											</div>
											<div className="hotpicks-category-item__price">
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

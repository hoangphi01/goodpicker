import React from 'react'
import { Carousel, Rate, Row, Col, Skeleton } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import ao1 from './ao1.jpg'
import vay from './vay.png'
import logo from './logo_full.png'

const CustomNextArrow = ({ className, onClick }) => (
	<div className={`${className} carousel-arrow`} onClick={onClick}>
		<RightOutlined />
	</div>
)

const CustomPrevArrow = ({ className, onClick }) => (
	<div className={`${className} carousel-arrow`} onClick={onClick}>
		<LeftOutlined />
	</div>
)

const settings = {
	nextArrow: <CustomNextArrow />,
	prevArrow: <CustomPrevArrow />
}

const Home = () => {
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

	let renderSkeleton = () => {
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
		<div>
			<div style={{ height: '4rem' }}></div>
			<Carousel
				className="carousel"
				autoplaySpeed={2000}
				effect="fade"
				arrows
				{...settings}
			>
				<div className="carousel-section carousel-section--clothes">
					<div className="test">
						<div className="test-content">
							<span className="test--1">Quần áo</span>
						</div>
					</div>
					<img className="watermark" src={logo} alt="small logo" />
				</div>
				<div className="carousel-section carousel-section--cosmetics">
					<div className="test">
						<div className="test-content">
							<span className="test--1">Mỹ phẩm</span>
						</div>
					</div>
					<img className="watermark" src={logo} alt="small logo" />
				</div>
				<div className="carousel-section carousel-section--gears">
					<div className="test">
						<div className="test-content">
							<span className="test--1">Phụ kiện</span>
							<span className="test--1">máy tính</span>
						</div>
					</div>
					<img className="watermark" src={logo} alt="small logo" />
				</div>
				<div className="carousel-section carousel-section--cameras">
					<div className="test">
						<div className="test-content">
							<span className="test--1">Thiết bị</span>
							<span className="test--1">điện tử</span>
						</div>
					</div>
					<img className="watermark" src={logo} alt="small logo" />
				</div>
				<div className="carousel-section carousel-section--others">
					<div className="test test--unclipped">
						<span className="test--1 test--1--logo">
							<img src={logo} alt="logo" width={480} />
						</span>
					</div>
				</div>
			</Carousel>

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
	)
}

export default Home

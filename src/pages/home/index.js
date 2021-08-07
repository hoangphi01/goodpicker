import './style.scss'

import React, { Suspense } from 'react'
import axios from 'axios'
import { Skeleton } from 'antd'
import CustomCarousel from './carousel'
import SiteLayout from '../../components/layouts/site-layout'
// import APIservice from '../../service/APIservice'
const Category = React.lazy(() => import('./category'))

const HomePage = () => {
	const [categories, setCategoties] = React.useState([])

	React.useLayoutEffect(() => {
		const getCategories = async () => {
			const res = await axios.get('/api/categories')

			setCategoties(res.data)
		}

		getCategories()
	}, [])

	// const [email, setEmail] = useState('')
	// useEffect(() => {
	// 	const config = {
	// 		headers: {
	// 			Authorization: 'Bearer' + localStorage.getItem('token')
	// 		}
	// 	}
	// 	APIservice.homeUser({ email, config }).then(res => {
	// 		localStorage.setItem('token', res.data.token)
	// 	})
	// })

	const renderSkeleton = () => {
		return (
			<div className="newest-category-skeleton">
				<Skeleton.Input active className="newest-category-skeleton__title" />
				<Skeleton.Input active className="newest-category-skeleton__divider" />
				<Skeleton.Input active className="newest-category-skeleton__content" />
			</div>
		)
	}

	return (
		<SiteLayout>
			<div className="homepage">
				<CustomCarousel />

				<div className="newest">
					{categories.map(category => (
						<Suspense
							key={category.goodsCategoryName}
							fallback={renderSkeleton()}
						>
							<Category
								categoryId={category.goodsCategoryID}
								categoryName={category.goodsCategoryName}
							/>
						</Suspense>
					))}
				</div>
			</div>
		</SiteLayout>
	)
}

export default HomePage

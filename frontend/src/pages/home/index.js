import './style.scss'

import React, { Suspense } from 'react'
import axios from 'axios'
import { Skeleton } from 'antd'
import CustomCarousel from './carousel'
import SiteLayout from '../../components/layouts/site-layout'
import CustomSearchInput from '../../components/elements/input-search'
const Category = React.lazy(() => import('./category'))

const HomePage = () => {
	const [categories, setCategories] = React.useState([])

	React.useLayoutEffect(() => {
		const getCategories = async () => {
			const res = await axios.get('/api/categories')

			setCategories(res.data)
		}

		getCategories()
	}, [])

	const renderSkeleton = () => {
		return (
			<div className="homepage-newest-category-skeleton">
				<Skeleton.Input
					active
					className="homepage-newest-category-skeleton__title"
				/>
				<Skeleton.Input
					active
					className="homepage-newest-category-skeleton__divider"
				/>
				<Skeleton.Input
					active
					className="homepage-newest-category-skeleton__content"
				/>
			</div>
		)
	}

	return (
		<SiteLayout>
			<div className="homepage">
				<CustomCarousel />

				<div className="homepage-search">
					<CustomSearchInput />
				</div>

				<div className="homepage-newest">
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

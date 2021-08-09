
import { Row, Col, Image, Skeleton } from "antd"
import TimeAgo from "javascript-time-ago"
import axios from "axios"
import React, {Suspense} from "react"
import CustomCarousel from "../../home/carousel"
const Category = React.lazy(() => import('../../home/category'))
// import TimeAgo from "javascript-time-ago"
// import vi from 'javascript-time-ago/locale/vi'


// TimeAgo.addDefaultLocale(vi)

// const timeAgo = new TimeAgo('vi-vn')
const ContentSide = ({userId, userName}) => {

    // const []

    const [categories, setCategoties] = React.useState([])

	React.useLayoutEffect(() => {
		const getCategories = async () => {
			const res = await axios.get('/api/categories')

			setCategoties(res.data)
		}

		getCategories()
	}, [])

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
        <React.Fragment>
            <Col className="data-component">
                <Col className="profile-card">

                <div className="homepage-newest">
					{categories
						? categories.map(category => (
								<Suspense
									key={category.goodsCategoryName}
									fallback={renderSkeleton()}
								>
									<Category
										categoryId={category.goodsCategoryID}
										categoryName={category.goodsCategoryName}
									/>
								</Suspense>
						  ))
						: renderSkeleton()}
				</div>
                    <h1>content</h1>
                </Col>
            </Col>
        </React.Fragment>
    )
}

export default ContentSide
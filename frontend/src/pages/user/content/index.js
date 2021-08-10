import './style.scss'
import { Row, Col, Image, Skeleton } from "antd"
import TimeAgo from "javascript-time-ago"
import axios from "axios"
import React, {Suspense} from "react"
import { useAuthState } from "../../../hooks/useAuth"
// import ListCategory from "./category"


const ListCategory = React.lazy(()=> import('./category'))

// import TimeAgo from "javascript-time-ago"
// import vi from 'javascript-time-ago/locale/vi'


// TimeAgo.addDefaultLocale(vi)

// const timeAgo = new TimeAgo('vi-vn')
const ContentSide = () => {

    // const []
    const {user, cookies} = useAuthState()
    const [categories, setCategories] = React.useState(null)
	const unmountedRef = React.useRef(false)

	React.useLayoutEffect(() => {
		const getCategories = async () => {
			const res = await axios.get('/api/categories')

			if (!unmountedRef.current) {
				setCategories(res.data)
			}
		}

		getCategories()
	}, [])

	React.useEffect(() => {
		return () => {
			unmountedRef.current = true
		}
	}, [])
    

	// const renderSkeleton = () => {
	// 	return (
	// 		<div className="newest-category-skeleton">
	// 			<Skeleton.Input active className="newest-category-skeleton__title" />
	// 			<Skeleton.Input active className="newest-category-skeleton__divider" />
	// 			<Skeleton.Input active className="newest-category-skeleton__content" />
	// 		</div>
	// 	)
	// }

    return (
        <React.Fragment>
            <Col className = "user-category">
				<Row className="user-category-title">
					<h2><b>Sản phẩm đã đăng</b></h2>
				</Row>
				<Row className="user-category-content">
					{categories ?
						categories.map(category => (
							<Suspense
								key = {category.goodsCategoryName}
								fallback = {null}
								>
									<ListCategory
										categoryId={category.goodsCategoryID}
										categoryName={category.goodsCategoryName}
										/>
							</Suspense>
						))
					: null }
				</Row>
			</Col>
        </React.Fragment>
    )
}

export default ContentSide
import { Row, Col, Layout, Skeleton } from "antd"
import React, { Suspense } from 'react'
import SiteLayout from "../../components/layouts/site-layout"
import AvatarSide from "./avatar"
import ContentSide from "./content"
import Custom404 from "../404"
import { useAuthState } from "../../hooks/useAuth"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import CustomCarousel from "../home/carousel"

const Category = React.lazy(() => import('../home/category'))


const {Sider, Content} = Layout;

const UserPage = () => {
    const { user, cookies} = useAuthState()
    
    const history = useHistory()

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
        <SiteLayout>
            <div className="application-main">
                {cookies['gp_token']? (
                    
                        <Col className="container">
                            <div className="body-header">

                            </div>

                            <div className="body-content">
                                <Row className="main-content" >
                                    <div className="avatar-side">
                                        <AvatarSide/>
                                    </div>

                                    <div className="content-side">
                                        <ContentSide/>
                                    </div>
                                </Row>
                            </div>

                        </Col>
                    ):(
                        <Custom404/>
                    )
                }
                
            </div>
        </SiteLayout>
    )
}

export default UserPage



import './style.scss'
import { Row, Col, Image, Skeleton, List } from "antd"
import TimeAgo from "javascript-time-ago"
import axios from "axios"
import React, {Suspense} from "react"
import { useAuthState } from "../../../hooks/useAuth"
// import ListCategory from "./category"


// const ListCategory = React.lazy(()=> import('./category'))

const ContentSide = ({goodsID, goodsName}) => {

    const {user, cookies} = useAuthState()
    // const [categories, setCategories] = React.useState(null)
	// const unmountedRef = React.useRef(false)

	// React.useLayoutEffect(() => {
	// 	const getCategories = async () => {
	// 		const res = await axios.get('/api/categories')

	// 		if (!unmountedRef.current) {
	// 			setCategories(res.data)
	// 		}
	// 	}

	// 	getCategories()
	// }, [])

	// React.useEffect(() => {
	// 	return () => {
	// 		unmountedRef.current = true
	// 	}
	// }, [])


	// const [user, cookies] = useAuthState()
    // const timeAgo = new TimeAgo('vi-vn')
    const unmountedRef = React.useRef(false)
    const [goods, setGoods] = React.useState([])
    const [count,setCount] = React.useState(0)
	const [categories, setCategories] = React.useState(null)

    React.useEffect(()=> {
        return () => {
            unmountedRef.current = true
        }
    })

    React.useEffect(()=> {
        const getGoods = async () => {
            const res = await axios.get (
                `/api/goods?goodsCreateId=${user.id}&ordering=-goodsUpdatedTime`
            )
            .then(res => {
                setCount(res.data.length)
				setGoods(res.data.results)
            	}
            )
            // if (!unmountedRef.current) {
			// 	setGoods(res.data.results)
			// }
        }

        getGoods()
    },[goodsID])

    // const renderListCategory = ({item,i}) => {
        const listData = [];
        for(let i; i < count; i++) {
			if(goods.goodsID === i) {
            listData.push({
                title: goods.goodsName,
                description: goods.goodsPrice,
                content: goods.goodsDescription,

            })
        }}

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
								<List
									itemLayout="vertical"
									size="large"
									dataSource={listData}
									pagination={{
										onChange: page => {},
										pageSize:5,
									}}
									renderItem={item => {
										<List.Item
											key={item.goodsID}
											extra={
												<img
													src={item.images.find(image => image.isMain === true).image}
													alt={item.goodsName}
												/>
											}
										>
										<Skeleton active>
											<List.Item.Meta
											// avatar={<Avatar src={item.avatar} />}
											title={<a href={item.href}>{item.title}</a>}
											description={item.description}
											/>
											{item.content}
										</Skeleton>

										</List.Item>
									}}
									>

								</List>	
							</Suspense>
						))
					: null }
				</Row>
			</Col>
        </React.Fragment>
    )
}

export default ContentSide
import React from 'react';
import ReactDOM from 'react-dom';
import { Skeleton, Switch, List, Avatar, Col, Row } from 'antd';
import './style.scss'
import { useAuthState } from '../../../../hooks/useAuth';
import TimeAgo from 'javascript-time-ago';
import axios from 'axios';
import { Content } from 'antd/lib/layout/layout';


// const listData = [];

const ListCategory = ({goodsID, goodsName}) => {
    const [user, cookies] = useAuthState()
    const timeAgo = new TimeAgo('vi-vn')
    const unmountedRef = React.useRef(false)
    const [goods, setGoods] = React.useState([])
    const [count,setCount] = React.useState(0)

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
            }
            )
            if (!unmountedRef.current) {
				setGoods(res.data.results)
			}
        }
        getGoods()
    },[goodsID])

    // const renderListCategory = ({item,i}) => {
    //     const listData = [];
    //     for(let i; i < count; i++) {
    //         listData.push({
    //             title: goods.goodsName,
    //             description: goods.goodsPrice
                

    //         })
    //     }

    // }
    return(
        <div className="user-page-category">
            <Col className="user-page-category-list">
                {goods.length !==0
                    ? goods.map((item,i)=> (
                        <Row key = {item.goodsUpdateTime}
                            className="user-category-item"
                        >
                            <Col>
                                <div>
                                    {item.goodsName}
                                </div>
                                <div>
                                    {timeAgo.format(
                                            Date.now() - (new Date() - new Date(item.goodsUpdatedTime))
									)}
                                </div>
                                <div>
                                    {item.goodsPrice.toLocaleString()}₫
                                </div>
                                <div>
                                    {item.goodsDescription}
                                </div>
                            </Col>
                            <Col>
                                <img
                                    src={item.images.find(image => image.isMain === true).image}
                                    alt={item.goodsName}
                                />
                            </Col>
                        </Row>
                    )) : null
                }
            </Col>
        </div>
    )
}

export default ListCategory
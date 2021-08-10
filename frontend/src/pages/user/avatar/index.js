import './style.scss'
import { Row, Col, Image, Button, Form } from "antd"
import TimeAgo from "javascript-time-ago"
import axios from "axios"
import React, {useState, useEffect} from "react"
import DEFAVT from '../../../img/default_avatar.jpg'
import { useAuthenticate, useAuthState } from "../../../hooks/useAuth"
import { Link } from "react-router-dom"

// import TimeAgo from "javascript-time-ago"
// import vi from 'javascript-time-ago/locale/vi'


// TimeAgo.addDefaultLocale(vi)

// const timeAgo = new TimeAgo('vi-vn')
const AvatarSide = ({userEmail, userImage}) => {

    const { user, cookies } = useAuthState()
    // const {userxx} = useAuthenticate()

    const [theUser, setUser] = useState([])

    let userImageAvata;

    if(user.userImage) {
        userImageAvata = user.userImage;
    }
    else userImageAvata = DEFAVT;

    // useEffect(()=> {
    //     const getUsers = async () => {
    //         const res = await axios.get(
    //             `/api/users?email=${userEmail}`
    //         )
    //         setUser(res.data.results)
    //     }

    //     getUsers()
    // },[userEmail])

    return (
        <React.Fragment>
            <Col className="user-avatar">
                <Row className="user-avatar-title">
                    <h2><b>Trang cá nhân</b></h2>
                </Row>
                <br/>
                <Row className="user-avatar-content" 
                    gutter={{ xs: 10, sm: 32, md: 64}}
                    >
                    <Col className="user-avatar-content-img" >
                        <Image id = "avatar" 
                            className="img-fluid" 
                            src = {userImageAvata}
                        />
                    </Col>
                    <Col className="user-avatar-content-info">
                        <h3><b>{user.username}</b></h3>
                        <br/>
                        <Row>
                            <h5><b>Thông tin liên hệ: </b>{user.userPhoneNumber}</h5>
                        </Row>
                        <br/>
                        <Row >
                            <h5><b>Email: </b>{user.email}</h5>
                        </Row>
                        <br/>
                        <Row>
                            <h5><b>Xếp hạng: </b>5/5</h5>
                        </Row>
                    </Col>
                </Row>
                
                <Link to="/profile">
                    <Button className="user-avatar-button">
                        Chỉnh sửa trang cá nhân
                    </Button>
                </Link>
            </Col>
        </React.Fragment>
    )
}

export default AvatarSide
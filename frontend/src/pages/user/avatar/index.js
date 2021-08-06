import { Row, Col, Image } from "antd"
import TimeAgo from "javascript-time-ago"
import axios from "axios"
import React, {useState, useEffect} from "react"
import DEFAVT from '../../../img/default_avatar.jpg'
// import TimeAgo from "javascript-time-ago"
// import vi from 'javascript-time-ago/locale/vi'


// TimeAgo.addDefaultLocale(vi)

// const timeAgo = new TimeAgo('vi-vn')
const AvatarSide = ({userEmail, userImage}) => {

    const [user, setUser] = useState([])

    useEffect(()=> {
        const getUsers = async () => {
            const res = await axios.get(
                `/api/users?email=${userEmail}`
            )
            setUser(res.data.results)
        }

        getUsers()
    },[userEmail])

    return (
        <React.Fragment>
            <Col className="data-component">
                <Col className="profile-card">
                    <Image src={DEFAVT}
                        width={200}
                    />
                </Col>
            </Col>
        </React.Fragment>
    )
}

export default AvatarSide
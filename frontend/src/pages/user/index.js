import { Row, Col, Layout } from "antd"
import SiteLayout from "../../components/layouts/site-layout"
import AvatarSide from "./avatar"
import ContentSide from "./content"
import Custom404 from "../404"
import { useAuthState } from "../../hooks/useAuth"
import { Link, useHistory } from "react-router-dom"

const {Sider, Content} = Layout;

const UserPage = () => {
    const { user, cookies} = useAuthState()
    
    const history = useHistory()

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



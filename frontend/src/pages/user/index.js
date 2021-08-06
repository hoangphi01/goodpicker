
import { Row, Col } from "antd"
import SiteLayout from "../../components/layouts/site-layout"
import AvatarSide from "./avatar"
import ContentSide from "./content"

const UserPage = props => {
    return (
        <SiteLayout>
            <div className="application-main">
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
            </div>
        </SiteLayout>
    )
}

export default UserPage
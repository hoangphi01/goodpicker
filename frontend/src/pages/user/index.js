import React, { useEffect } from 'react';
import UserProfileTemplate from '../../components/templates/user/profile';
import { connect } from "react-redux";

const UserProfilePage = (props) => {
    

    return (
        <React.Fragment>
            <UserProfileTemplate />
        </React.Fragment>
    );
};

export default (connect(null, {})(UserProfilePage));

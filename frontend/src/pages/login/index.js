import React, { useEffect } from 'react';
import LoginTemplate from '../../components/templates/login';
import { connect } from "react-redux";

const LoginPage = (props) => {
    

    return (
        <React.Fragment>
            <LoginTemplate />
        </React.Fragment>
    );
};

export default (connect(null, {})(LoginPage));

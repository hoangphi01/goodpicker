import React, { useEffect } from 'react';
import ForgotPasswordTemplate from '../../components/templates/forgot-password';
import { connect } from "react-redux";

const ForgotPasswordPage = (props) => {
    

    return (
        <React.Fragment>
            <ForgotPasswordTemplate />
        </React.Fragment>
    );
};

export default (connect(null, {})(ForgotPasswordPage));

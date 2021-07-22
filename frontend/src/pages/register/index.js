import React, { useEffect } from 'react';
import RegisterTemplate from '../../components/templates/register';
import { connect } from "react-redux";

const RegisterPage = (props) => {
    

    return (
        <React.Fragment>
            <RegisterTemplate />
        </React.Fragment>
    );
};

export default (connect(null, {})(RegisterPage));

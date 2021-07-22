import React, { useEffect } from 'react';
import HomeTemplate from '../../components/templates/home';
import { connect } from "react-redux";

const HomePage = (props) => {
    

    return (
        <React.Fragment>
            <HomeTemplate />
        </React.Fragment>
    );
};

export default (connect(null, {})(HomePage));

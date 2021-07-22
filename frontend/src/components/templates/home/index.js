import React from "react";
import PropTypes from "prop-types";

const HomeTemplate = (props) => {
    return (
        <React.Fragment>
            <h1>HomePage</h1>
        </React.Fragment>
    );
};

HomeTemplate.propTypes = {
    t: PropTypes.func.isRequired,
}

export default (HomeTemplate);

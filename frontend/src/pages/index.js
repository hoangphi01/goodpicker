import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import HomeTemplate from '../components/templates/home';
import SiteLayout from '../components/layouts/site-layout';
import { withTranslation } from '../translate/init';
import { useRouter } from 'next/router'

const HomePage = ({ t }) => {

    const router = useRouter()

    useEffect(() => {
        document.title = 'Home';

        router.push('/employees')
    }, [])

    return (
        <React.Fragment>
            <HomeTemplate/>
        </React.Fragment>
    );
};

HomePage.getLayout = page => {
    return <SiteLayout>{ page }</SiteLayout>;
}

HomePage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

HomePage.propTypes = {
    t: PropTypes.func.isRequired,
}

export default connect()(withTranslation('common')(HomePage));

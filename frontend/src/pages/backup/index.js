import React, { useEffect } from 'react';
import { withTranslation } from '../../translate/init';
import BackupTemplate from '../../components/templates/backup';
import SiteLayout from '../../components/layouts/site-layout';
import PropTypes from "prop-types";
import AuthGuard from '../../guards/auth'

const BackupPage = (props) => {
    const { t } = props;

    useEffect(() => {
        document.title = t('backupPage.title');
    }, [])

    return (
        <React.Fragment>
            <AuthGuard>
                <BackupTemplate />
            </AuthGuard>
        </React.Fragment>
    );
};

BackupPage.getLayout = page => {
    return <SiteLayout>{ page }</SiteLayout>;
}

BackupPage.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BackupPage);

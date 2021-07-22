import React, { useEffect } from 'react';
import { withTranslation } from '../../translate/init';
import BackupDetailTemplate from '../../components/templates/backup/detail';
import SiteLayout from '../../components/layouts/site-layout';
import PropTypes from "prop-types";
import AuthGuard from '../../guards/auth'

const BackupDetail = (props) => {
    const { t } = props;

    useEffect(() => {
        document.title = t('backupPage.title');
    }, [])

    return (
        <React.Fragment>
            <AuthGuard>
                <BackupDetailTemplate />
            </AuthGuard>
        </React.Fragment>
    );
};

BackupDetail.getLayout = page => {
    return <SiteLayout>{ page }</SiteLayout>;
}

BackupDetail.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BackupDetail);

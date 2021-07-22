import React, { useEffect } from 'react';
import { withTranslation } from '../../translate/init';
import ResetPasswordTemplate from '../../components/templates/forgot-password/reset-password';
import { useRouter } from 'next/router'

const ResetPasswordPage = (props) => {
    // const { t } = props;

    // const router = useRouter();
    // const { code, email } = router.query;

    // useEffect(() => {
    //     document.title = t('resetPassword')
    // }, [])

    return (
        <React.Fragment>
            <ResetPasswordTemplate 
                code={ code }
                email={ email }
            />
        </React.Fragment>
    );
};

export default (ResetPasswordPage);

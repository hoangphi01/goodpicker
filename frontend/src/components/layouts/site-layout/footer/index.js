import './style.scss';

import React from 'react';
import { Row, Col, Typography } from 'antd';
import { withTranslation, Link } from '../../../../translate/init';

import { Footer as AntdFooter } from 'antd/lib/layout/layout'

const Footer = (props) => {
    const { t } = props;

    return (
        <React.Fragment>
            <AntdFooter className='text-align-center'>
                { t('footer') }
            </AntdFooter>
        </React.Fragment>
    );
}

export default withTranslation('common')(Footer);

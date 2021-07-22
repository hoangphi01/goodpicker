import './style.scss'

import React from 'react';
import { withTranslation, Link } from '../../../../translate/init';

import { Content as AntdContent } from 'antd/lib/layout/layout'

const Content = (props) => {
    const { t } = props;

    return (
        <React.Fragment>
            <AntdContent className='content-container'>
                { props.children }
            </AntdContent>
        </React.Fragment>
    );
}

export default withTranslation('common')(Content);

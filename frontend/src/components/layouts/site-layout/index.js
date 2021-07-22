import './style.scss'

import React, { Fragment } from 'react';
import AppFooter from './footer';
import AppHeader from './header';
import AppSidebar from './sidebar';
import AppContent from './content'
import { Layout } from 'antd';

const SiteLayout = ( props ) => {
    return (
        <Fragment>
            <Layout className='app-container'>
                <AppSidebar />
                <Layout className='layout'>
                    <AppHeader />
                
                    <AppContent>
                        { props.children }
                    </AppContent>
                    {/* <AppFooter /> */}
                </Layout>
            </Layout>
        </Fragment>
    )
};

export default SiteLayout;

export const getLayout = page => <SiteLayout>{ page }</SiteLayout>

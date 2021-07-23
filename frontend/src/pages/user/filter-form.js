import './style.scss'

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import { withTranslation } from '../../../translate/init';
import {
    Button, 
    Card,
    Input, 
    Form,
    Row, 
    Col,
    Select
} from 'antd'

import { SearchOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { USER_STATUS, USER_ROLE } from '../../../constants/index'
import { isUserType } from '../../../utils/auth';

const FilterForm = (props) => {

    const { t, setModalVisible, setFilterArgs } = props;

    const [form] = Form.useForm();

    const initialValues = {
        filterByName: '',
        filterByEmail: '',
        filterByRole: 'all',
        filterByStatus: 'all'
    }

    const getOptions = ( optionValues ) => {
        let options = Object.values(optionValues).map(m => ({
            label: t(`userManagementPage.${ m }`),
            value: m
        }))

        options.push({
            label: t('userManagementPage.all'),
            value: 'all'
        })

        return options;
    }

    const onFinish = (values) => {

        setFilterArgs(values);
    };

    const renderContentByRole = () => {
        if (isUserType(USER_ROLE.superAdmin)) {
            return (
                <Button 
                    type="primary"
                    onClick={ () => setModalVisible(true) }>
                    { t('userManagementPage.newUser') }
                </Button>
            )
        }

        return <></>
    }

    return (
        <React.Fragment>
            <Card
                title={ t('filter') }
                extra={ renderContentByRole() }
                className='filter-form-container'>

                <Form 
                    form={ form } 
                    name="horizontal_filter" 
                    initialValues={ initialValues }
                    onFinish={ onFinish }>

                    <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                        <Col 
                            lg={{ span: 6 }}
                            xs={{ span: 24 }}
                            sm={{ span: 12 }} >
                            <Form.Item
                                label={ t('userManagementPage.byName') }
                                labelCol={{ span: 24 }}
                                name="filterByName" >
                                <Input 
                                    prefix={ <UserOutlined className="site-form-item-icon" /> } 
                                    placeholder={ t('userManagementPage.searchByName') } 
                                />
                            </Form.Item>
                        </Col>
    
                        <Col 
                            lg={{ span: 6 }}
                            xs={{ span: 24 }}
                            sm={{ span: 12 }} >
                            <Form.Item
                                label={ t('userManagementPage.byEmail') }
                                labelCol={{ span: 24 }}
                                name="filterByEmail">
                                <Input
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    placeholder={ t('userManagementPage.searchByEmail') } 
                                />
                            </Form.Item>
                        </Col>

                        <Col
                            lg={{ span: 6 }}
                            xs={{ span: 24 }}
                            sm={{ span: 12 }} >
                            <Form.Item
                                label={ t('userManagementPage.byRole') }
                                labelCol={{ span: 24 }}
                                name="filterByRole" >
                                <Select options={ getOptions(USER_ROLE) } />
                            </Form.Item>
                        </Col>

                        <Col 
                            lg={{ span: 6 }}
                            xs={{ span: 24 }}
                            sm={{ span: 12 }} >
                            <Form.Item
                                label={ t('userManagementPage.byStatus') }
                                labelCol={{ span: 24 }}
                                name="filterByStatus" >
                                <Select options={ getOptions(USER_STATUS) } />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify='end'>
                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit" >
                                { t('search') }
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Card>
        </React.Fragment>
    );
}

FilterForm.propTypes = {
    t: PropTypes.func.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    setFilterArgs: PropTypes.func.isRequired
}

export default withTranslation('common')(FilterForm);
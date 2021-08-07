import './style.scss'

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from '../../../translate/init';
import { USER_STATUS, USER_ROLE, STATUS_CODE, RESULT_MESSAGE } from '../../../constants/index'

import {
    Modal,
    Form,
    Input,
    Button,
    Select,
    message
} from 'antd'

import { RightOutlined } from '@ant-design/icons';
import UserManagementApi from '../../../api/user-management/index';
import { isUserType } from '../../../utils/auth';

const CreateModal = (props) => {

    const { t, modalVisible, setModalVisible, getUsers, paginationArgs } = props;
    const [ form ] = Form.useForm();

    const initialValues = {
        username: '',
        email: '',
        phone: '',
        password: '',
        first_name: '',
        last_name: '',
        roles: [ USER_ROLE.admin ],
        status: USER_STATUS.inactive
    }

    const getOptions = ( optionValues ) => {

        let options = Object.values(optionValues).map(m => ({
            label: t(`userManagementPage.${ m }`),
            value: m
        }))

        return options;
    }

    useEffect(() => {

    },[])

    const onFinish = async (values) => {        
        let result = await UserManagementApi.create(values);

        if (result && result.code == STATUS_CODE.success) {

            getUsers({ ...paginationArgs });

            form.resetFields();

            message.success(t('success.create '));
        } else {
            if (result && result.message == RESULT_MESSAGE.errors.notPermission) {
                message.error(t('errors.notPermission'));
            } else if (result && result.message == RESULT_MESSAGE.errors.accountAlreadyExists) {
                message.error(t('errors.accountAlreadyExists'));
            } else {
                message.error(t('errors.createFailure'));
            }
        }

        setModalVisible(false);
    };

    return (
        <React.Fragment>    
            <Modal
                title={ t('userManagementPage.create') }
                centered
                visible={ modalVisible }
                onCancel={ () => setModalVisible(false) }
                footer={ null }>
                <Form
                    form={ form }
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    name='basic'
                    initialValues={ initialValues }
                    onFinish={ onFinish }>
                    <Form.Item
                        label={ t('userManagementPage.name') }
                        name='username'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>
                        <Input />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.password') }
                        name='password'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.password') }`
                        }]}>

                        <Input.Password />
                        
                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.email') }
                        name='email'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.email') }` 
                        }]}>

                        <Input />
    
                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.phone') }
                        name='phone'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.phone') }` 
                        }]}>

                        <Input />
    
                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.firstName') }
                        name='first_name'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.firstName') }`
                        }]}>

                        <Input />
                        
                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.lastName') }
                        name='last_name'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.lastName') }`
                        }]}>

                        <Input />
                        
                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.role') }
                        name='roles' >
                        <Select 
                            disabled
                            options={ getOptions(USER_ROLE) } 
                            mode='multiple'
                        />
                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.status') }
                        name='status' >
                        <Select options={ getOptions(USER_STATUS) } />
                    </Form.Item>

                    <Form.Item 
                        wrapperCol={{ 
                            offset: 8, 
                            span: 16 
                        }}>
                            
                        <Button 
                            type='primary' 
                            htmlType='submit'>
                            { t('submit') }
                        </Button>

                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    );
};

CreateModal.propTypes = {
    t: PropTypes.func.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    paginationArgs: PropTypes.object.isRequired
}

export default withTranslation('common')(CreateModal);

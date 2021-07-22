import './style.scss'

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from '../../../translate/init';

import {
    Button,
    Layout,
    message,
    Card,
    Avatar,
    Form,
    Input,
    Select,
    Divider
} from 'antd'
import { Header } from 'antd/lib/layout/layout'

import { RightOutlined } from '@ant-design/icons';
import UserManagementApi from '../../../api/user-management'
import Link from 'next/link'

import { USER_STATUS, USER_ROLE, STATUS_CODE, RESULT_MESSAGE } from '../../../constants'
import { isUserType } from '../../../utils/auth'
import { getUserProfile } from '../../../utils/auth'
import { useRouter } from 'next/router'
import { getUrlFromBase64 } from '../../../utils/common';

const UserProfileTemplate = (props) => {

    const { t } = props;

    const Route = useRouter();

    const [ form ] = Form.useForm();

    const currentLoggedUser = getUserProfile();

    const initialValues = {
        name: '',
        coefficients_salary: 0,
        allowance_coefficient: 0,
        academic_rank: '',
        is_party_member: false,
        religion: '',
        ethnic: '',
        birthday: new Date(),
        gender: null,
        job_title: ''
    }

    const [ editingUser, setEditingUser ] = useState({}); 

    const getOptions = (optionValues) => {

        let options = Object.values(optionValues).map(m => ({
            label: t(`userManagementPage.${ m }`),
            value: m
        }))

        return options;
    }

    useEffect(async () => {
        await getUserById(props.id);
    }, [props.id])

    const getUserById = async (id) => {

        let result = await UserManagementApi.fetchById(id);
        if (result.result) {

            setEditingUser(result.result.records[0])

            let user = result.result.records[0]

            // replace multi values of json object
            let values = Object.values(user).map(m => (m ? m : 'chưa có thông tin'))

            let names = Object.keys(user)

            let userFormat = Object.assign(...names.map((k, i) => ({[k]: values[i]})))

            form.setFieldsValue(userFormat);
            
        }
    }

    const onFinish = async (values) => { 

        var data = {
            email: values.email,
            phone: values.phone,
            first_name: values.firstName,
            last_name: values.lastName,
            status: values.status,
            new_password: values.newPassword,
            old_password: values.oldPassword,
            retype_password: values.retypePassword
        }

        var form_data = new FormData()
        
        for (var key in data) {
            form_data.append(key, data[key])
        }
        console.log(form_data);

        let result = await UserManagementApi.update({ 
            id: props.id,
            data: form_data
        });

        if (result && result.code == STATUS_CODE.success) {

            getUserById(props.id);

            message.success(t('success.update'));
        } else {
            if (result && result.message == RESULT_MESSAGE.errors.userDoesNotExist) {
                message.error(t('errors.userDoesNotExist'));
            } else if (result && result.message == RESULT_MESSAGE.errors.emailAlreadyExists) {
                message.error(t('errors.emailAlreadyExists'))
            } else if (result && result.message == RESULT_MESSAGE.errors.passwordIncorrect) {
                message.error(t('errors.passwordIncorrect'))
            } else if (result && result.message == RESULT_MESSAGE.errors.passwordDontMatch) {
                message.error(t('errors.passwordDontMatch'))
            } else {
                message.error(t('errors.updateFailure'));
            }
        }
    };

    const onDelete = async (id) => {
        let result = await UserManagementApi.delete(
            parseInt(id), 
            {
                model: "hr.employee"
            })

        Route.push("/employees")
    }

    const checkPermissions = (fieldType) => {

        switch (fieldType) {
            case 'input':
                if (editingUser.user_id && currentLoggedUser?.uid == editingUser.user_id) {
                    return true
                }

            case 'delete':
                if (!currentLoggedUser?.is_admin) {
                    return false
                }

                if (editingUser.user_id && currentLoggedUser?.uid == editingUser.user_id[0]) {
                    return false
                }

            // case 'status':
            //     if (
            //         isUserType(USER_ROLE.superAdmin) 
            //         && !editingUser.roles?.includes(USER_ROLE.superAdmin)
            //     ) return true
                
            //     else if (isUserType(USER_ROLE.admin)) {
            //         if (
            //             !editingUser.roles?.includes(USER_ROLE.superAdmin) 
            //             && !editingUser.roles?.includes(USER_ROLE.admin)
            //         ) return true
            //     }

            //     break;
        }

        return true
    }

    return (
        <React.Fragment>
            <Layout className='header-container'>
                <Header className='page-header'>
                    <h2 className='page-title'> 
                        <Link href='/employees'>
                            <a className='link' >{ t('userManagementPage.users') }</a>
                        </Link>

                        <RightOutlined className='arrow' />

                        { editingUser?.name } 
                    </h2>

                    {/* <Button
                        type='primary' 
                        htmlType='submit'
                        onClick={() => form.submit()}>
                        { t('save') }
                    </Button> */}
                </Header>
            </Layout>

            <Card
                className='card-container'
                cover={
                    <img
                        alt='example'
                        src='/images/cover_photo.jpg'
                        className='cover'
                    />
                }>

                <Avatar 
                    className='avatar'
                    src={ editingUser.image_128 ? getUrlFromBase64(editingUser.image_128) : '/images/default-user-avatar.png' }
                />

                <Form
                    className='form'
                    form={ form }
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name='profile'
                    initialValues={ initialValues }
                    onFinish={ onFinish }>
                    <Form.Item
                        label={ t('userManagementPage.fullName') }
                        name='name'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.birthday') }
                        name='birthday'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.gender') }
                        name='gender'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.jobTitle') }
                        name='job_title'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.academicRank') }
                        name='academic_rank'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.isPartyMember') }
                        name='is_party_member'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.ethnic') }
                        name='ethnic'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.religion') }
                        name='religion'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.coefficientsSalary') }
                        name='coefficients_salary'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.allowanceCoefficient') }
                        name='allowance_coefficient'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    {
                        checkPermissions('delete')
                        ? <Button 
                            type="text" 
                            danger
                            onClick = { () => onDelete(props.id) }>
                            Delete
                        </Button>
                        : <></>
                    }

                    {/*<Form.Item
                        label={ t('userManagementPage.name') }
                        name='username'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.username') }`
                        }]}>

                        <Input disabled />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.email') }
                        name='email'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.email') }` ,
                        }]}>

                        <Input  />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.phone') }
                        name='phone'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.phone') }` ,
                        }]}>

                        <Input />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.firstName') }
                        name='firstName'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.firstName') }`
                        }]}>

                        <Input  />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.lastName') }
                        name='lastName'
                        rules={[{ 
                            required: true, 
                            message: `${ t('rulesField.lastName') }`
                        }]}>

                        <Input  />
                        
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
                        <Select 
                            options={ getOptions(USER_STATUS) } 
                        />
                    </Form.Item>

                    <Divider 
                        className='divider'
                        orientation='left'>
                        { t('userManagementPage.changePassword') }
                    </Divider>

                    <Form.Item
                        label={ t('userManagementPage.oldPassword') }
                        name='oldPassword'>

                        <Input 
                            type='password' 
                             
                        />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.newPassword') }
                        name='newPassword'>

                        <Input 
                            type='password' 
                             
                        />

                    </Form.Item>

                    <Form.Item
                        label={ t('userManagementPage.retypePassword') }
                        name='retypePassword'>

                        <Input 
                            type='password' 
                             
                        />

                    </Form.Item> */}
                </Form>
            </Card>
        </React.Fragment>
    );
};

UserProfileTemplate.propTypes = {
    t: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}

export default withTranslation('common')(UserProfileTemplate);

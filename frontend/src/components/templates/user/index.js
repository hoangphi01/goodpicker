import './style.scss'

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { withTranslation } from '../../../translate/init';
import {
    Table, 
    Tag, 
    Layout,
    Button
} from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { RightOutlined } from '@ant-design/icons';
import FilterForm from './filter-form';
import UserManagementApi from '../../../api/user-management/index'
import CreateModal from './create'
import { useRouter } from 'next/router'
import { STATUS_CODE } from '../../../constants';
import AuthGuard from '../../../guards/auth'
import Cookies from 'js-cookie';
import { getUrlFromBase64 } from '../../../utils/common'

const UserTemplate = (props) => {

    const { t } = props;

    const Route = useRouter();

    let [ users, setUsers ] = useState([]);
    let [ paginationArgs, setPaginationArgs ] = useState({
        page: 1,
        pageSize: 10,
        totalItems: 0
    });

    let [ filterArgs, setFilterArgs ] = useState({
        filterByName: '',
        filterByEmail: '',
        filterByRole: 'all',
        filterByStatus: 'all'
    })

    let [ modalVisible, setModalVisible ] = useState(false);

    useEffect(async () => {
        await getUsers(paginationArgs);
    }, [])

    useEffect(async () => {
        await getUsers({
            ...paginationArgs,
            ...filterArgs,
            page: 1,
            pageSize: 10,
        });
    }, [filterArgs])

    const getUsers = async (data) => {

        let result = await UserManagementApi.fetchAll({
            page: data.page,
            pageSize: data.pageSize,
            filterByEmail: data.filterByEmail,
            filterByName: data.filterByName,
            filterByRole: data.filterByRole,
            filterByStatus: data.filterByStatus
        })

        if (result?.code == STATUS_CODE.success) {
            setPaginationArgs({
                totalItems: result.data.totalItems,
                page: result.data.page, 
                pageSize: result.data.pageSize 
            })

            setUsers(result.data.listUsers);
        }
    }

    const testApi = async () => {
        //getAll
        let result = await UserManagementApi.fetchAll({
            query: [['id', '=', '2']],
            pageSize: 10,
            pageIndex: 1,
            model: 'hr.employee',   
            fields: ['name'],
        })

        //get by id
        // let result = await UserManagementApi.fetchById(38)

        //create
        // let result = await UserManagementApi.create({
        //     model: "hr.employee",
        //     object: {
        //         "name": "Nhi Do"
        //     }
        // })

        //update
        // let result = await UserManagementApi.update(39, {
        //     model: "hr.employee",
        //     object: {
        //         "name": "Do Nhi"
        //     }
        // })

        //delete
        // let result = await UserManagementApi.delete(39, {model: "hr.employee"})

        console.log(result);
    }

    const columns = [
        {
            title: t('userManagementPage.name'),
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: t('userManagementPage.email'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('userManagementPage.status'),
            dataIndex: 'status',
            key: 'status',
            render: status => {

                if (status == 'active') {
                    return (
                        <Tag color='green'>{ t('userManagementPage.active') }</Tag>
                    );
                } else if (status == 'inactive') {
                    return (
                        <Tag color='red'>{ t('userManagementPage.inactive') }</Tag>
                    );
                }
            }
        },
        {
            title: t('userManagementPage.role'),
            dataIndex: 'roles',
            key: 'roles',
            render: roles => t(`userManagementPage.${ roles?.toString() }`)
        },
        {
            title: '',
            key: 'arrow',
            render: record => 
                <a><RightOutlined /></a>
        }
    ];

    const onShowSizeChange = (current, pageSize) =>  {
        
        getUsers({
            ...paginationArgs,
            page: current,
            pageSize: pageSize
        })

        setPaginationArgs({
            ...paginationArgs,
            page: current,
            pageSize: pageSize
        })
    }

    const onPageChange = (page, pageSize) => {

        getUsers({
            ...paginationArgs,
            page: page,
            pageSize: pageSize
        })

        setPaginationArgs({
            ...paginationArgs,
            page: page,
            pageSize: pageSize
        })
    }

    return (
        <React.Fragment>
            <AuthGuard>
                <Layout className="header-container">
                    <Header className='page-header'>
                        <h2 className='page-title'>{ t('userManagementPage.users') }</h2>
                    </Header>
                </Layout>
                <FilterForm
                    setModalVisible={ setModalVisible }
                    setFilterArgs={ setFilterArgs }
                />
                <Table
                    dataSource={ users }
                    columns={ columns }
                    pagination={{
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        defaultPageSize: paginationArgs.pageSize,
                        total: paginationArgs.totalItems,
                        current: paginationArgs.page,
                        showTotal: total => `${t('total')} ${total} ${t('userManagementPage.user')}`,
                        onShowSizeChange: onShowSizeChange,
                        onChange: onPageChange
                    }}
                    onRow={(record, rowIndex) => ({
                        onClick: () => { Route.push(`/user/profile?id=${record.id}`) },
                    })}
                />
                <CreateModal
                    modalVisible={ modalVisible }
                    setModalVisible={ setModalVisible }
                    getUsers={ getUsers }
                    paginationArgs={ paginationArgs }
                />

                <Button 
                    onClick={ testApi }
                    type="primary">
                    Primary Button
                </Button>

            </AuthGuard>
        </React.Fragment>
    );
};

UserTemplate.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(UserTemplate);

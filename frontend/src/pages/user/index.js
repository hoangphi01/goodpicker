import './style.scss'

import React, { useEffect, useState } from 'react'
import { Table, Tag, Layout, Button } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { RightOutlined } from '@ant-design/icons'
import FilterForm from './filter-form'
import UserManagementApi from '../../../api/user-management/index'
import CreateModal from './create'
import { STATUS_CODE } from '../../../constants'
import AuthGuard from '../../../guards/auth'

const UserPage = props => {
	let [users, setUsers] = useState([])
	let [paginationArgs, setPaginationArgs] = useState({
		page: 1,
		pageSize: 10,
		totalItems: 0
	})

	let [filterArgs, setFilterArgs] = useState({
		filterByName: '',
		filterByEmail: '',
		filterByRole: 'all',
		filterByStatus: 'all'
	})

	let [modalVisible, setModalVisible] = useState(false)

	useEffect(async () => {
		await getUsers(paginationArgs)
	}, [])

	useEffect(async () => {
		await getUsers({
			...paginationArgs,
			...filterArgs,
			page: 1,
			pageSize: 10
		})
	}, [filterArgs])

	const getUsers = async data => {
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

			setUsers(result.data.listUsers)
		}
	}

	const testApi = async () => {
		//getAll
		let result = await UserManagementApi.fetchAll({
			query: [['id', '=', '2']],
			pageSize: 10,
			pageIndex: 1,
			model: 'hr.employee',
			fields: ['name']
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

		console.log(result)
	}

	const columns = [
		{
			title: 'userManagementPage.name',
			dataIndex: 'username',
			key: 'username'
		},
		{
			title: 'userManagementPage.email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'userManagementPage.status',
			dataIndex: 'status',
			key: 'status',
			render: status => {
				if (status == 'active') {
					return <Tag color="green">{'userManagementPage.active'}</Tag>
				} else if (status == 'inactive') {
					return <Tag color="red">{'userManagementPage.inactive'}</Tag>
				}
			}
		},
		{
			title: 'userManagementPage.role',
			dataIndex: 'roles',
			key: 'roles',
			render: roles => `userManagementPage.${roles?.toString()}`
		},
		{
			title: '',
			key: 'arrow',
			render: record => (
				<a>
					<RightOutlined />
				</a>
			)
		}
	]

	const onShowSizeChange = (current, pageSize) => {
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
					<Header className="page-header">
						<h2 className="page-title">{'userManagementPage.users'}</h2>
					</Header>
				</Layout>
				<FilterForm
					setModalVisible={setModalVisible}
					setFilterArgs={setFilterArgs}
				/>
				<Table
					dataSource={users}
					columns={columns}
					pagination={{
						defaultCurrent: 1,
						showSizeChanger: true,
						defaultPageSize: paginationArgs.pageSize,
						total: paginationArgs.totalItems,
						current: paginationArgs.page,
						showTotal: total =>
							`${'total'} ${total} ${'userManagementPage.user'}`,
						onShowSizeChange: onShowSizeChange,
						onChange: onPageChange
					}}
					onRow={(record, rowIndex) => ({
						onClick: () => {}
					})}
				/>
				<CreateModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					getUsers={getUsers}
					paginationArgs={paginationArgs}
				/>

				<Button onClick={testApi} type="primary">
					Primary Button
				</Button>
			</AuthGuard>
		</React.Fragment>
	)
}

export default UserPage

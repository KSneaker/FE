
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { getAllUsers } from "../../redux/actions/actionsUser";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
const User = () => {
    const user = useSelector((state: any) => state.auth.login?.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/sign-in')
        }
        if (user?.accessToken) {
            // console.log('>>', user.accessToken)
            getAllUsers(user.accessToken, dispatch)
        }
    }, [])
    const allUsers = useSelector((state: any) => state.users.users?.allUsers?.data)

    // console.log('allUsers', allUsers)
    const modifiedAllUser = allUsers?.map(({ body, ...item }: any) => ({
        ...item,
        key: item.id
    }))
    interface DataType {
        key: number,
        id: number,
        fullname: string,
        username: string,
        email: string,
        phone_number: string,
        address: any,
        created_at: any,
        updated_at: any,
        admin: number
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'Fullname',
            key: 'fullname',
            dataIndex: 'fullname'

        },
        {
            title: 'Username',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Phone Number',
            key: 'phoneNumber',
            dataIndex: 'phoneNumber'

        },
        {
            title: 'Address',
            key: 'address',
            dataIndex: 'address'
        },
        {
            title: 'Admin',
            key: 'admin',
            dataIndex: 'admin'
        },
    ];


    return (
        <Table columns={columns} dataSource={modifiedAllUser} />
    );
}

export default User;

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { getAllUsers } from "../../redux/actions/actionsUser";
import { useNavigate } from "react-router-dom";
import Table from "antd/es/table";
const User = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
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
    const allUsers = useSelector((state) => state.users.users?.allUsers?.data)

    // console.log('allUsers', allUsers)
    const modifiedAllUser = allUsers?.map(({ body, ...item }) => ({
        ...item,
        key: item.id
    }))

    const columns = [
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
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <div className="d-flex justify-content-between">
                <p>Bảng người dùng</p>

            </div>
            <Table columns={columns} dataSource={modifiedAllUser} bordered />
        </div>

    );
}

export default User;
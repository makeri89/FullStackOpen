import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const UserList = () => {

    const users = useSelector(state => state.users)

    console.log('users', users)

    return (
        <div>
            <h2>Users</h2>
            <table class='table table-striped table-bordered table-hover'>
                <thead class='thead-dark'>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <tr key={user.id}>
                            <th scope='row'><Link to={`/users/${user.id}`}>{user.name}</Link></th>
                            <td>{user.username}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserList
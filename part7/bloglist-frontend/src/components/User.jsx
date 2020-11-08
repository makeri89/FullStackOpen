import { Link } from "react-router-dom"

const User = ({ user }) => {

    if (!user) {
        return null
    }

    const userBlogs = user.blogs.map(blog => blog)

    return (
        <div>
            <h2>{user.name}</h2>
            <p>has added these blogs</p>
            <ul class='list-group list-group-flush'>
                {userBlogs.map(blog => <li class='list-group-item m-2 rounded-lg shadow bg-light' key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link>  </li>)}
            </ul>
        </div>
    )
}

export default User
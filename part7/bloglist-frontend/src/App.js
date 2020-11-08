import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import UserList from './components/UserList'
import BlogFullview from './components/BlogFullview'
import User from './components/User'

import loginService from './services/login'
import storage from './utils/storage'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs, likeABlog, removeABlog } from './reducers/blogReducer'
import { getUsers } from './reducers/userReducer'

import {
  Switch, Route, Link,
  useRouteMatch, useHistory
} from 'react-router-dom'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()
  console.log('ref from appjs', blogFormRef.current)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs())
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const blogs = useSelector(state => state.blogs)
  console.log('blogs', blogs)

  const users = useSelector(state => state.users)

  

  const notifyWith = (message, type='success') => {
    dispatch(setNotification(message, type, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    console.log('blog', blogToLike)
    dispatch(likeABlog(blogToLike))
  }

  let history = useHistory()

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeABlog(id))
      history.push('/')
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  const userMatch = useRouteMatch('/users/:id')
  const userById = userMatch
  ? users.find(user => user.id === userMatch.params.id)
  : null

  const blogMatch = useRouteMatch('/blogs/:id')
  console.log('blogmatch', blogMatch)
  const blogById = blogMatch
  ? blogs.find(blog => blog.id == blogMatch.params.id)
  : null

  if (!user) {
    return (
      <div class='container'>
        <h2 class='mt-3 p-2 text-center bg-info rounded-lg'>Login to application</h2>

        <Notification />

        <form onSubmit={handleLogin} class='form-group d-flex flex-wrap flex-column justify-content-center'>
          <div class='p-3 mx-auto'>
            {/* <label for='username'>Username:</label> */}
            <input
              class='form-control form-control-lg shadow-lg'
              id='username'
              value={username}
              placeholder='Username:'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div class='p-3 mx-auto'>
            {/* <label for='password'>Password:</label> */}
            <input
              class='form-control form-control-lg shadow-lg'
              id='password'
              value={password}
              placeholder='Password:'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div class='mx-auto'>
            <button id='login' class='btn btn-success'>Login</button>
          </div>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const style = {
    paddingRight: 5
  }

  const checkIfRemovable = () => {
    if (blogById === null || blogById === undefined) {
      return false
    }
    else if (blogById.user.username === user.username) {
      return true
    }
    else {
      return false
    }
  }

  return (
    <div class='container'>
      <div class='navbar sticky-top navbar-expand-lg navbar-light'>
        <Link class='navbar-brand' to='/'>Home</Link>
        <Link class='navbar-brand' to='/users'>Users</Link>
        <div class='navbar-brand'>
          {user.name} logged in <button class='btn btn-sm btn-outline-danger' onClick={handleLogout}>logout</button>
        </div>
      </div>

      <Notification />

      <Switch>
        <Route path='/users/:id'>
          <User user={userById} />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/blogs/:id'>
          <BlogFullview 
            blog={blogById}
            handleLike={handleLike}
            handleRemove={handleRemove}
            own={checkIfRemovable()} 
          />
        </Route>
        <Route path="/">
          <div>
            <h1>Blogs</h1>
            <Togglable buttonLabel='Add a new blog' ref={blogFormRef}>
              <NewBlog />
            </Togglable>
              <ul class='list-group list-group-flush'>
                {blogs.sort(byLikes).map(blog =>
                <li class='list-group-item list-group-item-action bg-transparent mt-3 rounded-lg shadow'>
                  <Blog
                    key={blog.id}
                    blog={blog}
                  />
                </li>
                )}
              </ul>
              
            
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App
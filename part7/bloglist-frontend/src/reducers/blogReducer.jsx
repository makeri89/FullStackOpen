import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BLOG':
            return [...state, action.data]
        case 'INIT_BLOGS':
            return action.data
        case 'LIKE':
            console.log('like data', action.data)
            const liked = action.data
            console.log('liked', liked)
            return state
                .map(blog => 
                    blog.id !== liked.id
                    ? blog : liked)
        case 'REMOVE':
            return state
                    .filter(blog =>
                        blog.id !== action.data)
        default:
            return state
    }
}

export const initialBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

export const likeABlog = (blogToLike) => {
    return async dispatch => {
        const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id}
        const likeDone = await blogService.update(likedBlog)
        dispatch({
            type: 'LIKE',
            data: likeDone
        })
    }
}

export const removeABlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        console.log('removed id', id)
        dispatch({
            type: 'REMOVE',
            data: id
        })
    }
}

export default blogReducer
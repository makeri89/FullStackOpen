const notificationReducer = (state = { message: '', timeout: null}, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            console.log('Notification set')
            return action.data.message
        case 'DELETE_MESSAGE':
            return { message: ''}
        default:
            return state
    }
}

export const setNotification = (message, seconds) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch(hideNotification())
        }, seconds * 1000)
        dispatch({ 
            type: 'SET_MESSAGE',
            data: { message }
        })
    }
}

export const hideNotification = () => {
    return {
        type: 'DELETE_MESSAGE'
    }
}

export default notificationReducer
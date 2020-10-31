const notificationReducer = (state = { message: '', timeout: null}, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            if (state.timeout !== null) {
                clearTimeout(state.timeout)
            }
            return { message: action.data.message, timeout: action.data.timeout }
        case 'DELETE_MESSAGE':
            return { message: '', timeout: null}
        default:
            return state
    }
}

export const setNotification = (message, seconds) => {
    return async dispatch => {
        const timeout = setTimeout(() => {
            dispatch(hideNotification())
        }, seconds * 1000)
        dispatch({ 
            type: 'SET_MESSAGE',
            data: { message, timeout}
        })
    }
}

export const hideNotification = () => {
    return {
        type: 'DELETE_MESSAGE'
    }
}

export default notificationReducer
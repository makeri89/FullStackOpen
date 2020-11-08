const initialState = { notification: '', timer: null}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            if (state.timer !== null) {
                clearTimeout(state.timer)
            }
            return  { notification: action.data.notification, type: action.data.type, timer: action.data.timer }
        case 'HIDE':
            return initialState
        default:
            return state
    }
}

export const setNotification = (notification, type, seconds) => {
    return async dispatch => {
        const timer = setTimeout(() => {
            dispatch(hideNotification())
        }, seconds * 1000)
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { notification, type, timer }
        })
    }
}

const hideNotification = () => {
    return {
        type: 'HIDE'
    }
}

export default notificationReducer
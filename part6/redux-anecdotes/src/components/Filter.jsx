import React from 'react'
import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'


const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const filteringBy = e.target.value
        dispatch(filter(filteringBy))
    }

    const style = {
        margin: '10px 0'
    }

    return (
        <div style={style}>
            filter <input name='filter' onChange={handleChange}/>
        </div>
    )
}

export default Filter
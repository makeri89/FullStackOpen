import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'


const Filter = (props) => {
    const handleChange = (e) => {
        const filteringBy = e.target.value
        props.filter(filteringBy)
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

const mapDispatchToProps = {
    filter
}
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
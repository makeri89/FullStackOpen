import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        props.createAnecdote(content)
    }

    return (
        <div>
            <h2>Add anecdotes:</h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote'/>
                <button type='submit'>add new</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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

export default AnecdoteForm
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} votes
                <button onClick={handleClick}>vote</button>
            </div>
        </li>
    )
}


const AnecdoteList = () => {
    const dispatch = useDispatch()
    
    const anecdotes = useSelector(state => {
        console.log('AnecdoteList', state.anecdotes)
        return state.anecdotes.filter(
            anecdote => anecdote.content.toLowerCase()
            .includes(state.filter.toLowerCase()))
    })

    const vote = (id) => {
        dispatch(addVote(id))
        const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(setNotification({ message: `You voted ${votedAnecdote.content}` }, 5))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => 
                            vote(anecdote.id)
                        }
                    />
                )}
            </ul>
        </div>
    )
}

export default AnecdoteList
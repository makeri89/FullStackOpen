import React from 'react'
import { connect } from 'react-redux'
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


const AnecdoteList = (props) => {

    const vote = (id) => {
        props.addVote(id)
        const votedAnecdote = props.anecdotesToShow.find(anecdote => anecdote.id === id)
        props.setNotification({ message: `You voted ${votedAnecdote.content}` }, 5)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {props.anecdotesToShow.map(anecdote =>
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

const mapStateToProps = (state) => {
    const { anecdotes, filter } = state
    const anecdotesToShow = anecdotes.filter(anecdote => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })

    return { anecdotesToShow }
    }

const mapDispatchToProps = {
    addVote,
    setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
import anecdoteService from '../services/anecdotes'

export const addVote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.getOne(id)
    const updatedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes += 1 }
    await anecdoteService.update(id, updatedAnecdote)

    dispatch({
      type: 'UPDATE',
      data: { anecdote: updatedAnecdote }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)
    case 'UPDATE':
      const updatedAnecdote = action.data.anecdote
      return state
        .map(anecdote => 
          anecdote.id !== 
          updatedAnecdote.id ? 
          anecdote : 
          updatedAnecdote
        )
        .sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)
    default: return state
  }
}

export default reducer
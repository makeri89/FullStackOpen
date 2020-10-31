import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async content => {
    console.log('creating', content)
    const newAnecdote = { content, votes: 0 }
    const res = await axios.post(baseUrl, newAnecdote)
    console.log('res', res.data)
    return res.data
}

const getOne = async id => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

const update = async (id, anecdote) => {
    const res = await axios.put(`${baseUrl}/${id}`, anecdote)
    return res.data
}

export default { getAll, create, getOne, update }
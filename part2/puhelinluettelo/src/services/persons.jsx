import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const remove = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
        axios.delete(`${baseUrl}/${person.id}`)
    }
}

export default {
    getAll: getAll,
    create: create,
    remove: remove
}
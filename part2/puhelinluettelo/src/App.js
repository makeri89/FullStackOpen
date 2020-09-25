import React, { useState, useEffect } from 'react'
import Names from './components/Names.jsx'
import personService from './services/persons'



const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [infoMessage, setInfoMessage] = useState('something was done')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleButtonClick = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      
    setInfoMessage(
      `Added ${newName}`
    )
    setTimeout(() => {
      setInfoMessage(null)
    }, 2000)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='info'>
        {message}
      </div>
    )
  }

  const handleDelete = (e) => {
    e.preventDefault()
    const id = parseInt(e.target.value)
    personService.remove(persons[id - 1])
    setPersons(persons.filter(person => person.id !== id))
    setInfoMessage(`Removed ${persons[id-1].name}`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 2000)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={infoMessage} />
      filter shown with<input type='text' onChange={handleSearchChange}></input>
      <h2>add a new</h2>
      <form onSubmit={handleButtonClick}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Names persons={persons} newSearch={newSearch} onDelete={handleDelete} />
      </div>
    </div>
  )

}

export default App
import React from 'react'
import Name from './Name'

const Names = ({ persons, newSearch, onDelete }) => {
  const filtered = persons.filter(person => person.name.toLowerCase()
  .includes(newSearch.toLowerCase()))
  
  return (
    <div>
      {filtered.map(name => 
      <span key={name.id}>
        <Name name={name} number={name} />
        <button
          type='button'
          value={name.id}
          onClick={onDelete}>
          delete
        </button>
      </span>)}
    </div>
  )
}


export default Names

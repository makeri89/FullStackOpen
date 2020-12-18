import React, { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  
  // const authors = useQuery(ALL_AUTHORS)

  // if (authors.loading) {
  //   return <div>loading...</div>
  // }

  // console.log(authors.data)

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }

  const authors = props.authors

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name,
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()

    const parsedBorn = Number(born)

    editAuthor({
      variables: { name, setBornTo: parsedBorn},
      refetchQueries: [
        { query: ALL_AUTHORS}
      ]
    })

    setName('')
    setBorn('')
  }
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={name}
          onChange={(value) => setName(value.value)}
          options={options}
          placeholder='Select from authors...'
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors

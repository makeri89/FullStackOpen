import { useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import Select from 'react-select'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  
  const books = useQuery(ALL_BOOKS)

  if (books.loading) {
    return <div>loading...</div>
  }

  // console.log('books from books', books)
  let genres = books.data.allBooks.map(book => book.genres)
  genres = [...new Set(genres.flat())]

  if (!props.show) {
    return null
  }

  const options = genres.map(genre => {
    return {
      value: genre,
      label: genre
    }
  })

  const filteredBooks = books.data.allBooks.filter(
    a => filter ? a.genres.includes(filter) : a
  )

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Select
        options={options}
        onChange={({ value }) => setFilter(value)}
        placeholder='Filter by genre'
        value={filter ? { label: filter, value: filter } : null}
      />
    </div>
  )
}

export default Books
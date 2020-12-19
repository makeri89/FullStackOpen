import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'
import BookInfo from './BookInfo'

const Recommendations = (props) => {
    const books = props.books
    const [genre, setGenre] = useState(null)
    const [recommended, setRecommended] = useState([])

    useQuery(ME, {
        onCompleted: ({ me }) => {
            setGenre(me.favoriteGenre)
        }
    })

    useEffect(() => {
        setRecommended(books.filter(book => book.genres.includes(genre)))
    }, [genre, books])

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h1>recommendations</h1>
            <p>books in your favorite genre <strong>{genre}</strong></p>
            <BookInfo books={recommended} />
        </div>
    )
}

export default Recommendations
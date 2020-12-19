import { gql } from '@apollo/client'

const BOOK_INFO = gql`
  fragment BookInfo on Book {
    id
    title
    published
    author {
      name
      born
      bookCount
    }
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookInfo
    }
  }
  ${BOOK_INFO}
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!, 
    $author: String!, 
    $published: Int!, 
    $genres: [String]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookInfo
    }
  }
  ${BOOK_INFO}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!, 
    $setBornTo: Int!
  ) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login(
    $username: String!,
    $password: String!
  ) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookInfo
   }
 }
 ${BOOK_INFO}
`
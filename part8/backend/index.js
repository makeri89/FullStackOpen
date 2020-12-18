require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require("apollo-server")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
})
  .then(() => {
  console.log('Connected to MongoDB')
})
  .catch((error) => {
    console.log('error connectiong to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } }
          ]
        }).populate('author')
        return books
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({
          author: { $in: author.id }
        }).populate('author')
        return books
      } else if (args.genre) {
        const books = await Book.find({
          genres: { $in: args.genre }
        }).populate('author')
        return books
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      let authorBooks = authors.map(async (author) => {
        const books = await Book.find({
          author: { $in: author._id }
        })
        const authorData = {
          name: author.name,
          born: author.born,
          bookCount: books.length
        }
        return authorData
      })

      booksOfAuthor = await Promise.all(authorBooks)
      return booksOfAuthor
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let book
      let author = await Author.findOne({ name: args.author })

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      console.log(author)
      if (!author) {
        author = new Author({
          name: args.author,
          born: null,
          bookCount: 1
        })
        book = new Book({ ...args, author: author._id })

        try {
          await author.save()
          await book.save()
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
        return book.populate('author').execPopulate()
      }
      else {
        book = new Book({ ...args, author: author._id })
        console.log(book)
        try {
          await book.save()
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
        return book.populate('author').execPopulate()
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      console.log('author', author)
      if (!author) return null
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      try {
        await user.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'sekret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: args.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

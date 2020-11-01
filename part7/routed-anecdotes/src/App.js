import React, { useState } from 'react'
import {
  Switch, Route, Link,
  useHistory, useRouteMatch
} from 'react-router-dom'
import { useField } from './hooks/index'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to ='/about'>about</Link>
      <Link style={padding} to ='/createnew'>create new</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    {notification}
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      for more info see<a href={anecdote.info}>{anecdote.info}</a>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div style={{position: 'fixed', bottom: 10}}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)



const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const { reset: contentReset, ...content } = useField('content')
  const { reset: authorReset, ...author } = useField('author')
  const { reset: infoReset, ...info } = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const clearForm = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          {/* <input name='content' value={content} onChange={(e) => setContent(e.target.value)} /> */}
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
          {/* <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} /> */}
        </div>
        <div>
          url for more info
          <input {...info} />
          {/* <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} /> */}
        </div>
        <button type='submit'>create</button>
        
      </form>
      <button onClick={clearForm}>reset</button>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} added`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
    history.push('/')
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdoteById = match
    ? anecdotes.find(anecdote => anecdote.id == Number(match.params.id))
    : null

  const anecdoteToVote = (id) => {
    return anecdotes.find(a => a.id == id)
  }

  const vote = (id) => {
    const anecdote = anecdoteToVote(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdoteById} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/createnew'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/'>
          <AnecdoteList 
            anecdotes={anecdotes} 
            notification={notification}
          />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;

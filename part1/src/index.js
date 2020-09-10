import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.name} {props.excercises}
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} excercises={props.parts[0].exercise} />
      <Part name={props.parts[1].name} excercises={props.parts[1].exercise} />
      <Part name={props.parts[2].name} excercises={props.parts[2].exercise} />
    </div>
  )
}

const Total = (props) => {
  const total = props.parts[0].exercise+props.parts[1].exercise+props.parts[2].exercise
  return (
    <p>
    Number of exercises {total}
  </p>
  )


}

const App = () => {
  const course = 'Half Stack application development'
  const osat = {
    parts: [
      {
        name: 'Fundamentals of React',
        exercise: 10
      },
      {
        name: 'Using props to pass data',
        exercise: 7
      },
      {
        name: 'State of a component',
        exercise: 14
      }
    ]
  }

  return (
    <>
      <Header name={course} />
      <Content parts={osat.parts} />
      <Total parts={osat.parts} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root')) 
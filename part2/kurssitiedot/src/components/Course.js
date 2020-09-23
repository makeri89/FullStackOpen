import React from 'react'

const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Part = ({ part, exercises}) => {
    return (
        <p>
          {part} {exercises}
        </p>
    )
  }
  
  const Content = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <div>
        {course.parts.map( part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        <p>
          <strong>Number of exercices {total}</strong>
        </p>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <>
        <Header name={course[0].name} />
        <Content course={course[0]} />
        <Content course={course[1]} />
      </>
    )
  }

export default Course
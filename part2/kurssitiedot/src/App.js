import React from 'react';
import Course from './components/Course'

// const Header = ({ name }) => {
//   return (
//     <div>
//       <h1>{name}</h1>
//     </div>
//   )
// }

// const Part = ({ part, exercises}) => {
//   return (
//       <p>
//         {part} {exercises}
//       </p>
//   )
// }

// const Content = ({ course }) => {
//   const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

//   return (
//     <div>
//       {course.parts.map( part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
//       <p>
//         <strong>Number of exercices {total}</strong>
//       </p>
//     </div>
//   )
// }

// const Course = ({ course }) => {
//   return (
//     <>
//       <Header name={course[0].name} />
//       <Content course={course[0]} />
//       <Content course={course[1]} />
//     </>
//   )
// }

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
          {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

    return (
      <div>
        <Course course={courses} />
      </div>
    )
  }

export default App;

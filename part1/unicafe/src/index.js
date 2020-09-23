import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, click }) => {
  return (
      <button onClick={click}>
        {text}
      </button>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
  </tr>
)

const Statistics = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const total = good + neutral + bad
  const weight = good * 1 + bad * -1
  const average = weight / total
  const positives = good / total * 100

  if (total === 0) {
    return(
      <div><h1>give feedback</h1>
      <Button text='good' click={handleGoodClick} />
      <Button text='neutral' click={handleNeutralClick} />
      <Button text='bad' click={handleBadClick} />
      <h2>statistics</h2>
      <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>give feedback</h1>
        <Button text='good' click={handleGoodClick} />
        <Button text='neutral' click={handleNeutralClick} />
        <Button text='bad' click={handleBadClick} />
        <h2>statistics</h2>
        <StatisticLine text='good' value={good} />
        <StatisticLine text ='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positives} />
      </div>
    )
  }
}

const App = () => {
  return (
    Statistics()
  )
}

ReactDOM.render(<App />,
  document.getElementById('root'))
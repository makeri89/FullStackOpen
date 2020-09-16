import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, click }) => {
  return (
      <button onClick={click}>
        {text}
      </button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [positive, setPositive] = useState(0)

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

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' click={handleGoodClick} />
      <Button text='neutral' click={handleNeutralClick} />
      <Button text='bad' click={handleBadClick} />
      <h2>statistics</h2>
      <p>
        good {good} <br/>
        neutral {neutral}<br/>
        bad {bad}<br/>
        average {average}<br/>
        positive {positives} %
      </p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root'))
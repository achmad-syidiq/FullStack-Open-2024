import { useState } from 'react'

const Display = ({text}) => <h2>{text}</h2>
const Button = ({onSmash, text}) => <button onClick={onSmash}>{text}</button>
const StatisticLine = ({text, value}) => <div>{text} {value}</div>
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increaseGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  };
  const increaseNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  };
  const increaseBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  };
  return (
    <div>
      <Display text="give feedback"/>
      <Button onSmash={increaseGood} text="good"/>
      <Button onSmash={increaseNeutral} text="neutral" />
      <Button onSmash={increaseBad} text="bad" />
      <Display text="statistics"/>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
    </div>
  )
}

export default App
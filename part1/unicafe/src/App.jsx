import { useState } from "react";

const Display = ({ text }) => <h2>{text}</h2>;
const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>;
const StatisticLine = ({ text, value }) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
};
const Statistic = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good ? (good / all) * 100 : 0;
  if (!all)
    return (
      <div>
        <Display text="statistics" />
        <p>No feedback given</p>
      </div>
    );
  return (
    <div>
      <Display text="statistics" />
      <table style={{border: "3px"}}>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const increaseGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
  };
  const increaseNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  };
  const increaseBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
  };
  return (
    <div>
      <Display text="give feedback" />
      <Button onSmash={increaseGood} text="good" />
      <Button onSmash={increaseNeutral} text="neutral" />
      <Button onSmash={increaseBad} text="bad" />
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
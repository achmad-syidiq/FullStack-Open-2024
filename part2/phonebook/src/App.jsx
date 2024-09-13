import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "087-9872364" }]);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleNewPerson = (event) => {
    setNewPerson(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name == newPerson)) {
      alert(`${newPerson} has already added in phonebook`);
      return;
    }
    setPersons([...persons, { name: newPerson, number: newNumber }]);
    setNewPerson("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>Name: <input value={newPerson} onChange={handleNewPerson} /></div>
        <div>Number: <input value={newNumber} onChange={handleNewNumber} /></div>
        <div><button type="submit" onClick={handleAddPerson}>add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}>{person.name} {person.number}</p>
      ))}
    </div>
  );
};

export default App;

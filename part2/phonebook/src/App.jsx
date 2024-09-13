import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newPerson, setNewPerson] = useState("");
  const handleChangeNewPerson = (event) => {
    setNewPerson(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name == newPerson)) {
      alert(`${newPerson} has already added in phonebook`);
      return;
    }
    setPersons([...persons, { name: newPerson }]);
    setNewPerson("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newPerson} onChange={handleChangeNewPerson} />
        </div>
        <button type="submit" onClick={handleAddPerson}>add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;

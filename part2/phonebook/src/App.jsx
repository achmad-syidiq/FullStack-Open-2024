import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPerson = persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  useEffect(()=> {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
  }, [])

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name == newPerson)) {
      alert(`${newPerson} has already added in phonebook`);
      return;
    }
    setPersons([
      ...persons,
      {
        name: newPerson,
        number: newNumber,
        id: persons.length + 1,
      },
    ]);
    setNewPerson("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} handle={handleSearchTerm} />
      <h2>add a new</h2>
      <PersonForm 
        onAction={handleAddPerson} 
        person={newPerson}
        handlePerson={handleNewPerson} 
        number={newNumber} 
        handleNumber={handleNewNumber} 
      />
      <h2>Numbers</h2>
      <Person value={filteredPerson} />
    </div>
  );
};

const Filter = ({ value, handle }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={handle} />
    </div>
  );
};

const PersonForm = (props) => {
  const {onAction, person, handlePerson, number, handleNumber} = props
  return (
    <form onSubmit={onAction}>
      <div>
        Name: <input value={person} onChange={handlePerson} />
      </div>
      <div>
        Number: <input value={number} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const Person = ({ value }) => {
  return (
    <>
      {value.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default App;

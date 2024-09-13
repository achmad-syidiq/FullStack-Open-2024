import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPerson = persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
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

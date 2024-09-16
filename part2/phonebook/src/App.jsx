import { useEffect, useState } from "react";
import Display from "./components/Display";
import Filter from "./components/FilterPerson";
import Person from "./components/Person"
import PersonForm from "./components/PersonForm"
import axios from "axios";
import phoneServices from "./services/phones"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPerson = persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  useEffect(()=> {
    phoneServices
      .getAll()
      .then(initialPhones => setPersons(initialPhones))
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

    const newObjectPerson = {
      name: newPerson,
      number: newNumber,
      id: String(persons.length + 1),
    }

    phoneServices
      .create(newObjectPerson)
      .then( returnedPersons => {
        setPersons([...persons, returnedPersons])
        setNewPerson("");
        setNewNumber("");
      })
    
  };

  return (
    <div>
      <Display text="Phonebook" />
      <Filter value={searchTerm} handle={handleSearchTerm} />
      <Display text="add a new" />
      <PersonForm 
        onAction={handleAddPerson} 
        person={newPerson}
        handlePerson={handleNewPerson} 
        number={newNumber} 
        handleNumber={handleNewNumber} 
      />
      <Display text="Numbers" />
      <Person value={filteredPerson} />
    </div>
  );
};


export default App;

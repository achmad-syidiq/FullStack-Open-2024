import { useEffect, useState } from "react";
import Display from "./components/Display";
import Filter from "./components/FilterPerson";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import phoneServices from "./services/phones";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const filteredPerson = persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    phoneServices.getAllPerson().then((initialPhones) => setPersons(initialPhones));
  }, []);

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
    const existingPerson = persons.find((person) => person.name === newPerson);
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newPerson} is already added to phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        phoneServices
          .updatePerson(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson)));
            setNewPerson("");
            setNewNumber("");
          })
          .then(() => {
            setMessage({
              text: `Updated ${existingPerson.name}'s number`,
              type: "success",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      } else {
        setNewPerson("");
        setNewNumber("");
      }
    } else {
      const newObjectPerson = {
        name: newPerson,
        number: newNumber,
        id: String(persons.length + 1),
      };
      phoneServices
        .createPerson(newObjectPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setNewNumber("");
          setNewPerson("");
        })
        .then(() => {
          setMessage({
            text: `Added ${newObjectPerson.name}`,
            type: "success",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const handleDeletedPerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      phoneServices
        .deletePerson(id, name)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage(
            {
              text: `Deleted ${name} from server`,
              type: "success",
            },
            setTimeout(() => {
              setMessage(null);
            }, 5000)
          );
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            console.log("error bro", err.response.status);
            setMessage({
              text: `Information of ${name} has already been removed from server`,
              type: "error",
            });
            setPersons(persons.filter((person) => person.id !== id));
            setTimeout(() => setMessage(null), 5000);
          }
        });
    }
  };

  return (
    <div>
      <Display text="Phonebook" />
      <Notification message={message} />
      <Filter value={searchTerm} handle={handleSearchTerm} />
      <Display text="add a new" />
      <PersonForm onAction={handleAddPerson} person={newPerson} handlePerson={handleNewPerson} number={newNumber} handleNumber={handleNewNumber} />
      <Display text="Numbers" />
      <Person persons={filteredPerson} toggle={handleDeletedPerson} />
    </div>
  );
};

export default App;

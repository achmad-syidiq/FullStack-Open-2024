import React from "react";

const Person = ({ persons, toggle }) => {
  return (
    <>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => toggle(person.id, person.name)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Person;

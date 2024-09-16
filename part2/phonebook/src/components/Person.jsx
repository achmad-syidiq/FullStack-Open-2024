import React from "react";

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

export default Person;

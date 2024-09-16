const PersonForm = (props) => {
  const { onAction, person, handlePerson, number, handleNumber } = props;
  return (
    <form onSubmit={onAction}>
      <div>Name: <input value={person} onChange={handlePerson} /></div>
      <div>Number: <input value={number} onChange={handleNumber} /></div>
      <div><button type="submit">Add</button></div>
    </form>
  );
};

export default PersonForm
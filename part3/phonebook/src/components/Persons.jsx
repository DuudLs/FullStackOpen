import noteService from '../services/notes.js'

const Persons = ({persons, setPersons, filteredName, setFilteredName}) => {

    const personsToShow = persons.filter(person =>
      person.name.toLowerCase().includes(filteredName.toLowerCase())
    )
  
    const handleDelete = (id) => {
      if (window.confirm("Do you really want to remove contact?")) {
      noteService
        .remove(id)
        .then(() => {
          alert('Data has been deleted!');
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Failed to delete data:', error);
          alert('Failed to delete data.');
        });
    }}

    return (
      <div>
      {personsToShow.map(person => (
        <p key={person.id}>{`${person.name}: ${person.number}`}<button onClick={() => handleDelete(person.id)}>delete</button></p>
      ))}
    </div>
    )
  }
  
export default Persons
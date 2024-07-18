const Persons = ({persons, setPersons, filteredName, setFilteredName}) => {

    const personsToShow = persons.filter(person =>
      person.name.toLowerCase().includes(filteredName.toLowerCase())
    )
  
    return (
      <div>
      {personsToShow.map(person => (
        <p key={person.id}>{`${person.name}: ${person.number}`}</p>
      ))}
    </div>
    )
  }
  
export default Persons
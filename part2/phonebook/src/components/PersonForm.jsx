import noteService from '../services/notes.js'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    const addNameAndNumber = (event) => {
      event.preventDefault()
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }


      noteService
      .create(nameObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
        setNewNumber('')
      })
    }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
    return (
      <form onSubmit={addNameAndNumber}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

export default PersonForm
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import noteService from './services/notes.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {setPersons(initialNotes)
    })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter <Filter filteredName={filteredName} setFilteredName={setFilteredName} />
      </div>
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons}	newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Contacts</h2>
      <Persons persons={persons} setPersons={setPersons} filteredName={filteredName} setFilteredName={setFilteredName} />
    </div>
  )
}

export default App

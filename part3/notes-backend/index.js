const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
app.use(morgan('tiny'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (req, res) => {
    const currentDate = new Date();
    const dateString = currentDate.toString();
    res.send(`<p>Phonebook has info for ${persons.length} people!</p><p>${dateString}</p>`);
});

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    res.json(person)
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
      return res.status(400).json({ error: 'name or number is missing' })
  }

  const existingPerson = persons.find(person => person.name === body.name)
  if (existingPerson) {
      return res.status(400).json({ error: 'name must be unique' })
  }

  const setId = Math.ceil(Math.random()*1000)
  
  const person = {
      id: String(setId + 1),
      ...body
  }

  persons = persons.concat(person)
  res.json(person)
})

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
const mongoose = require("mongoose");

const url = `mongodb+srv://DuudLs:MZO4dgDIwhDJYSWM@database.1vs1s.mongodb.net/?retryWrites=true&w=majority&appName=database`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose.connect(url);

const inputName = process.argv[3];
const inputNumber = process.argv[4];

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: inputName,
    number: inputNumber,
  });
  person.save().then((result) => {
    console.log("added", inputName, "number", inputNumber, "to phonebook");
    mongoose.connection.close();
  });
} else {
  console.log(
    "Please provide the correct number of arguments: node <filename> <name> <number>"
  );
  mongoose.connection.close();
}

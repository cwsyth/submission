import { useState, useEffect } from 'react'
import personService from './services/person'
import Filter from './components/Filter/Filter'
import Form from './components/Form/Form'
import Persons from './components/Persons/Persons'
import Notification from './components/Notification/Notification'

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [msg, setMsg] = useState(null);
  const filteredPersons = showAll ? persons : persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  })

  useEffect(() => {
    personService.getAll()
      .then((persons) => {
        setPersons(persons);
      });
  }, []);

  const mapNewName = (e) => {
    setNewName(e.target.value);
  }

  const mapNewNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setShowAll(false);
  }

  const addNewPerson = (e) => {
    e.preventDefault();

    const nameTaken = persons.some((person) => {
      return person.name === newName;
    });

    if(!nameTaken) {
      const newPerson = { 
        name: newName,
        number: newNumber
      };

      personService.create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));

          setMsg(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setMsg(null);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          alert('person could not be added');
        });
    }
    else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let updatePerson = persons.find((person) => {
          return person.name === newName;
        });
        updatePerson.number = newNumber;

        personService.update(updatePerson)
          .then((returnedPerson) => {
            const newPersons = persons.filter((person) => {
              return person.id !== returnedPerson.id;
            }).concat(returnedPerson);

            setPersons(newPersons);

            setMsg(`Changed number of ${returnedPerson.name}`);
            setTimeout(() => {
              setMsg(null);
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            alert(`${updatePerson.name} does not exist`);
          });
        
        console.log(updatePerson);
      }
    }

    setNewName('');
    setNewNumber('');
  }

  const deletePerson = (id) => {
    const { name } = persons.find((person) => {
      return person.id === id;
    });

    if(window.confirm(`Delete ${name}?`)) {
  
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter((person) => {
            return person.id !== id;
          }));
        })
        .catch((err) => {
          console.log(err);
          alert('person could not be deleted');
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        msg={msg}
        />
      <Filter 
        value={filter} 
        onChange={handleFilter}
        />
      <h2>add a new</h2>
      <Form 
        onSubmit={addNewPerson} 
        nameValue={newName} 
        nameOnChange={mapNewName}
        numberValue={newNumber}
        numberOnChange={mapNewNumber}
        />
      <h2>Numbers</h2>
      <Persons 
        persons={filteredPersons}
        onClick={deletePerson}
        />
    </div>
  )
}

export default App
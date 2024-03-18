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

  function removeMsg() {
    setTimeout(() => {
      setMsg(null);
    }, 3000);
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
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));

          setMsg(`Added ${createdPerson.name}`);
        })
        .catch((err) => {
          console.log(err);
          
          if(err.response) {
            setMsg(err.response.data.error);
          }
          else {
            alert('person could not be added');
          }
        });
    }
    else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find((person) => {
          return person.name === newName;
        });

        const updatePerson = {
          ...existingPerson,
          number: newNumber
        };

        personService.update(updatePerson)
          .then((oldPerson) => {
            const newPersons = persons.filter((person) => {
              return person.id !== oldPerson.id;
            }).concat(updatePerson);

            setPersons(newPersons);

            setMsg(`Changed number of ${updatePerson.name}`);
          })
          .catch((err) => {
            console.log(err);

            if(err.response) {
              setMsg(err.response.data.error);
            }
            else {
              alert(`${updatePerson.name} does not exist`);
            }
          });
      }

      removeMsg();
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
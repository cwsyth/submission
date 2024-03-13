const Persons = ({ persons, onClick }) => {
    return (
        <div>
            {
                persons.map((person) => {
                    return (
                        <div key={person.name}>
                            <div>{person.name} {person.number}</div>
                            <button onClick={() => onClick(person.id)}>
                                Delete
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Persons
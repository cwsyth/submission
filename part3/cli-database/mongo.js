const mongoose = require('mongoose');

const password = process.argv[2];
const url = `mongodb+srv://stb:${password}@cluster0.bahbzq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

if(password) {
    mongoose.connect(url);

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    });
    const Person = mongoose.model('Person', personSchema);

    
    if(!process.argv[3] || !process.argv[4]) {
        Person.find({})
            .then((res) => {
                console.log(res);
                mongoose.connection.close();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        const newPerson = new Person({
            name: process.argv[3],
            number: process.argv[4]
        });

        newPerson.save()
            .then((res) => {
                console.log(`added ${process.argv[3]} number 040-1234556 ${process.argv[4]} to phonebook`);
                mongoose.connection.close();
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
else {
    console.log('password argument is missing');
}
const express = require('express');
const { faker } = require('@faker-js/faker');

const Repositories = require('./repositories')
const UserRepository = Repositories.UserRepository()

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    await UserRepository.saveUser(faker.person.firstName())
    
    const users = await UserRepository.fetchUsers()

    const heading =  '<h1>Full Cycle Rocks!!!</h1><br><br>';
    let table = '<table><tr><th>Name</th></tr>'
    users.forEach((user) => {
        table = table + `<tr><td>${user.name}</td></tr>`
    });

    table = table + '</table>'
    
    res.send(heading + table);
});

app.listen(port, () => {
    console.log('Server running in port ' + port);
});
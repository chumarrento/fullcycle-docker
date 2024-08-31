const express = require('express');
const mysql = require('mysql');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

app.get('/', async (req, res) => {
    insertUser(faker.person.firstName());
    
    const users = await getUsers()
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Full Cycle Rocks!!!</h1><br><br>')
    res.write('<table><tr><th>Name</th></tr>')
    users.forEach((user) => {
        res.write(`<tr><td>${user.name}</td></tr>`)
    })
    res.write('</table>')
    res.end()
});


function insertUser(fakeName) {
    const sql = `INSERT INTO users(name) VALUES ("${fakeName}")`;
    connection.query(sql);
}

function getUsers() {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT id, name from users', function (err, rows) {
            if (rows === undefined) {
                reject(new Error('Something went wrong'));
                return;
            }

            resolve(rows.map((row) => ({
                id: row.id,
                name: row.name
            })))
        }) 
    });
}

app.listen(port, () => {
    console.log('Server running in port ' + port);
});
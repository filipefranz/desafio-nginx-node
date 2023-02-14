const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

function addValues (res) {

    const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;
    connection.query(sqlTable);

    const characters = [['Luke Skywalker'], ['Darth Vader'], ['Han Solo'], ['Chewbacca'], ['Leia Organa'], ['Obi-Wan Kenobi'], ['Yoda'], ['R2-D2'], ['C-3PO']];
    const sql = `INSERT INTO people(name) VALUES ?`;

    connection.query(sql, [characters], function(error) {
        if (error) {
            console.log('add names error', error);
            throw error;
        } else {
            getPeople(res);
        }
    });
}
 function getPeople(res) {
    const sql = `SELECT id, name FROM people`;

    connection.query(sql, (error, results, fields) => {
        console.log('result:', results);
        if (error) {
            console.log('error', error);
            throw error
        };

        let table = '<table>';
        table += '<tr><th>ID</th><th>Name</th></tr>';
        for (let people of results) {
            table += `<tr><td>${people.id}</td><td>${people.name}</td></tr>`;
        }

        table += '</table>';
        res.send('<h1>Full Cycle Rocks!</h1>' + table);
    });
    // connection.end();
}

app.get('/', (req,res) => {
    addValues(res);
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost', //indirizzo del server
  user: 'root', //nome utente di mysql
  port:'8888',//porta di mysql
  password: 'root',//password di mysql
  database: 'larabook' //nome del database
});

function newUsers(req, res, next) {
  if (req.query.usersLength) {
    req.query.usersLength = parseInt(req.query.usersLength); //trasforma in numero
  }
  next();
}

module.exports = { newUsers };

app.get('/getUsers', newUsers, function(req, res) {
  const usersLength = req.query.usersLength || 5; //se non c'è usersLength, allora usersLength = 5
  const query = 'SELECT * FROM (SELECT * FROM users ORDER BY ID DESC LIMIT ?) sub ORDER BY ID'; //http://localhost:3000/getUsers?usersLength=5
  connection.query(query, [usersLength], function(error, results, fields) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});





app.post('/addUser', function(req, res, ) {
  const user = req.body;
  const query = 'INSERT INTO users (nome, gender, slug, email, immagine, role) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [user.nome, user.gender, user.slug, user.email, user.immagine, user.role], function(error, results, fields) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
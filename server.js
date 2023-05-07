const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port:'8888',
  password: 'root',
  database: 'larabook'
});

function newUsers(req, res, next) {
  if (req.query.usersLength) {
    req.query.usersLength = parseInt(req.query.usersLength);
  }
  next();
}

module.exports = { newUsers };

app.get('/getUsers', newUsers, function(req, res) {
  const usersLength = req.query.usersLength || 5;
  const query = 'SELECT * FROM users LIMIT ?';
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
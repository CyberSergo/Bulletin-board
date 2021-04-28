require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const cors = require('cors');
const connectionMySQL = require('./databaseConfig')
const api = require('./routes/api')


// Connect static files

app.use('/api', api)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(cors());

//Frontend Server (BASIC)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/pages/index.html')
});

app.get('/single-ad/', function (req, res) {
  res.sendFile(__dirname + '/pages/bulletin.html')
});

app.get('/search/', function (req, res) {
  res.sendFile(__dirname + '/pages/search.html')
});

app.get('/user/add-bulletin', function (req, res) {
  res.sendFile(__dirname + '/pages/add-bulletin-page.html')
});

app.get('/user/registration', function(req, res) {
  res.sendFile(__dirname + '/pages/registration.html')
});

app.get('/user/login', function(req, res) {
  res.sendFile(__dirname + '/pages/authorization.html')
});


const start = () => {
  try {
    app.listen(PORT, () => console.log(`The server is running on: http://localhost:${PORT}`));
  } catch (err) {
    console.log(err)
  }
};
start(); 

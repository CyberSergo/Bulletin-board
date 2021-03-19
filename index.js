const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
const mysql = require("mysql");


// Connect static files

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(cors());

// Global variables

let adsOnPage = 6;
let indexOfArray = 0;
let searchArray = [];

// Connect to database

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "bulletin-board",
  password: ""
});

conn.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('DATABASE-----------OK');
  }
});


//API SERVER

// Get 6 ads from array
app.get('/api/page/:number', function (req, res) {

  if (req.params.number !== undefined && req.params.number !== "") {
    conn.query('SELECT * FROM ads;', (err, result, field) => {
      let bulletinArr = []
      result.forEach(e => {
        bulletinArr.push(e)
      })

      let start = (req.params.number - 1) * adsOnPage;
      let end = start + adsOnPage;
      let reverseArr = bulletinArr.reverse()
      let ads = reverseArr.slice(start, end)
      res.json(ads)
    })
  } else {
    res.send("Error, bad page number!")
  }

})


// Get number of page

app.get('/api/number-of-pages/', function (req, res) {
  conn.query('SELECT COUNT(id) FROM  ads;', (err, result, field) => {
    let countOfItems = Math.ceil(result[0]['COUNT(id)'] / adsOnPage);
    res.json(countOfItems);
  });
});


// Get all ads

app.get('/api/all-ads/', function (req, res) {
  conn.query('SELECT * FROM ads;', (err, result, field) => {
    res.json(result)
  });
});

// GET request for take single object from bulletin array

app.get("/api/single-ad/:id", function (req, res) {
  conn.query(`SELECT * FROM ads WHERE id= ${req.params.id}`, (err, result) => {
    res.json(result)
  })
});



// GET request for take single object from search page

app.get("/api/search/single-ad/:id", function (req, res) {
  conn.query(`SELECT * FROM ads WHERE id= ${req.params.id}`, (err, result) => {
    res.json(result)
  })
});

// Make a post request for add new ad to array

app.post("/api/add-ad/", function (req, res) {
  if (req.body.productName !== undefined && req.body.description !== undefined) {
    if (req.body.productName.trim() !== "" && req.body.description.trim() !== "") {
      console.log(req.body.productName)
      conn.query("INSERT INTO ads (id, productName, description, req_date) VALUES (NULL, '" + req.body.productName + "', '" + req.body.description + "', current_timestamp());", function (err, result) {
        console.log("1 record inserted");
        if (err) {
          console.log(err);
        } else {
          console.log(result)
        }
      })
    } else {
      res.send('Error')
    }
  } else {
    res.send('Error')
  };
});

// Get request for search object in array "bulletin-array"

app.get('/api/search/:query', function (req, res) {
  if (req.params.query != undefined || req.params.query.trim() != '') {
    conn.query(`SELECT * FROM ads WHERE productName LIKE "%${req.params.query}%"`, (err, result) => {
      console.log(err)
      res.json(result)
    }) 
  } else {
    res.send('Error')
  }
});


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

app.get('/search/single-ad/', function (req, res) {
  res.sendFile(__dirname + '/pages/search-single-bulletin.html')
});




app.listen(port, () => {
  console.log(`The server is running on: http://localhost:${port}`)
});

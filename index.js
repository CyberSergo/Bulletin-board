require('dotenv').config()
const express = require("express");
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

// Connect to database

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: ""
});

conn.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('DATABASE-----------OK');
  }
});

conn.query("SET SESSION wait_timeout = 604800")

//API SERVER

// Get 6 ads from array
app.get('/api/page/:number/:filter', function (req, res) {
  let sqlRequest = ''
  if (req.params.number !== undefined && req.params.number !== "") {
    if (req.params.filter == 'filterUsed') {
      sqlRequest = 'SELECT * FROM `ads` ORDER BY `ads`.`category` ASC'
    } else if (req.params.filter == 'filterNew') {
      sqlRequest = 'SELECT * FROM `ads` ORDER BY `ads`.`category` DESC'
    } else {
      sqlRequest = 'SELECT * FROM ads;'
    }
    conn.query(sqlRequest, (err, result, field) => {
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

app.get("/api/single-ad/:id", cors(), function (req, res) {
  let id = req.params.id

  let sql = "SELECT * FROM ads WHERE id= ?"

  conn.query(sql, id, (err, result) => {
    res.json(result)
  })
});



// GET request for take single object from search page

app.get("/api/search/single-ad/:id", function (req, res) {
  let id = req.params.id

  let sql = "SELECT * FROM ads WHERE id= ?"

  conn.query(sql, id, (err, result) => {
    res.json(result)
  })
});

// Make a post request for add new ad to array

app.post("/user/add-bulletin", cors(), function (req, res) {

  let tagError = false
  let numberOfTags = 0

  req.body.tags.forEach(e => {
    element = e.trim()
    let regexElement = element.match('[^a-zA-Zа-яА-Я0-9]')

    if (regexElement != null) {
      tagError = true
    } else {
      numberOfTags++
    }
  })



  if (req.body.productName !== undefined && req.body.description !== undefined && tagError == false && numberOfTags < 6) {
    if (req.body.productName.trim() !== "" && req.body.description.trim() !== "") {

      let productName = req.body.productName
      let description = req.body.description
      let category = req.body.category
      let tags = JSON.stringify(req.body.tags)
   
      let sql = "INSERT INTO ads (id, productName, description, req_date, category, tags) VALUES (NULL, ?, ?, current_timestamp(), ?, ?);"

      conn.query(sql, [productName, description, category, tags], function (err, result) {
        console.log("1 record inserted");
        if (err) {
          console.log(err);
        } else {
          res.send('Announcement added')
        }
      })
    } else {
      res.send('Please fill in all input fields')
    }
  } else if (tagError == true || numberOfTags > 5) {
    res.send('Badly written "Tags" field, please follow the example')
  } else {
    res.send('Please fill in all input fields')
  }
});

// Get request for search object in array "bulletin-array"

app.get('/api/search/:query', function (req, res) {
  let emptySearch = new RegExp(/(..)/g)

  if (req.params.query != undefined || req.params.query.trim() != '') {
    if (req.params.query.search(emptySearch) == 0) {
      let query = "%" + req.params.query + "%"
          sql = `SELECT * FROM ads WHERE tags LIKE ? OR productName LIKE ?;`
          conn.query(sql, [query, query], (err, result) => {
            res.json(result)
          })
    } else {
      res.send('Not enough values ​​to search')
    }
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

app.get('/user/add-bulletin', function (req, res) {
  res.sendFile(__dirname + '/pages/add-bulletin-page.html')
});






app.listen(port, () => {
  console.log(`The server is running on: http://localhost:${port}`)
});



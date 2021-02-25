const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
const { json } = require("body-parser");

// Connect static files

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(cors());

// Global variables

let adsOnPage = 6;
let indexOfArray = 0;
let searchArray = [];
//API SERVER

// Get 6 ads from array
app.get('/api/page/:number', function (req, res) {

  if (req.params.number !== undefined && req.params.number !== "") {
    fs.readFile("bulletin-array.json", "utf-8", function (err, data) {
      let str = data.replace(/(?:\r\n|\\n)/g, '<br>');
      bulletinArr = JSON.parse(str);
      let start = (req.params.number - 1) * adsOnPage;
      let end = start + adsOnPage;
      let result = bulletinArr.slice(start, end)
      res.json(result)
    });
  } else {
    res.send("Error, bad page number!")
  }

})



app.get('/api/number-of-pages/', function (req, res) {
  fs.readFile("bulletin-array.json", "utf-8", function (err, data) {
    let str = data.replace(/(?:\r\n|\\n)/g, '<br>');
    bulletinArr = JSON.parse(str);
    bulletinArr.forEach(element => {
      indexOfArray++
    });
    let countOfItems = Math.ceil(indexOfArray / adsOnPage);
    indexOfArray = 0;
    res.json(countOfItems);
  });
});





// Get all ads

app.get('/api/all-ads/', function (req, res) {
  fs.readFile("bulletin-array.json", "utf-8", function (err, data) {
    let str = data.replace(/(?:\r\n|\\n)/g, '<br>');
    bulletinArr = JSON.parse(str);
    res.json(bulletinArr)
  });
});

// GET request for take single object from bulletin array

app.get("/api/single-ad/:id", function (req, res) {
  let singleArr = []
  fs.readFile("bulletin-array.json", "utf-8", function (err, data) {
    let str = data.replace(/(?:\r\n|\\n)/g, '<br>');
    let singleAd = JSON.parse(str);
    singleAd.forEach(e => singleArr.push(e))
    let neededObj = singleArr.find(neededId => neededId.id == req.params.id)
    res.json(neededObj)
  });
});

// GET request for take single object from search page

app.get("/api/search/single-ad/:id", function (req, res) {
  res.json(searchArray[req.params.id])

});

// Make a post request for add new ad to array

app.post("/api/add-ad/", function (req, res) {
  if (req.body.productName !== undefined && req.body.description !== undefined) {
    if (req.body.productName.trim() !== "" && req.body.description.trim() !== "") {
      fs.readFile("bulletin-array.json", "utf-8", function (err, data) {
        if (data != false) {
          req.body.id = JSON.parse(data)[0].id + 1;
          bulletinArr.unshift(req.body);
          fs.writeFile('./bulletin-array.json', JSON.stringify(bulletinArr), function () {
            res.send('New ad has been created successfully')
          });
        } else {
          req.body.id = 1
          bulletinArr.unshift(req.body)
          fs.writeFile('./bulletin-array.json', JSON.stringify(bulletinArr), function () {
            res.send('New ad has been created successfully')
          });
        };
      });
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
    searchArray = [];
    fs.readFile("bulletin-array.json", "utf-8", function (err, data) {
      let str = data.replace(/(?:\r\n|\\n)/g, '<br>');
      bulletinArr = JSON.parse(str);

      bulletinArr.forEach(function (e) {

        let searchBase = e.productName.toUpperCase()
        let searchingValue = req.params.query.toUpperCase()


        if (searchBase.indexOf(searchingValue) != -1) {
          searchArray.push(e)
        }
      })
      res.json(searchArray)
    });
  } else {
    res.send('Error')
  }

})




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


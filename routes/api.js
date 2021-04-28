const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const connectionMySQL = require('../databaseConfig');
let router = express.Router();
const getController = require('../controllers/get.controllers')
const postController = require('../controllers/post.controllers')

router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


const conn = connectionMySQL.connection;


// Get number of pages 
router.get('/number-of-pages/', getController.numberOfPages);

// Get multiple ads from database
router.get('/page/:number/:filter', getController.multipleAds);

// Get all ads from database
router.get('/all-ads/', getController.allAds);

// Get single ad from database 
router.get("/single-ad/:id", cors(), getController.singleAd);

// Search ads from database
router.get('/search/:query', getController.searchAds);

// Add new ad in database 
router.post('/user/add-bulletin', cors(), postController.newAd);

// Post registration request
router.post('/user/registration', postController.registration);

// Post authorization request
router.post('/user/authorization', postController.authorization);



module.exports = router;
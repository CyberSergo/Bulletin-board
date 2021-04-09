const connectionMySQL = require('../databaseConfig');

const conn = connectionMySQL.connection;
const adsOnPage = parseInt(process.env.NUM_PAGES);

// Get multiple ads from database

function multipleAds(req, res) {
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

};

// Searhing function from database

function searchAds(req, res) {
    let emptySearch = new RegExp(/(..)/g);

    if (req.params.query != undefined || req.params.query.trim() != '') {
        if (req.params.query.search(emptySearch) == 0) {
            let query = "%" + req.params.query + "%";
            sql = `SELECT * FROM ads WHERE tags LIKE ? OR productName LIKE ?;`;
            conn.query(sql, [query, query], (err, result) => {
                res.json(result)
            })
        } else {
            res.send('Not enough values ​​to search')
        }
    } else {
        res.send('Error')
    };
};

// Get all ads

function allAds(req, res) {
    conn.query('SELECT * FROM ads;', (err, result, field) => {
        res.json(result)
    });
};

// Get single ad

function singleAd(req, res) {
    let id = req.params.id;

    let sql = "SELECT * FROM ads WHERE id= ?";

    conn.query(sql, id, (err, result) => {
        res.json(result)
    });
};

// Get number of page

function numberOfPages(req, res) {
    conn.query('SELECT COUNT(id) FROM  ads;', (err, result, field) => {
        let countOfItems = Math.ceil(result[0]['COUNT(id)'] / adsOnPage);
        res.json(countOfItems);
    });
};





module.exports = {
    allAds: allAds,
    singleAd: singleAd,
    searchAds: searchAds,
    multipleAds: multipleAds,
    numberOfPages: numberOfPages
}
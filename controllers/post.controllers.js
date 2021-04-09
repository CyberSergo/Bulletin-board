const bodyParser = require('body-parser');
const connectionMySQL = require('../databaseConfig');

const conn = connectionMySQL.connection;

// POST controller for add new ad

function newAd(req, res) {

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

            let productName = req.body.productName;
            let description = req.body.description;
            let category = req.body.category;
            let tags = JSON.stringify(req.body.tags);

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
};



module.exports = {
    newAd: newAd
}
const bodyParser = require('body-parser');
const connectionMySQL = require('../databaseConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, email, password) => {
    const payload = {
        id: id,
        email: email,
        password: password
    };

    return jwt.sign(payload, process.env.SECRET_KEY)
}

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
            let userToken = jwt.verify(req.body.token, process.env.SECRET_KEY);

            let sqlUser = 'SELECT * FROM `users` WHERE email= ?;';

            conn.query(sqlUser, [userToken.email], function (err, result) {
                try {
                    if (userToken.password == result[0].password) {
                        let userId = userToken.id
                        let sql = "INSERT INTO ads (id, productName, description, req_date, category, tags, user) VALUES (NULL, ?, ?, current_timestamp(), ?, ?, ?);"

                        conn.query(sql, [productName, description, category, tags, userId], function (err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`1 record inserted by ID:${userId}`);
                                res.send('Announcement added')
                            }
                        })
                    } else {
                        res.send('You are not authorized')
                    }



                } catch (err) {
                    res.status(400).send()
                }
            })





        } else {
            res.send('Please fill in all input fields');
        }
    } else if (tagError == true || numberOfTags > 5) {
        res.send('Badly written "Tags" field, please follow the example');
    } else {
        res.send('Please fill in all input fields');
    }
};



async function registration(req, res) {

    if (req.body.name.trim() !== "" && req.body.email.trim() !== "" && req.body.password.trim() !== "" && req.body.confirmPassword !== "") {

        if (req.body.password === req.body.confirmPassword) {

            if (req.body.name.length > 2 && req.body.email.length > 5 && req.body.password.length > 5) {

                let name = req.body.name;
                let email = req.body.email;

                let salt = await bcrypt.genSalt();
                let hashedPassword = await bcrypt.hash(req.body.password, salt);

                let sqlSearch = "SELECT * FROM users WHERE email LIKE ?;"

                conn.query(sqlSearch, [email], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result)
                        if (result == '') {
                            let sql = "INSERT INTO `users` (`id`, `name`, `email`, `password`, `req_date`) VALUES (NULL, ?, ?, ?, current_timestamp());"

                            conn.query(sql, [name, email, hashedPassword], function (err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("User added");
                                    res.send('User added')
                                }
                            })
                        } else {
                            res.send('The user with this e-mail is already registered')
                        }

                    };
                });

            } else {
                alert('The "Name" field must contain at least 3 characters. The "Password" field must contain at least 5 characters. The "Email" field must contain at least 6 characters')
            }
        } else {
            alert('Wrong password')
        }
    } else {
        res.send('Please fill in all input fields')
    }
}


function authorization(req, res) {

    let email = req.body.email;
    let password = req.body.password;
    


    let sql = 'SELECT * FROM `users` WHERE email= ?;'
    
    if (req.body.email.trim() !== "" && req.body.email.trim() !== "") {
        conn.query(sql, [email], function (err, result) {
     
        try {
            if (result.length == 0) { return res.send('User is not found')};

            let validPassword = bcrypt.compareSync(password, result[0].password);

            if (!validPassword) { return res.send('Wrong Password') };
            const token = generateAccessToken(result[0].id, result[0].email, result[0].password);
            res.json({ token });

        } catch (err) {
            res.status(400).send();
        }
    })
    }
    


}


module.exports = {
    newAd: newAd,
    registration: registration,
    authorization: authorization
}
import express from 'express';

import bodyParser from 'body-parser';

const app = express();

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let models = require("./models");

models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

import routes from './routes';
routes(app)

app.listen(3000, console.log("App listening on port 3000"));
/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ******************************************
 * Require Statements
 *******************************************/
const express = require('express');
const app = express();
const baseController = require('./controllers/baseController');
const contactsRoute = require('./routes/contactRouter.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require("dotenv").config()


/* ******************************************
* Middleware
*******************************************/
// app.use(function(req, res) {
//     res.status(404).send({url: req.originalUrl + ' not found'})
//   });

// next();

/* ***********************
 * Functions
 *************************/

// async function main() {
 
//     const uri = process.env.DATABASE_URL;
//     mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
//     const db = mongoose.connection;

//     db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//     db.once('open', () => {
//         console.log('Connected to MongoDB');
//       });
// }



// main().catch(console.error);



/* ***********************
 * Routes
 *************************/
app.use(bodyParser.json());

// Home Route
app.get('/', baseController.home)
app.get('/self', baseController.self)
app.use('/contacts', contactsRoute)







/* ***********************
 * Server Listener
 *************************/
const port = 5050


app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT || port}`)
})


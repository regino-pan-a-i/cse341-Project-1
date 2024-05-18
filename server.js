/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ******************************************
 * Require Statements
 *******************************************/
const express = require('express');
const app = express();
const router = require('./routes/router.js');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');


/* ******************************************
* Middleware
*******************************************/
// app.use(function(req, res) {
//     res.status(404).send({url: req.originalUrl + ' not found'})
//   });

// next();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
 * Router
 *************************/
app.use(bodyParser.json());

// Send everything to the router handler
app.use('/', router);


/* ***********************
 * Server Listener
 *************************/
const port = 3000;


app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT || port}`)
})


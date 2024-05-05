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
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const env = require("dotenv").config()


/* ******************************************
* Middleware
*******************************************/
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

/* ***********************
 * Functions
 *************************/

async function main() {
 
    const uri = process.env.DATABASE_URL;
    //const client = new MongoClient(uri,{ useUnifiedTopology: true });
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const client = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    db.once('open', () => {
        console.log('Connected to MongoDB');
      });
    // try {
    //     const response = await client.connect();
    //     console.log(response)
    //     await listDatabases(client);
    // } catch (e) {
    //     console.error(e);
    // } finally {
    //     await client.close();
    // }
}

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

main().catch(console.error);



/* ***********************
 * Routes
 *************************/
// Home Route
app.get('/', (req, res) => {
    baseController.home(req, res)
})

// Additional Route
app.get('/self', (req, res) =>{
    baseController.self(req, res)
} )



/* ***********************
 * Server Listener
 *************************/
const port = 3000


app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT || port}`)
})


/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ******************************************
 * Require Statements
 *******************************************/
const express = require('express')
const app = express()
const baseController = require('./controllers/baseController')

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


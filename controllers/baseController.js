const mongoose = require('mongoose');
const connectToDatabase = require('../db/connect');
const Contact = require('../db/models/contact');
const baseController = {}

// baseController.home = (req, res) => {
//     res.send('Amy Rodriguez')
// }

// baseController.self = (req, res) => {
//     res.send('Andre Regino')
// }

baseController.getContacts = async (req, res) => {
    try {
      await connectToDatabase();
      const contacts = await Contact.find({});
      console.log(contacts)
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

baseController.getById = async (req, res) => {
    try {
      await connectToDatabase();
      const contact = await Contact.findById(req.params.id).exec();
      console.log(contact)
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}


module.exports = baseController



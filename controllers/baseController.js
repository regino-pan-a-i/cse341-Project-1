const connectToDatabase = require('../db/connect');
const Contact = require('../db/models/contact');
require('dotenv').config();
/************
 * Testing connections
******/

const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URI
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

/* ******************************************
* continuation of the code
*******************************************/
const baseController = {}

baseController.home = (req, res) => {
    res.send('Amy Rodriguez')
}

baseController.self = (req, res) => {
    res.send('Andre Regino')
}

baseController.getContacts = async (req, res) => {
    try {
      // Connect
      await connectToDatabase();

      // Get all contacts
      const contacts = await Contact.find({});

      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

baseController.getById = async (req, res) => {
    try {
      // Connect
      await connectToDatabase();

      // Get contact by ID
      const contact = await Contact.findById(req.params.id).exec();
   
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

baseController.createContact = async (req, res) => {
  try {
    // Connect
    await connectToDatabase();

    // Create a new contact
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    });
    
    // Save the contact
    const savedContact = await contact.save();
    res.status(201).send(`This is the ID for the new contact: ${savedContact._id}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// baseController.updateContact = async (req, res) => {
//   try {
//     // Find the contact by ID and update it

//     console.log(req.params.contact_id)
//     const updatedContact = await Contact.findOneAndUpdate(
//       { _id: req.params.contact_id  },
//       {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         favoriteColor: req.body.favoriteColor,
//         birthday: req.body.birthday
//       },
//       { new: true } // Return the modified document
//     );
//     if (!updatedContact) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }

//     res.json(updatedContact); // Send the updated contact as response
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }


baseController.updateContact = async (req, res) => {
  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('contacts');

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.contact_id) },
      { $set: 
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          favoriteColor: req.body.favoriteColor,
          birthday: req.body.birthday
        } 
      },
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(result); // Send the updated contact as response
  } catch (error) {
    res.status(400).json({ message: error.message });
  } finally {
    await client.close();
  }
}

// baseController.deleteContact = async (req, res) => {
//   const contact = await Contact.findOne({ _id: req.params.contact_id });
//   if (!contact) {
//     return res.status(404).json({ message: 'Document not found' });
//   }
  
//   try {
//     await contact.remove();
//     return res.json({ message: 'Document deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting document:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

baseController.deleteContact = async (req, res) => {
  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('contacts');

    await collection.deleteOne({ _id: new ObjectId(req.params.contact_id) }); 
    // const result = await client.db('test').collection('contacts').remove({ _id: req.params.contat_id }, true)
    
    // const contact = await collection.findOne({ _id: new ObjectId(req.params.id)});
    // if (!contact) {
    //   throw new Error('Contact not found');
    // }

    // const result = await contact.deleteOne();


    res.status(204).send("Contact deleted successfully");
  } finally {
    await client.close();
  }
}


module.exports = baseController



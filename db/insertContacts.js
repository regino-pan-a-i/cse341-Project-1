const mongoose = require('mongoose');
const connectToDatabase = require('./connect');


const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    favoriteColor: String,
    birthday: Date
});

const Contact = mongoose.model('Contact', contactSchema);


const contactsData = [
    {
      firstName: 'Amy',
      lastName: 'Rodriguez',
      email: 'rod23018@byui.edu',
      favoriteColor: 'green',
      birthday: new Date('2000-01-08')
    },
    {
      firstName: 'Claudia',
      lastName: 'Regino',
      email: 'reginopca@gmail.com',
      favoriteColor: 'purple',
      birthday: new Date('2007-05-08')
    },
    {
      firstName: 'Carlos',
      lastName: 'Regino',
      email: 'reginosjc@gmail.com',
      favoriteColor: 'red',
      birthday: new Date('1971-04-28')
    }
];


    

async function insertContacts() {
  try {
    await connectToDatabase();
    await Contact.insertMany(contactsData);
    console.log('Contacts inserted successfully');
  } catch (error) {
    console.error('Error inserting contacts:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Call the function to insert contacts
insertContacts()
  
const {mongoose} = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/day22';

mongoose.connect(URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
  

const db = mongoose.connection;
 
module.exports = {db};
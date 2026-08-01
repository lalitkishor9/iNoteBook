const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });


const mongooseURI =process.env.DB_URI;
// console.log(mongooseURI);

const connectToMongo = ()=>{

// Connect to MongoDB
mongoose.connect(mongooseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Your application logic here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
}

module.exports = connectToMongo;

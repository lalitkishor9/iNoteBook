const mongoose = require('mongoose');

const mongooseURI = "mongodb://127.0.0.1:27017/mydb";

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
    console.error('Error connecting to MongoDB:', error);
  });
}

module.exports = connectToMongo;
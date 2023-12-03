const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
var cors = require('cors')
const app = express();
const port = 5000

app.use(cors())

//To parse the data coming from post request
app.use(express.json());

//Available Routes
app.get('/', (req, res) => {
  res.send('Hello Lali!')
})

/*
app.use([path,] middlewareFunction);
  the app.use function is used to mount middleware functions at a specified path. 
  Middleware functions are functions that have access to the request object
  (req), the response object (res), and the next function in the application’s request-response cycle. 
Alternate of below one, when we require to use routes  on another file we use app.use(); 
  const route1  = require('./routes/auth');
  app.use('/api/auth', route1);
  const route2  = require('./routes/notes');
  app.use('/api/notes', route1);
*/
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const express = require('express')
const app = express();

const passport = require('./auth');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const db = require('./db');

const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body



app.use(passport.initialize());
const localAuthMiddleware =  passport.authenticate('local',{session:false});

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Import the router files
const menuItemRoutes = require('./routes/menuItemRoutes');
const personRoutes = require('./routes/personRoutes');

// Using the router
app.use('/menu', menuItemRoutes); 
app.use('/person', personRoutes); //Authenticating /person endpoint using middleware

app.listen(PORT,()=>{
  console.log("listening on port 3000");
})
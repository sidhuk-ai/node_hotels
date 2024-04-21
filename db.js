const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL);

const db = mongoose.connection; //now we'll use db object to handle events and interact with database.

db.on('connected',()=>{
    console.log("Connected to MonogDB server successfully.");
})

db.on('error',(err)=>{
    console.log("MongoDB connection error: "+err);
})

db.on('disconnected',()=>{
    console.log("MongoDB Server disconnected successfully");
})

//Export the database connection
module.exports = db;
const mongoose = require('mongoose');

// Creating Person Schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    age:Number,

    work:{
        type:String,
        enum:['manager','chef','waiter'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address: String,
    salary:{
        type:Number,
        required:true
    }

})

// Creating Person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;
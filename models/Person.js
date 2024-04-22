const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

personSchema.pre('save',async function(next){
    const person = this;

    //Hash password only if password field is updated or created new one.
    if(!person.isModified('password')) return next();

    try {
        // hash password generator
        const salt = await bcrypt.genSalt(10); // we can also assing salt directly like const salt = 'something';

        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);
        // stroing hashed password in password field.
        person.password = hashedPassword;

        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

// Creating Person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;
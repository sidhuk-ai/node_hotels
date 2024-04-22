const passport = require('passport');
const localStrategy = require('passport-local').Strategy;//Local strategy => username and password strategy
const Person = require('./models/Person');


passport.use(new localStrategy(async(username,password,done)=>{
    try {
        const user = await Person.findOne({username:username});

        if(!user){
            return done(null,false,{message:'Username not found'});
        }

        const isPasswordMatch = await user.comparePassword(password);

        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'Incorrect password'});
        }
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;
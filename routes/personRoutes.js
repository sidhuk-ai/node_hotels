const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/signup',async (req,res)=>{
    try {
  
      const data = req.body;
  
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
  
      console.log('saved');

      const payload = {
        id: response.id,//It is that _id only
        username: response.username
      }
      const token = generateToken(payload);
      console.log(payload);
      res.status(200).json({response:response,token:token});
    } 
    catch (err) {
      console.log(err);
      res.status(500).json({error:'Internal server error'})
    }
})

//Login Route
router.post('/login',async(req,res)=>{
  try {
    // Extracting username and password from body
    const {username,password} = req.body;

    //Finding user by username
    const user = await Person.findOne({username:username});

    //If user doesn't exist or password is wrong
    if(!user || !( await user.comparePassword(password))){
      return res.status(401).json({error:"Invalid username or password"});
    }

    //Generating token
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = generateToken(payload);
    res.json({token});
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal server error'});
  }
})

router.get('/profile', jwtAuthMiddleware, async (req,res) => {
  try {
    const userData = req.user;

    const user = await Person.findById(userData.id)
    res.status(200).json({user});
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal server error'});
  }
})
  
router.get('/',jwtAuthMiddleware, async (req,res)=>{
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/:workType', async(req,res)=>{
    try {
      const workType = req.params.workType;
  
      if(workType=='chef' || workType=='manager'|| workType=='waiter'){
        
        const response = await Person.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response);
  
      }else{
        res.status(404).json({error:'Invalid work type'});
      }
    } catch (error) {
      console.log('error'+error);
      res.status(500).json({error:'Internal server error'});
    }
})

router.put('/:id', async(req,res)=>{
  try {
    const personId = req.params.id; // Yeh _id extract karega jo bhi hamne url mei diya hai
    const updatePersonData = req.body; // body mei user jo bhi data dega woh updatedPersonData mei daal dega

    const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
      new:true, //updated document ko return kar deti hai
      runValidators:true // mongoose ke validations ko check karti hai joh hamne schema mei diya tha
    })

    if(!response){
      res.status(404).json({error:'User not found'});
    }

    console.log('data updated');
    res.status(200).json(response);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'});
  }
})

router.delete('/:id', async(req,res)=>{
  try {
    const personId = req.params.id;
  
    const response = await Person.findByIdAndDelete(personId);
  
    if(!response){
      res.status(404).json({error:'User not found'})
    }
  
    console.log('Data deleted');
    res.status(200).json({message:'User deleted from Database'});
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'});
  }
})

module.exports = router;
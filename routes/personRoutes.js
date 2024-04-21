const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/',async (req,res)=>{
    try {
  
      const data = req.body;
  
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
  
      console.log('saved');
      res.status(200).json(response);
    } 
    catch (err) {
      console.log(err);
      res.status(500).json({error:'Internal server error'})
    }
})
  
router.get('/', async (req,res)=>{
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
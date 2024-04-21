const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/',async (req,res)=>{
    try {
  
      const data = req.body;
  
      const newMenuItem = new MenuItem(data);
  
      const response = await newMenuItem.save();
  
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
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/:tasteType',async(req,res)=>{
  try {
    const tasteType = req.params.tasteType;
    if(tasteType=='sour' || tasteType=='sweet' || tasteType=='spicy'){
      const data = await MenuItem.find({taste:tasteType});
      console.log('data fetched');
      res.status(200).json(data);
    }else{
      res.status(404).json({error:'Page not found'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'})
  }
})

router.put('/:id', async(req,res)=>{
  try {
    const itemId = req.params.id;
  
    const updatedField = req.body;
  
    const response = await MenuItem.findByIdAndUpdate(itemId,updatedField,{
      new:true,
      runValidators:true
    })

    if(!response){
      res.status(404).json({error:'User not found'});
    }

    console.log('Data updated');
    res.status(200).json(response);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'})
  }
})

router.delete('/:id', async(req,res)=>{
  try {
    const itemId = req.params.id;
  
    const response = await MenuItem.findByIdAndDelete(itemId);
  
    if(!response){
      res.status(404).json({error:'User not found'});
    }
  
    console.log('Data deleted');
    res.status(200).json({message:"Item Deleted successfully"});
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'});
  }
})

module.exports = router;
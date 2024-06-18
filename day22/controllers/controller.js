const express = require('express');

const userModel = require('../model/model.js');

const router = express.Router();

router.get('/', async(req,res) =>{
    try{
        const data = await userModel.find();
        res.send(data);
    }catch(error){
        console.log(error)
    }
    
})
router.get('/:_id', async(req,res) =>{
    try{
        const {_id} = req.params;

        const data = await userModel.findById(_id);
        res.send(data);
    }catch(error){
        console.log(error)
    }
    
})
router.put('/:_id', async(req,res) =>{
    try{
        const {_id} = req.params;
        const {name,job,salary} = req.body;
        const data = await userModel.findByIdAndUpdate(_id,{name,job,salary},{new:true});
        res.send(data);
    }catch(error){
        console.log(error)
    }
    
})


router.post('/user', async(req,res) =>{
try{    
    const {name,job,salary} = req.body;
    const newNote = new userModel({ name, job,salary });
    const savedNote = await newNote.save();
    console.log(savedNote);
    res.send(savedNote);
    }
    catch(error){
        console.log(error)
    }
})

router.delete('/:_id',async(req,res)=>{
    try{
        
        const {_id} = req.params;
        const deletedUser = await userModel.findByIdAndDelete(_id);

        if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        // res.json({message:"deleted successfully"})
        res.send(`database named as ${deletedUser.name} is deleted successfully`)
       

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
})


module.exports = router;
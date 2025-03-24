const express = require('express')
const app = express()

app.use(express.json())

const mongoose = require('mongoose')

const user = require('./schema')

require('dotenv').config()

port = process.env.Port

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database connected successfully..!")
})
.catch((err)=>{
    console.log(err)
})

app.get('/', (req,res)=>{
    res.send("Hey user..!")
})



app.get('/user', async(req,res)=>{
    try{
        const data = await user.find()
        res.status(200).json({
            msg : 'User details',
            data : data,
            success : true
        })
    }

    catch(err){
        res.status(500).json({
            msg : 'Internal server error',
            err,
            success : false
        })
    }
})


app.get('/user/:id', async(req,res)=>{
    try{
        const id = req.params.id
        if(!id){
            return res.status(400).json({msg : "Validation failed"})
        }
        const data = await user.findById()
        res.status(200).json({
            msg : 'User details',
            data : data,
            success : true
        })
    }

    catch(err){
        res.status(500).json({
            msg : 'Internal server error',
            err,
            success : false
        })
    }
})


app.post('/user', async(req,res)=>{
    try{
        const {user,date,duration,exercises}= req.body
        const NewData = new user({user,date,duration,exercises})
        if(!user || !date || !duration || !exercises){
            return res.status(404).json({msg : "Not found"})
        }
        
        await NewData.save()
        res.status(201).json({
            msg : 'New user details added successfully',
            data : NewData,
            success : true
        })
    }
    
    catch(err){
        res.status(500).json({
            msg : 'Internal server error',
            err,
            success : false
        })
    }
})



app.put('/user/:id', async(req,res)=>{
    try{
        const id = req.params.id
        if(!id){
            return res.status(400).json({msg : "Validation failed"})
        }

        const {user,date,duration,exercises}= req.body
        if(!user || !date || !duration || !exercises){
            return res.status(404).json({msg : "Not found"})
        }

        const updatedData = await user.findByIdAndUpdate(
            id,
            {user,date,duration,exercises},
            {new : true}
        )
        res.status(200).json({
            msg : 'Updated details successfully',
            data : updatedData,
            success : true
        })
    }

    catch(err){
        res.status(500).json({
            msg : 'Internal server error',
            err,
            success : false
        })
    }
})

app.delete('/user/:id', async(req,res)=>{

    try{
        const id = req.params.id
        if(!id){
            return res.status(400).json({msg : "Validation failed"})
        }
        const deleteData = await user.findByIdAndDelete(id)
        res.status(200).json({
            msg : 'Deleted details successfully',
            data : deleteData,
            success : true
        })
    }

    catch(err){
        res.status(500).json({
            msg : 'Internal server error',
            err,
            success : false
        })
    }
})


app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})
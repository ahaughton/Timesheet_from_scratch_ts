import { isValidObjectId,Mongoose,ObjectId } from "mongoose";
import { userInfo } from "os";

const router = require('express').Router();
const Task = require ('../model/task');
const _ = require('lodash');
const mon = require("mongoose");
//const Taskdetails = require('../model/Task');
// check out : https://www.freecodecamp.org/news/mongoose101/
// https://www.youtube.com/watch?v=2jqok-WgelI

router.post('/addproject', async(req,res) => {
    const task = new Task({
        projectname: req.body.projectname,
        projectowner: req.body.projectowner,
        projectdescription : req.body.projectdescription,
        activities:[{ 
            jobdescription: req.body.activities.jobdescription,
            user_name: req.body.activities.user_name,
            jobcategory: req.body.activities.jobcategory,
            timestart: req.body.activities.timestart, 
            timestop: req.body.activities.timestop, 
            comments: req.body.activities.comments
        }]
           
      //  req.body.activity,

    });
    try { const savetask = await task.save();
        res.send(savetask); 
    } catch (err){
        res.status(400).send(err);
    }

   });

   router.post('/addactivity', async(req,res) => {
    //const activiti = task.activities; 
    const task = await Task.findOne({projectname: req.body.projectname})
        task.activities.push({
            jobdescription: req.body.activities.jobdescription,
            user_name: req.body.activities.user_name,
            jobcategory: req.body.activities.jobcategory,
            timestart: req.body.activities.timestart, 
            timestop: req.body.activities.timestop, 
            comments: req.body.activities.comments
        })      
      //  req.body.activity,
    try { const savedactivity = await task.save();
        res.send(savedactivity); 
    } catch (err){
        res.status(400).send(err); 
    }
   });

  
   router.patch('/updateactivity', async(req,res) => {
    //const task = 
    //try {
    await Task.findOneAndUpdate({projectname: req.body.projectname,
    "activities._id": req.body._id},{"$set":{
       "activities.$": req.body.activities }
        // "activities.$.jobdescription" : req.body.activities.jobdescription,
        // "activities.$.user_name": req.body.activities.user_name, 
        // "activities.$.jobcategory": req.body.activities.jobcategory,
        // "activities.$.timestart": req.body.activities.timestart, 
        // "activities.$.timestop": req.body.activities.timestop, 
        // "activities.$.comments": req.body.activities.comments
    },{new:false, useFindAndModify:false}, function (err,result){
      if (err){res.send(err);} else {res.send(result);}
     
    //  try { const savedactivity = await task.save();
    //     res.send(savedactivity); 
     })
     //catch (err){
     //  res.status(400).send(err);
    // }
    }
     
   );

   router.patch('/updateactivity_v2', async(req:any,res:any) => {
    try {
    const task = await Task.findOne({projectname: req.body.projectname,
    /*"activities._id": req.body._id*/},{useFindAndModify:false});
    console.log (task);
    console.log (req.body._id);
    //let myindex = _.findIndex(task.activities,{"jobdescription": "Donef5-----5656565-"}); lodash 
    let acti = task.activities.id(req.body._id)
    
    if (req.body.activities.jobdescription){
        acti.jobdescription = req.body.activities.jobdescription;
    }

    if (req.body.activities.user_name){ 
        acti.user_name = req.body.activities.user_name;
    }

    if (req.body.activities.jobcategory){
        acti.jobcategory = req.body.activities.jobcategory;
    }
    
    if (req.body.activities.timestart)
        acti.timestart = req.body.activities.timestart;

    if (req.body.activities.timestop) 
        acti.timestop =req.body.activities.timestop;

     if(req.body.activities.comments)
        acti.comments = req.body.activities.comments;
    
 
    const mytask = await task.save();
    res.send(mytask);
    }catch (err) {
      //  res.status(404)
        res.send (err)
    }
   });

router.get('/getall', async(req,res) => {
try{ 
   const task = await Task.find();
   res.json(task);
   }
catch(err){
    res.json({message:err});
   }

});

// Get Back Specific post 
router.get('/:projectname', async(req,res) => {
    try{
    const task = await Task.findOne({projectname: req.params.projectname});
    res.json(task);
    }catch (err)
    { res.json({message:err})
}
});

module.exports = router; 
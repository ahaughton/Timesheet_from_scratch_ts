 const task = require ('../model/task');
 const User = require ('../model/user');
 const bcript = require ('bcryptjs');
 const jwt = require ('jsonwebtoken');

 
import { ApolloError } from "apollo-server-express";
import { constants } from "crypto";
import mongoose from "mongoose"; 
 //import { activity } from '../model/task'
export const resolvers = {
Query: {
    //hello:() => { return "hello World Markus"},
    //Tasks: () => {task.find();console.log('resolving activity for task',task)}
    Tasks: async() => await task.find(),
    Taskbyid: async(_root,{id}) => await task.findById(id),
    Taskbyprojectname: async(_root,{projectname}) => await task.find({projectname}), 
    
}, 

Mutation:{
    createTaskGQ: async(_root,{projectname,
                          projectowner, 
                          projectdescription,
                          input
                        }) =>{
    const newtask = new task({projectname,
                    projectowner,
                    projectdescription,
                    input})                        
    await newtask.save()
    console.log(projectname, projectowner, input)
                },

createTaskandactivityGQ: async(_root,{input}) =>
    {
        console.log(input)
    try{    const newtask = new task({
             projectname:input.projectname,
             projectowner: input.projectowner,
             projectdescription: input.projectdescription,
             activities:[{jobdescription : input.activities.jobdescription,
                         user_name: input.activities.username,
                         jobcategory: input.activities.jobcategory,
                         timestart: input.activities.timestart,
                         timestop: input.activities.timestop,
                         comments: input.activities.comments}]
            })        
            console.log(input.activities.jobdescription)                
            await newtask.save()
    }       
    catch(err){console.log(err)}
console.log(input)
    },

addActivitiesGQ: async(_,{projectid,input}) => {
    // const newactivity = new activity({})

    //console.log("This is ", input.projectid)
    try{ const newtask = await task.findById(projectid)
        newtask.activities.push({
            jobdescription: input.jobdescription,
            user_name: input.user_name,
            jobcategory: input.jobcategory,
            timestart: input.timestart, 
            timestop: input.timestop, 
            comments: input.comments
        }) 
        await newtask.save();
         
    }     
     
    catch(err){console.log(err)}
    console.log(input)
    }, 

updateTaskHeaderGQ : async (_,{taskid,input})=>{
    try{ const newtask = await task.findByIdAndUpdate(taskid,{projectname:input.projectname,
    projectowner:input.projectowner,
    projectdescription:input.projectdescription }
    )
     console.log(input);  
    }
    catch(err){console.log(err)}
    console.log(taskid)

    },
deleteTaskGQ: async (_,{taskid})=>{
    try{ const newtask = await task.findByIdAndDelete(taskid)
     console.log(taskid);  
    }
    catch(err){console.log(err)}
    console.log(taskid)

    },

updateAcitivityGQ: async(_,{taskid,activityid,input}) =>
{
    //https://attacomsian.com/blog/mongoose-subdocuments
    console.log(activityid)
    console.log(taskid)
    try{ const mytask = await task.findById(taskid)
        mytask.activities.id(activityid).jobdescription = input.jobdescription
        mytask.activities.id(activityid).username = input.username
        mytask.activities.id(activityid).jobcategory = input.jobcategory
        mytask.activities.id(activityid).timestart = input.timestart
        mytask.activities.id(activityid).timestop = input.timestop
        mytask.activities.id(activityid).comments = input.comments
        const updated = await mytask.save() 
        }
        catch(err){console.log(err)}
},  

deleteAcitivityGQ: async(_,{taskid,activityid}) =>
{
    //https://attacomsian.com/blog/mongoose-subdocuments
    try{ const mytask = await task.findById(taskid)
        mytask.activities.id(activityid).remove()
                const updated = await mytask.save() 
        }
        catch(err){console.log(err)}

},
// task: {
//     activities: (task) => {
//         console.log('resolving activity for task',task)
//         return { activity
//             // jobdescription: 'none',
//             // user_name:'Fake Name',
//         };
//     },
// },
     
Registeruser: async(_,{input}) =>
{
  try { const olduser =  await User.findOne({username: input.username})
  // Throw error if error does not exist
  if (olduser){
    throw new ApolloError('This username already exist ' + input.username, 'USER_ALREADY_EXIST')
  }
  console.log("user not in database", input.password)
  // encript password 
  const encriptedpassword = await bcript.hash(input.password,10)
  console.log ("password encripted ", encriptedpassword)
  // build out mongoose model 
  const newuser = new User({
    firstname:input.firstname,
    lastname:input.lastname,
    username:input.username,
    password:encriptedpassword
  })
  
  //create jsonwebtoken (JWT)
  const token = jwt.sign(
    {user_id: newuser._id, email: newuser.username},
    "MOVE_ME_TO_ENV",
    {
        expiresIn: "2h"
    }
  );
  newuser.token = token 
  console.log ("token created ", token)
  // save user in mongodb 
 const doc = await newuser.save()
 return {id: doc.id, ...doc.doc }
}
catch(err){console.log(err)}
}
},
}
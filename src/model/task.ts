import { timeStamp } from "console";

//const mongoose = require ('mongoose'); 
import * as mongoose from 'mongoose';
const taskdetailsschema = new mongoose.Schema({
/*descid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto:true
    },*/
jobdescription:{
    type:String
}, 
user_name:{
    type:String
},
jobcategory:{
    type:String 
},
timestart:{
    type:Date 
},
timestop:{
    type:Date
},
comments:{
    type: String
}
});

const taskschema = new mongoose.Schema({
   /* id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto:true, 
    }, */
    projectname:{
        type: String,
        required: true, 
        unique:true
    },
    projectowner:{
        type: String
    }, 
    projectdescription:{ 
        type: String 
    },
    activities:[taskdetailsschema]
});


module.exports = mongoose.model('Task', taskschema)
//module.exports = mongoose.model('activity', taskdetailsschema)



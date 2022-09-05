"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//const mongoose = require ('mongoose'); 
var mongoose = __importStar(require("mongoose"));
var taskdetailsschema = new mongoose.Schema({
    /*descid:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto:true
        },*/
    jobdescription: {
        type: String
    },
    user_name: {
        type: String
    },
    jobcategory: {
        type: String
    },
    timestart: {
        type: Date
    },
    timestop: {
        type: Date
    },
    comments: {
        type: String
    }
});
var taskschema = new mongoose.Schema({
    /* id:{
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         auto:true,
     }, */
    projectname: {
        type: String,
        required: true,
        unique: true
    },
    projectowner: {
        type: String
    },
    projectdescription: {
        type: String
    },
    activities: [taskdetailsschema]
});
module.exports = mongoose.model('Task', taskschema);
//module.exports = mongoose.model('activity', taskdetailsschema)

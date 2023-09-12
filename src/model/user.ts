import * as mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    email:{type:String, unique:true}, 
    firstname: {type:String},
    lastname: {type:String},
    password:{type:String},
    token:{type:String },
    active:{type:Boolean},
    roles:[{type:String}], 
    permissions:[{type:String}],
});

module.exports = mongoose.model('User', userschema)
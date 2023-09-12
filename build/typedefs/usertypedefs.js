"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usertypedefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
//https://www.youtube.com/watch?v=htB2uJCf4ws&t=340s
exports.usertypedefs = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\ntype Query{\n    Userbyemail(email:String): User\n  # Loginuser (email:string,password:string) User\n}\ntype Mutation {\n    Registeruser(input: userInputGQ): User\n    Loginuser (email:String,password:String): User\n}\n\ntype User{\n    _id:ID\n    email:String \n    firstname: String\n    lastname: String\n    password:String\n    token:String \n    active:Boolean\n    roles:[String] \n    permissions:[String]\n}\n\ninput userInputGQ\n{\n  firstname:String\n  lastname:String\n  email:String\n  password:String\n  token:String\n  active: Boolean\n  roles:[String]\n  permission:[String]\n}\n"], ["\ntype Query{\n    Userbyemail(email:String): User\n  # Loginuser (email:string,password:string) User\n}\ntype Mutation {\n    Registeruser(input: userInputGQ): User\n    Loginuser (email:String,password:String): User\n}\n\ntype User{\n    _id:ID\n    email:String \n    firstname: String\n    lastname: String\n    password:String\n    token:String \n    active:Boolean\n    roles:[String] \n    permissions:[String]\n}\n\ninput userInputGQ\n{\n  firstname:String\n  lastname:String\n  email:String\n  password:String\n  token:String\n  active: Boolean\n  roles:[String]\n  permission:[String]\n}\n"])));
var templateObject_1;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var task = require('../model/task');
var User = require('../model/user');
var bcript = require('bcryptjs');
var jwt = require('jsonwebtoken');
var apollo_server_express_1 = require("apollo-server-express");
//import { activity } from '../model/task'
exports.resolvers = {
    Query: {
        //hello:() => { return "hello World Markus"},
        //Tasks: () => {task.find();console.log('resolving activity for task',task)}
        Tasks: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, task.find()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); },
        Taskbyid: function (_root, _a) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, task.findById(id)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            }); });
        },
        Taskbyprojectname: function (_root, _a) {
            var projectname = _a.projectname;
            return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, task.find({ projectname: projectname })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            }); });
        },
    },
    Mutation: {
        createTaskGQ: function (_root, _a) {
            var projectname = _a.projectname, projectowner = _a.projectowner, projectdescription = _a.projectdescription, input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var newtask;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            newtask = new task({ projectname: projectname,
                                projectowner: projectowner,
                                projectdescription: projectdescription,
                                input: input });
                            return [4 /*yield*/, newtask.save()];
                        case 1:
                            _b.sent();
                            console.log(projectname, projectowner, input);
                            return [2 /*return*/];
                    }
                });
            });
        },
        createTaskandactivityGQ: function (_root, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var newtask, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log(input);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            newtask = new task({
                                projectname: input.projectname,
                                projectowner: input.projectowner,
                                projectdescription: input.projectdescription,
                                activities: [{ jobdescription: input.activities.jobdescription,
                                        user_name: input.activities.username,
                                        jobcategory: input.activities.jobcategory,
                                        timestart: input.activities.timestart,
                                        timestop: input.activities.timestop,
                                        comments: input.activities.comments }]
                            });
                            console.log(input.activities.jobdescription);
                            return [4 /*yield*/, newtask.save()];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _b.sent();
                            console.log(err_1);
                            return [3 /*break*/, 4];
                        case 4:
                            console.log(input);
                            return [2 /*return*/];
                    }
                });
            });
        },
        addActivitiesGQ: function (_, _a) {
            var projectid = _a.projectid, input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var newtask, err_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, task.findById(projectid)];
                        case 1:
                            newtask = _b.sent();
                            newtask.activities.push({
                                jobdescription: input.jobdescription,
                                user_name: input.user_name,
                                jobcategory: input.jobcategory,
                                timestart: input.timestart,
                                timestop: input.timestop,
                                comments: input.comments
                            });
                            return [4 /*yield*/, newtask.save()];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _b.sent();
                            console.log(err_2);
                            return [3 /*break*/, 4];
                        case 4:
                            console.log(input);
                            return [2 /*return*/];
                    }
                });
            });
        },
        updateTaskHeaderGQ: function (_, _a) {
            var taskid = _a.taskid, input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var newtask, err_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, task.findByIdAndUpdate(taskid, { projectname: input.projectname,
                                    projectowner: input.projectowner,
                                    projectdescription: input.projectdescription })];
                        case 1:
                            newtask = _b.sent();
                            console.log(input);
                            return [3 /*break*/, 3];
                        case 2:
                            err_3 = _b.sent();
                            console.log(err_3);
                            return [3 /*break*/, 3];
                        case 3:
                            console.log(taskid);
                            return [2 /*return*/];
                    }
                });
            });
        },
        deleteTaskGQ: function (_, _a) {
            var taskid = _a.taskid;
            return __awaiter(void 0, void 0, void 0, function () {
                var newtask, err_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, task.findByIdAndDelete(taskid)];
                        case 1:
                            newtask = _b.sent();
                            console.log(taskid);
                            return [3 /*break*/, 3];
                        case 2:
                            err_4 = _b.sent();
                            console.log(err_4);
                            return [3 /*break*/, 3];
                        case 3:
                            console.log(taskid);
                            return [2 /*return*/];
                    }
                });
            });
        },
        updateAcitivityGQ: function (_, _a) {
            var taskid = _a.taskid, activityid = _a.activityid, input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var mytask, updated, err_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            //https://attacomsian.com/blog/mongoose-subdocuments
                            console.log(activityid);
                            console.log(taskid);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, task.findById(taskid)];
                        case 2:
                            mytask = _b.sent();
                            mytask.activities.id(activityid).jobdescription = input.jobdescription;
                            mytask.activities.id(activityid).username = input.username;
                            mytask.activities.id(activityid).jobcategory = input.jobcategory;
                            mytask.activities.id(activityid).timestart = input.timestart;
                            mytask.activities.id(activityid).timestop = input.timestop;
                            mytask.activities.id(activityid).comments = input.comments;
                            return [4 /*yield*/, mytask.save()];
                        case 3:
                            updated = _b.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            err_5 = _b.sent();
                            console.log(err_5);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        deleteAcitivityGQ: function (_, _a) {
            var taskid = _a.taskid, activityid = _a.activityid;
            return __awaiter(void 0, void 0, void 0, function () {
                var mytask, updated, err_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, task.findById(taskid)];
                        case 1:
                            mytask = _b.sent();
                            mytask.activities.id(activityid).remove();
                            return [4 /*yield*/, mytask.save()];
                        case 2:
                            updated = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_6 = _b.sent();
                            console.log(err_6);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
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
        Registeruser: function (_, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var olduser, encriptedpassword, newuser, token, doc, err_7;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, User.findOne({ username: input.username })
                                // Throw error if error does not exist
                            ];
                        case 1:
                            olduser = _b.sent();
                            // Throw error if error does not exist
                            if (olduser) {
                                throw new apollo_server_express_1.ApolloError('This username already exist ' + input.username, 'USER_ALREADY_EXIST');
                            }
                            console.log("user not in database", input.password);
                            return [4 /*yield*/, bcript.hash(input.password, 10)];
                        case 2:
                            encriptedpassword = _b.sent();
                            console.log("password encripted ", encriptedpassword);
                            newuser = new User({
                                firstname: input.firstname,
                                lastname: input.lastname,
                                username: input.username,
                                password: encriptedpassword
                            });
                            token = jwt.sign({ user_id: newuser._id, email: newuser.username }, "MOVE_ME_TO_ENV", {
                                expiresIn: "2h"
                            });
                            newuser.token = token;
                            console.log("token created ", token);
                            return [4 /*yield*/, newuser.save()];
                        case 3:
                            doc = _b.sent();
                            return [2 /*return*/, __assign({ id: doc.id }, doc.doc)];
                        case 4:
                            err_7 = _b.sent();
                            console.log(err_7);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
    },
};

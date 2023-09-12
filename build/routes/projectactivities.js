"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var router = require('express').Router();
var Task = require('../model/task');
var _ = require('lodash');
var mon = require("mongoose");
//const Taskdetails = require('../model/Task');
// check out : https://www.freecodecamp.org/news/mongoose101/
// https://www.youtube.com/watch?v=2jqok-WgelI
router.post('/addproject', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var task, savetask, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                task = new Task({
                    projectname: req.body.projectname,
                    projectowner: req.body.projectowner,
                    projectdescription: req.body.projectdescription,
                    activities: [{
                            jobdescription: req.body.activities.jobdescription,
                            user_name: req.body.activities.user_name,
                            jobcategory: req.body.activities.jobcategory,
                            timestart: req.body.activities.timestart,
                            timestop: req.body.activities.timestop,
                            comments: req.body.activities.comments
                        }]
                    //  req.body.activity,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, task.save()];
            case 2:
                savetask = _a.sent();
                res.send(savetask);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400).send(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/addactivity', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var task, savedactivity, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Task.findOne({ projectname: req.body.projectname })];
            case 1:
                task = _a.sent();
                task.activities.push({
                    jobdescription: req.body.activities.jobdescription,
                    user_name: req.body.activities.user_name,
                    jobcategory: req.body.activities.jobcategory,
                    timestart: req.body.activities.timestart,
                    timestop: req.body.activities.timestop,
                    comments: req.body.activities.comments
                });
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, task.save()];
            case 3:
                savedactivity = _a.sent();
                res.send(savedactivity);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                res.status(400).send(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.patch('/updateactivity', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //const task = 
            //try {
            return [4 /*yield*/, Task.findOneAndUpdate({ projectname: req.body.projectname,
                    "activities._id": req.body._id }, { "$set": {
                        "activities.$": req.body.activities
                    }
                    // "activities.$.jobdescription" : req.body.activities.jobdescription,
                    // "activities.$.user_name": req.body.activities.user_name, 
                    // "activities.$.jobcategory": req.body.activities.jobcategory,
                    // "activities.$.timestart": req.body.activities.timestart, 
                    // "activities.$.timestop": req.body.activities.timestop, 
                    // "activities.$.comments": req.body.activities.comments
                }, { new: false, useFindAndModify: false }, function (err, result) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send(result);
                    }
                    //  try { const savedactivity = await task.save();
                    //     res.send(savedactivity); 
                })
                //catch (err){
                //  res.status(400).send(err);
                // }
            ];
            case 1:
                //const task = 
                //try {
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.patch('/updateactivity_v2', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var task, acti, mytask, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Task.findOne({ projectname: req.body.projectname,
                        /*"activities._id": req.body._id*/ 
                    }, { useFindAndModify: false })];
            case 1:
                task = _a.sent();
                console.log(task);
                console.log(req.body._id);
                acti = task.activities.id(req.body._id);
                if (req.body.activities.jobdescription) {
                    acti.jobdescription = req.body.activities.jobdescription;
                }
                if (req.body.activities.user_name) {
                    acti.user_name = req.body.activities.user_name;
                }
                if (req.body.activities.jobcategory) {
                    acti.jobcategory = req.body.activities.jobcategory;
                }
                if (req.body.activities.timestart)
                    acti.timestart = req.body.activities.timestart;
                if (req.body.activities.timestop)
                    acti.timestop = req.body.activities.timestop;
                if (req.body.activities.comments)
                    acti.comments = req.body.activities.comments;
                return [4 /*yield*/, task.save()];
            case 2:
                mytask = _a.sent();
                res.send(mytask);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                //  res.status(404)
                res.send(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/getall', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var task, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Task.find()];
            case 1:
                task = _a.sent();
                res.json(task);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.json({ message: err_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get Back Specific post 
router.get('/:projectname', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var task, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Task.findOne({ projectname: req.params.projectname })];
            case 1:
                task = _a.sent();
                res.json(task);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.json({ message: err_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;

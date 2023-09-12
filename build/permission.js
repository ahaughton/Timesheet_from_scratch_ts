"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getdatafromtoken = exports.permission = void 0;
var graphql_shield_1 = require("graphql-shield");
var jwt = require('jsonwebtoken');
function getdatafromtoken(reqi) {
    //console.log (reqi)
    var jwtverify, myerror;
    jwt.verify(reqi.headers.token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            console.log(err);
            myerror = (err);
        }
        jwtverify = decoded;
    });
    //console.log(jwtverify)
    //console.log('testing')
    return jwtverify;
}
exports.getdatafromtoken = getdatafromtoken;
;
function checkPermission(user, permission) {
    if (user) {
        return user.permissions.includes(permission);
    }
    return false;
}
var isAuthenticated = (0, graphql_shield_1.rule)()(function (parent, args, context /*, user */, info) {
    console.log(context.user);
    console.log("this is the user from token");
    var jwtverify, myerror;
    jwt.verify(context.token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            console.log(err);
            myerror = (err);
        }
        jwtverify = decoded;
    });
    console.log(jwtverify);
    console.log(jwtverify != null);
    return jwtverify != null ? true : myerror;
});
var canReadAnyUser = (0, graphql_shield_1.rule)()(function (parent, args, _a) {
    var user = _a.user;
    console.log("This is the user ========");
    console.log(user);
    return checkPermission(user, "read:any_user");
});
var canReadOwnUser = (0, graphql_shield_1.rule)()(function (parent, args, _a) {
    var user = _a.user;
    return checkPermission(user, "read:own_user");
});
var isReadingOwnUser = (0, graphql_shield_1.rule)()(function (parent, _a, _b) {
    var id = _a.id;
    var user = _b.user;
    return user && user.sub === id;
});
var permission = (0, graphql_shield_1.shield)({
    Query: {
        //user: or(and(canReadOwnUser, isReadingOwnUser), canReadAnyUser),
        //viewer: isAuthenticated
        Taskbyid: isAuthenticated,
        //Tasks : and(isAuthenticated, canReadAnyUser) 
    },
    Mutation: {}
});
exports.permission = permission;

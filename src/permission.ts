import { and, or, rule, shield } from "graphql-shield";
const jwt = require ('jsonwebtoken');

function getdatafromtoken(reqi:any)
{
  //console.log (reqi)
  var jwtverify , myerror   
  jwt.verify(reqi.headers.token,process.env.JWT_SECRET,function(err,decoded){
    if (err){ console.log (err); myerror = (err)}
    jwtverify = decoded
  })
  //console.log(jwtverify)
  //console.log('testing')
  return jwtverify 
};

function checkPermission(user, permission) {
  if (user) {
    return user.permissions.includes(
      permission
    );
  }
  return false; 
}
const isAuthenticated = rule()((parent, args, context /*, user */,info) => {
  console.log (context.user)
  console.log ("this is the user from token")
  var jwtverify , myerror   
  jwt.verify(context.token,process.env.JWT_SECRET,function(err,decoded){
    if (err){ console.log (err); myerror = (err)}
    jwtverify = decoded
  })
  console.log(jwtverify)
  console.log(jwtverify != null)
  return jwtverify != null ? true : myerror
});


const canReadAnyUser = rule()((parent, args, { user }) => {
  console.log("This is the user ========")
  console.log (user)
  return checkPermission(user, "read:any_user");
});

const canReadOwnUser = rule()((parent, args, { user }) => {
  return checkPermission(user, "read:own_user");
});

const isReadingOwnUser = rule()((parent, { id }, { user }) => {
  return user && user.sub === id;
});

const permission = shield({
  Query: {
    //user: or(and(canReadOwnUser, isReadingOwnUser), canReadAnyUser),
    //viewer: isAuthenticated
    Taskbyid : isAuthenticated,
    //Tasks : and(isAuthenticated, canReadAnyUser) 
    },
  Mutation: { }
});

export {permission, getdatafromtoken}
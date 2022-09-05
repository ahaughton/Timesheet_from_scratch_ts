import {gql} from 'apollo-server-express';

const {
    GraphQLDate,
    GraphQLDateTime,
    GraphQLTime
  } = require("graphql-scalars");

export const typedefs = gql`
# type Query {
#     hello: String
# }
scalar Date
scalar Time
scalar DateTime

type Query{
    Tasks: [task!]
    Taskbyid(id:ID): task
    Taskbyprojectname(projectname:String): [task]

   # Userbyemail(email:string): User
}

type Mutation {
    createTaskGQ (projectname:String, 
                  projectowner:String, 
                  projectdescription:String,
                  input:activityInputGQ
                ):task 
}
type Mutation {
    createTaskandactivityGQ (input:taskinputGQ):task,
    addActivitiesGQ (projectid: String,input:activityInputGQ):activity
    updateTaskHeaderGQ (taskid: ID, input:taskinputGQ):task
    deleteTaskGQ(taskid:ID):task
    updateAcitivityGQ(taskid:ID, activityid: ID, input: activityInputGQ):activity
    deleteAcitivityGQ(taskid:ID, activityid: ID):activity

    #registeruser(input: userInputGQ): User
}

type task
{   
    id: ID
    projectname: String
    projectowner: String
    projectdescription: String 
    activities: [activity]
  
}

type activity{
    jobdescription: String
    user_name: String
    jobcategory: String 
    timestart: DateTime
    timestop: DateTime
    comments: String       
}

input taskinputGQ 
{
    projectname: String
    projectowner: String
    projectdescription: String
    activities: activityInputGQ
}
input activityInputGQ
{
     
    jobdescription: String
    user_name: String
    jobcategory: String 
    timestart: DateTime
    timestop: DateTime
    comments: String 
}


`;

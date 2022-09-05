import {gql} from 'apollo-server-express';

export const usertypedefs = gql`
type Query{
    Userbyemail(email:String): User
}
type Mutation {
    Registeruser(input: userInputGQ): User
}

type User{
    _id:ID
    username:String 
    firstname: String
    lastname: String
    password:String
    token:String 
    active:Boolean
    roles:[String] 
    permissions:[String]
}

input userInputGQ
{
  firstname:String
  lastname:String
  username:String
  password:String
  token:String
  roles:[String]
  permission:[String]
}
`
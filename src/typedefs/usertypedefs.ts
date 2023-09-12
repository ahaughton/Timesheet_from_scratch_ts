import {gql} from 'apollo-server-express';
//https://www.youtube.com/watch?v=htB2uJCf4ws&t=340s
export const usertypedefs = gql`
type Query{
    Userbyemail(email:String): User
  # Loginuser (email:string,password:string) User
}
type Mutation {
    Registeruser(input: userInputGQ): User
    Loginuser (email:String,password:String): User
}

type User{
    _id:ID
    email:String 
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
  email:String
  password:String
  token:String
  active: Boolean
  roles:[String]
  permission:[String]
}
`
import { Response } from "express";

import {ApolloServer, gql} from 'apollo-server-express';
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
import {typedefs} from './mygraphql/typedefs'
import {resolvers} from './mygraphql/resolvers'
import {usertypedefs} from './typedefs/usertypedefs'

//const app = express();
dotenv.config();

const projectRoute = require('./routes/projectactivities');

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true},{ useFindAndModify: false },
() => console.log (' connected to db!') );



async function startServer(){ 
    const app = express()
    const apolloServer = new ApolloServer({
    typeDefs: [typedefs,usertypedefs],
    resolvers: resolvers,    
    });
    await apolloServer.start()
    apolloServer.applyMiddleware({app, path:'/graphql' }); 

app.use(express.json());

app.use('/',projectRoute);

app.use ((req,res) => { res.send("hello world")})

app.listen (3000, () => console.log('Server is up and running'));
}
startServer();
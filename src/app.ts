//import { makeExecutableSchema } from 'graphql';
//import { makeExecutableSchema } from 'graphql';
import { Response } from "express";

//import {ApolloServer, gql} from 'apollo-server-express';

import { applyMiddleware } from "graphql-middleware";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
import {typeDefs} from './mygraphql/typedefs'
import {resolvers} from './mygraphql/resolvers'
import {usertypedefs} from './typedefs/usertypedefs'
import { json } from 'body-parser';
import {permission,getdatafromtoken} from "./permission";
import http from 'http';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema} from '@graphql-tools/schema'
const jwt = require ('jsonwebtoken');

interface MyContext {
    token?: String;
  }

//const app = express();
dotenv.config();

const projectRoute = require('./routes/projectactivities');
const timesheetschema = makeExecutableSchema ({typeDefs:[typeDefs,usertypedefs], resolvers})

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true},{ useFindAndModify: false },
() => console.log (' connected to db!') );

//const schemawithpermissions = applyMiddleware(schema, permission)
async function startServer(){ 
    const app = express();
    const httpServer = http.createServer(app)
    const apolloServer = new ApolloServer<MyContext>({
    //typeDefs: [typeDefs,usertypedefs],        
    //resolvers: resolvers,
    schema: applyMiddleware(timesheetschema,permission),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await apolloServer.start()
 //   apolloServer.applyMiddleware({app, path:'/graphql' }); 

app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(apolloServer,{
            context: async ({ req }) => ({user: getdatafromtoken(req),  token: req.headers.token/*, log: console.log (req.headers.token)*/}),
          }),
          
        );

app.use('/',projectRoute);

/*app.use('/graphql',expressMiddleware(apolloServer,{
    context: async ({ req }) => ({ token: req.headers.token }),
  }) );

  */
//app.use ((req: any, res:any) => { res.send("hello world")})
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);

//app.listen (3000, () => console.log('Server is up and running'));

}
startServer();
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./clients/db";
import cors from "cors";
import { User } from "./user";
import {Post} from './post'
import { GraphqlContext } from "./interfaces";
import JWTService from "./services/jwt";
import * as dotenv from 'dotenv';

dotenv.config();


async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());
  app.use(cors());
  //create Graphql Server
  const gqlServer = new ApolloServer<GraphqlContext>({
    typeDefs: `
        ${User.types}
        ${Post.types}
        type Query{
            ${User.queries}
            ${Post.queries}
        }
        type Mutation{
            ${Post.mutations}
            ${User.mutations}
        }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries
      },
      Mutation: {
        ...Post.resolvers.mutations,
        ...User.resolvers.mutations
      }, 
      ...Post.resolvers.extraResolvers,
      ...User.resolvers.extraResolvers
    },
  });
  //start the gql server
  await gqlServer.start();
  app.get("/", (req, res) => {
    res.send("hello world");
    // res.json({message:"Server is up and running"});
  });
  app.use(
    "/graphql",
    expressMiddleware(gqlServer, {
      context: async ({ req, res }) => {
        return {
          user: req.headers.authorization
            ? JWTService.decodeToken(req.headers.authorization)
            : undefined,
        };
      },
    })
  );
  app.listen(PORT, () => {
    console.log(`Server started at PORT : ${PORT}`);
  });
}
init();

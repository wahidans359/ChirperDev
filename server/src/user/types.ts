// import { Post } from "../post/types";
// import {index} from "../index"
import { Post } from "../post/index";
export const types = `#graphql
   type User{
   id: ID!
   firstName:String!
   lastName:String
   email: String!
   profileImageURL: String

   followers: [User]
   following: [User]
   
   recommendedUsers: [User]

   posts: [Post]
}

`
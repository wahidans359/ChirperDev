import axios from "axios";
import { prismaClient } from "../clients/db";
import JWTService from "../services/jwt";
import { GraphqlContext } from "../interfaces";
import { User } from "@prisma/client";
import UserService from "../services/user";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: String }) => {
    const resultToken = await UserService.verifyGoogleAuthToken(String(token));
    return resultToken;
  },
  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    const id = String(ctx.user?.id);
    if (!id) return null;
    const user = await UserService.getUserById(id);
    return user;
  },
  getUserById: async (
    parent: any,
    { id }: { id: string },
    ctx: GraphqlContext
  ) => {
    const user = UserService.getUserById(id);
    return user;
  },
};

const extraResolvers = {
  User: {
    posts: (parent: User) =>
      prismaClient.post.findMany({ where: { author: { id: parent.id } } }),
    followers: async (parent: User) => {
      const result = await prismaClient.follows.findMany({
        where: { following: { id: parent.id } },
        include: {
          follower: true,
        },
      });
      return result.map((el) => el.follower);
    },
    following: async (parent: User) => {
      const result = await prismaClient.follows.findMany({
        where: { follower: { id: parent.id } },
        include: {
          following: true,
        },
      });

      return result.map((el) => el.following);
    },
    recommendedUsers: async (parent: User, _: any, ctx: GraphqlContext) => {
      if (!ctx.user || !ctx.user.id) {
        throw new Error("You must be logged in to follow a user");
      }
      const myFollowings = await prismaClient.follows.findMany({
        where: { follower: { id: String(ctx.user.id) }, },
        include:{
          following:{
            include:{
              followers:{
                include:{
                  following:true
                }
              }
            }
          }
        }
      });
      const users:User[] = [];
      for(const followings of myFollowings){
        for(const followingOfFollowedUser of followings.following.followers){
          if(followingOfFollowedUser.following.id !== ctx.user.id  && myFollowings.findIndex(e => e?.following?.id === followingOfFollowedUser.following.id) < 0){
           users.push(followingOfFollowedUser.following); 
          }
          
        }
      }
      return users;
    },
  },
};

const mutations = {
  followUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) {
      throw new Error("You must be logged in to follow a user");
    }
    await UserService.followUser(String(ctx.user.id), String(to));
    return true;
  },
  unfollowUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) {
      throw new Error("You must be logged in to follow a user");
    }
    await UserService.unfollowUser(String(ctx.user.id), String(to));
    return true;
  },
};

export const resolvers = { queries, extraResolvers, mutations };

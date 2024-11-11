import { Post } from "@prisma/client";
import { prismaClient } from "../clients/db";
import { GraphqlContext } from "../interfaces";
import {S3Client,PutObjectAclCommand, PutObjectCommand} from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import UserService from "../services/user";
import CreatePostPayload from "../services/post";
import PostService from "../services/post";


const s3Client = new S3Client({
  region:process.env.AWS_DEFAULT_REGION,
})
const queries = {
  getAllPosts: async (parent: any, args: any, ctx: GraphqlContext) => {
    const posts = await PostService.getAllPosts();
    return posts;
  },
  getSignedURLForPost: async (
    parent: any,
    { imageName,imageType }: {imageName: string, imageType: string },
    ctx: GraphqlContext
  ) => {
    if(!ctx.user || !ctx.user.id )
     throw new Error("You must be logged in to create a post");

    const allowedImageTypes = [
      'image/jpg','image/jpeg','image/png','image/webp'];
    if(!allowedImageTypes.includes(imageType.toLowerCase())) 
      throw new Error("Invalid image type"); 
    
    const putObjectCommand = new PutObjectCommand({
      Bucket:process.env.AWS_S3_BUCKET,
      Key:`/uploads/${ctx.user.id}/posts/${imageName}-${Date.now().toString()}.${imageType}`
    });

    const signedURL = await getSignedUrl(s3Client,putObjectCommand);

    return signedURL;
  },
};
const mutations = {
  createPost: async (
    parent: any,
    { payload }: { payload:CreatePostPayload  },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You must be logged in to create a post");
    const post = await PostService.createPost({...payload,
      userId:String(ctx.user.id)
    });
    return post;
  },
};
const extraResolvers = {
  Post: {
    author: (parent: Post) =>
      UserService.getUserById(String(parent.authorId)),
  },
};
export const resolvers = { mutations, extraResolvers, queries };
// export default resolvers;

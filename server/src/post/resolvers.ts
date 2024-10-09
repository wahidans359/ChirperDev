import { Post } from "@prisma/client";
import { prismaClient } from "../clients/db";
import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3'
import { GraphqlContext } from "../interfaces";
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

interface CreatePostPayload {
  content: string;
  imageUrl?: string;
}

const s3Client = new S3Client({credentials:{
  accessKeyId:String(process.env.secretkey),
  secretAccessKey:String(process.env.secretAccessKey)
}})
const queries = {
  getAllPosts: async (parent: any, args: any, ctx: GraphqlContext) => {
    const posts = await prismaClient.post.findMany({
        orderBy: { createdAt: "desc" },
    });
    getSignedURLForPost: async (parent: any, {imageName,imageType}:{imageType:string,imageName:string}, ctx: GraphqlContext) => {
      if(!ctx.user || !ctx.user.id)
        throw new Error("Unauthorized");
      const alloweImageTypes = ['jpg' , 'jpeg','png','webp'];
      if(!alloweImageTypes.includes(imageType))
          throw new Error("Invalid image type");

      const putObjectCommand = new PutObjectCommand({
        Bucket: "chirper-development",
        Key:`/uploads/${ctx.user.id}/posts/${imageName}-${Date.now().toString()}.${imageType}`,
      });
      const signedUrl = await getSignedUrl(s3Client,putObjectCommand);
      return signedUrl
    }
  },
}
const mutations = {
  createPost: async (
    parent: any,
    { payload }: { payload: CreatePostPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You must be logged in to create a post");
    const post = await prismaClient.post.create({
      data:{
        content: payload.content,
        imageURL: payload.imageUrl,
        author: { connect: { id: String(ctx.user.id) } },
      }
    });
    return post;
  },
};
const extraResolvers = {
    Post:{
        author: (parent: Post) => prismaClient.user.findUnique({ where: { id: parent.authorId } }),
    }
};
export const resolvers = { mutations,extraResolvers,queries };
// export default resolvers;

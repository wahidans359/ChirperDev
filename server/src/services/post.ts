import { prismaClient } from "../clients/db";

export default interface CreatePostPayload {
    content: string;
    imageUrl?: string;
    userId:string;
}

export default class PostService{
    public static createPost(data:CreatePostPayload){
        return prismaClient.post.create({data:{
            content:data.content,
            imageUrl:data.imageUrl,
            author:{connect:{id:data.userId}}
        }})
    }
    public static getAllPosts(){
        return prismaClient.post.findMany({orderBy:{createdAt:'desc'}}); 
    }
}

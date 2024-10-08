// import { BsTwitterX } from "react-icons/bs";
import React, { useCallback, useState } from "react";
// import { GoHome } from "react-icons/go";
// import { IoSearchOutline } from "react-icons/io5";
// import { RiNotification4Line } from "react-icons/ri";
// import { FaRegBookmark } from "react-icons/fa6";
// import { FaRegEnvelope } from "react-icons/fa6";
// import { IoPersonOutline } from "react-icons/io5";
import FeedCard from "@/components/FeedCard";
// import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
// import toast from "react-hot-toast";
// import { graphqlClient } from "@/clients/api";
// import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
// import { useCurrentUser } from "@/hooks/user";
// import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image"
import { IoImageOutline } from "react-icons/io5";
import { useCreatePost} from "@/hooks/post";
import { Post } from "@/gql/graphql";
import ChirperLayout from "@/components/FeedCard/Layout/ChirperLayout";
import { useCurrentUser } from "@/hooks/user";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import { getAllPostsQuery } from "@/graphql/queries/tweet";

interface HomeProps{
  posts?:Post[]
}
export default function Home(props:HomeProps) {
  
  // const {posts = []} = useGetAllPosts()
  const { user } = useCurrentUser();
  const {mutate} = useCreatePost()
  

  const [content,setContent] = useState('') 

  const  handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute('accept','image/*');
    input.click(); 
    // input.onchange = async () => {
    //   const file = input.files?.[0];
    //   if (!file) return;
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   formData.append("upload_preset", "chirper");
    //   const { uploadImage } = await graphqlClient.request(uploadImageQuery, {
    //     file: formData,
    //   });
    //   console.log(uploadImage);
    // };
  },[])

  const handleCreatePost = useCallback(async () => {
    setContent('')
    mutate({content})
  },[content,mutate])
  
  
  return (
    <div className="">
      <ChirperLayout>
      <div>
            <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-1 ">
                  {user?.profileImageURL && (
                    <Image
                      className="rounded-full"
                      src={user?.profileImageURL}
                      width="50"
                      height="50"
                      alt="user image"
                    />
                  )}
                </div>

                <div className="col-span-11">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent text-xl placeholder:text-gray-500 px-3  border-b-2 border-gray-600"
                    placeholder="What's happening?"
                    rows={4}
                  ></textarea>
                  <div className="mt-2 flex justify-between  items-center ">
                    <IoImageOutline
                      onClick={handleSelectImage}
                      className="text-lg"
                    />
                    <button
                      onClick={handleCreatePost}
                      className="text-sm font-semibold bg-[#1A8CD8] py-1 px-4 rounded-full"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {props.posts?.map((post) =>
            post ? <FeedCard key={post?.id} data={post as Post} /> : null
          )}
        </ChirperLayout>
    </div>
  );
}
export const getServerSideProps:GetServerSideProps<HomeProps> = async (context) => {
  const allPosts = await graphqlClient.request(getAllPostsQuery);
  console.log(context)
  return {
    props: {
      posts:allPosts.getAllPosts as Post[],
    },
  };
};

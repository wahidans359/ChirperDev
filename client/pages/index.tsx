import { BsTwitterX } from "react-icons/bs";
import React, { useCallback, useState } from "react";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { RiNotification4Line } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { useCreatePost, useGetAllPosts } from "@/hooks/post";
import { Post } from "@/gql/graphql";
interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
}
const sideBarMenuItems: TwitterSideBarButton[] = [
  {
    title: "Home",
    icon: <GoHome />,
  },
  {
    title: "Explore",
    icon: <IoSearchOutline />,
  },
  {
    title: "Notifications",
    icon: <RiNotification4Line />,
  },
  {
    title: "Messages",
    icon: <FaRegEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <FaRegBookmark />,
  },
  {
    title: "Profiles",
    icon: <IoPersonOutline />,
  },
];
export default function Home() {
  const { user } = useCurrentUser();
  const {posts = []} = useGetAllPosts()

  const {mutate} = useCreatePost()
  const queryClient = useQueryClient();

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
  
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.success("Verified Success");
      console.log("this is the token" + verifyGoogleToken);
      if (verifyGoogleToken) {
        window.localStorage.setItem("__chirper_token", verifyGoogleToken);
      }
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    [queryClient]
  );
  return (
    <div className="overflow-x-hidden">
      <div className=" grid grid-cols-12 h-screen w-screen px-[20%]">
        <div className="h-screen col-span-3 relative">
          <div className="w-fit text-2xl h-fit hover:bg-slate-800 rounded-full p-5 cursor-pointer transition-all">
            <BsTwitterX />
          </div>
          <div className="pr-4">
            <ul className="text-xl ">
              {sideBarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4  hover:bg-gray-800 rounded-full px-5 py-2 w-fit mt-2 cursor-pointer transition-all"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pr-10">
              <button className="text-lg font-semibold bg-[#1A8CD8] py-3 rounded-full w-full ">
                Post
              </button>
            </div>
            {user && (
              <div className="absolute bottom-5 flex items-center gap-1  hover:bg-slate-800 transition-all cursor-pointer px-3 py-2 rounded-full">
                <div>
                  {user && user.profileImageURL && (
                    <Image
                      className="rounded-full"
                      src={user?.profileImageURL}
                      width="40"
                      height="40"
                      alt="user image"
                    />
                  )}
                </div>

                <div></div>
                <h3>{user.firstName}</h3>
                <h3>{user.lastName}</h3>
              </div>
            )}
          </div>
        </div>
        <div className=" col-span-6 border-r-[1px] border-l-[1px] border-gray-600">
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
                  value = {content}
                  onChange={e=>setContent(e.target.value)}
                  className="w-full bg-transparent text-xl placeholder:text-gray-500 px-3  border-b-2 border-gray-600" placeholder="What's happening?" rows = {4}>

                  </textarea>
                  <div className="mt-2 flex justify-between  items-center ">
                  <IoImageOutline onClick={handleSelectImage} className="text-lg" />
                  <button onClick={handleCreatePost} className="text-sm font-semibold bg-[#1A8CD8] py-1 px-4 rounded-full">
                Post
              </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            posts?.map((post) => (
              post ? <FeedCard key={post?.id} data={post as Post} /> : null  
            ))
          }
          
        </div>
        <div className="col-span-3 p-5">
          {!user && (
            <div className="border p-3 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-xl">New To Chirper?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle}></GoogleLogin>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

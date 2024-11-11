
import React, { useCallback, useState } from "react";

import {FeedCard} from "@/components/FeedCard";

import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { useCreatePost, useGetAllPosts } from "@/hooks/post";
import { Post } from "@/gql/graphql";
import ChirperLayout from "@/components/FeedCard/Layout/ChirperLayout";
import { useCurrentUser } from "@/hooks/user";
import { graphqlClient } from "@/clients/api";
import {
  getAllPostsQuery,
  getSignedURLForPostQuery,
} from "@/graphql/queries/tweet";
import { GetServerSideProps } from "next";

import axios from "axios";
import toast from "react-hot-toast";
interface HomeProps {
  posts?: Post[];
}

export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();
  const {posts = props.posts as Post[] || []} = useGetAllPosts();
  const { mutateAsync } = useCreatePost();

  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const { getSignedURLForPost } = await graphqlClient.request(
        getSignedURLForPostQuery,
        { imageName: file.name, imageType: file.type }
      );
      if (getSignedURLForPost) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForPost, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Uploaded!", { id: "2" });
        const url = new URL(getSignedURLForPost);
        const myFilePath = `${url.origin}${url.pathname}`;
        setImageURL(myFilePath);
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);
    input.addEventListener("change", handlerFn);

    input.click();
  }, [handleInputChangeFile]);

  const handleCreatePost = useCallback(async () => {
    setContent("");
    setImageURL("");
    await mutateAsync({ content , imageUrl:imageURL});
  }, [content, mutateAsync,imageURL]);

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
                {imageURL && (
                  <Image
                    src={imageURL}
                    width={300}
                    height={300}
                    alt="post-image"
                  />
                )}
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
        {posts?.map((post) =>
          post ? <FeedCard key={post?.id} data={post as Post} /> : null
        )}
      </ChirperLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const allPosts = await graphqlClient.request(getAllPostsQuery);
  return { props: { posts: allPosts.getAllPosts as Post[] } };
};

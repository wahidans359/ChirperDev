import ChirperLayout from "@/components/FeedCard/Layout/ChirperLayout";
import type { GetServerSideProps, NextPage } from "next";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";

import { FeedCard } from "@/components/FeedCard";

import { Post, User } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/queries/user";
import { useCurrentUser } from "@/hooks/user";
import { useCallback, useMemo } from "react";
import { folllowUserMutation, unfolllowUserMutation } from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";
// import { Post, User } from "@/gql/graphql";
// import { useRouter } from "next/router";
// import { graphqlClient } from "@/clients/api";
// import { getUserByIdQuery } from "@/graphql/queries/user";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
  const {user:currentUser} = useCurrentUser();
  const queryClient = useQueryClient();
  const amIFollowing = useMemo(() =>{
    if(!props.userInfo) return false;
    return ((currentUser?.following?.findIndex(el => el?.id === props.userInfo?.id) ?? -1) >= 0)
  },[currentUser?.following,props.userInfo])

  const handleFollowUser = useCallback(async () => {
    if(!props.userInfo) return;
    await graphqlClient.request(folllowUserMutation, { to: props.userInfo?.id });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  },[props.userInfo,queryClient])
  const handleUnfollowUser = useCallback(async () => {
    if(!props.userInfo) return;
    await graphqlClient.request(unfolllowUserMutation, { to: props.userInfo?.id });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    
  },[props.userInfo,queryClient])
  return (
    <div>
      <ChirperLayout>
        <div>
          <nav className="flex items-center gap-3 py-3 px-3">
            <FaArrowLeftLong className="text-2xl" />
            <div>
              <h1 className="text-xl font-bold">
                {props.userInfo?.firstName} {props.userInfo?.lastName}
              </h1>

              <h1 className="text-sm font-bold text-slate-500">
                {props.userInfo?.posts?.length} posts
              </h1>
            </div>
          </nav>
          <div className="p-4 border-b border-gray-600">
            {props.userInfo?.profileImageURL && (
              <Image
                src={props.userInfo?.profileImageURL}
                className="rounded-full"
                width={100}
                height={100}
                alt="profile"
              />
            )}
            <h1 className="text-2xl font-bold mt-5">{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
            <div className="flex justify-between items-center">
              <div className="flex gap-9 mt-2 text-md text-gray-400">
                <span>
                  {props.userInfo?.followers?.length} Followers
                </span>
                <span>
                  {props.userInfo?.following?.length} Followings
                </span>
              </div>
              {
                currentUser?.id !== props.userInfo?.id && (
                  <>{
                    amIFollowing ? 
                    <button onClick={handleUnfollowUser} className="bg-white text-black px-3 py-1 rounded-full text-md">Unfollow</button> : 
                    <button onClick={handleFollowUser} className="bg-white text-black px-3 py-1 rounded-full text-md">Follow</button>
                  }
                  </>
                )
              }
              
            </div>
          </div>
          <div className="p-4">
            {props.userInfo?.posts?.map(
              (post) => (
                <FeedCard key={post?.id} data={post as Post} />
              )
            )}
          </div>
        </div>
      </ChirperLayout>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps<ServerProps> = async (context) => {
  const id = context.query.id as string | undefined;
  if (!id)
    return {
      notFound: true,
      props: {
        userInfo: undefined,
      }
    };
  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });
  if (!userInfo?.getUserById)
    return {
      notFound: true,
      props: {
        userInfo: undefined,
      }
    }

  return {
    props: {
      userInfo: userInfo?.getUserById as User,
    },
  };
};
export default UserProfilePage;

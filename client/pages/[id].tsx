import ChirperLayout from "@/components/FeedCard/Layout/ChirperLayout";
import type { GetServerSideProps, NextPage } from "next";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";

import FeedCard from "@/components/FeedCard";

import {  Post, User } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/queries/user";
// import { Post, User } from "@/gql/graphql";
// import { useRouter } from "next/router";
// import { graphqlClient } from "@/clients/api";
// import { getUserByIdQuery } from "@/graphql/queries/user";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {


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
// const userProfilePage: NextPage<ServerProps> = (props) => {
//   //   eslint-disable-next-line react-hooks/rules-of-hooks

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   // const router = useRouter();
//   console.log(props.userInfo)
//   return (
//     <div>
//       <ChirperLayout>
//         <div>
//           <nav className="flex items-center gap-3 py-3 px-3">
//             <FaArrowLeftLong className="text-2xl" />
//             <div>
//               <h1 className="text-xl font-bold">{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
//               <h1 className="text-sm font-bold text-slate-500">
//                 {props.userInfo?.posts?.length} posts
//               </h1>
//             </div>
//           </nav>
//           <div className="p-4 border-b border-gray-600">
//             {props.userInfo?.profileImageURL && (
//               <Image
//                 src={props.userInfo?.profileImageURL}
//                 className="rounded-full"
//                 width={100}
//                 height={100}
//                 alt="user"
//               />
//             )}
//             <h1 className="text-xl font-bold mt-5">{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
//           </div>
//           <div>
//             {props.userInfo?.posts?.map((post) => (
//               <div key={post?.id}>
//                 <FeedCard data={post as Post} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </ChirperLayout>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps<ServerProps> = async (
//   context
// ) => {
//   const id = String(context.query.id);
//   if (!id)
//     return {
//       notFound: true,
//       props: {
//         user: undefined,
//       },
//     };
//   // id = String(id);
//   const userInfo = await graphqlClient.request(getUserByIdQuery, { id });
//   if (!userInfo?.getUserById)
//     return {
//       notFound: true,
//       props: {
//         user: undefined,
//       },
//     };
//   return {
//     props: {
//       userInfo: userInfo?.getUserById as User,
//     },
//   };
// };
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
  if(!userInfo?.getUserById)
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

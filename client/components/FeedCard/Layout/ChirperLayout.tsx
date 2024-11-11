
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { RiSpeakFill } from "react-icons/ri";
import { ImHome } from "react-icons/im";
import { TbWorldSearch } from "react-icons/tb";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiMailOpenFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { TbPencilPlus } from "react-icons/tb";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface ChirperLayoutProps {
  children: React.ReactNode;
}
interface TwitterSideBarButton {
    title: string;
    icon: React.ReactNode;
    link:string;
  }

const ChirperLayout: React.FC<ChirperLayoutProps> = (props) => {
    const { user } = useCurrentUser();
    const queryClient = useQueryClient();

    const sideBarMenuItems:TwitterSideBarButton[] = useMemo(()=>
       [
        {
          title: "Home",
          icon: <ImHome />,
          link: '/'
        },
        {
          title: "Explore",
          icon: <TbWorldSearch />,
          link: '/'
        },
        {
          title: "Notifications",
          icon: <IoNotificationsSharp />,
          link: '/'
        },
        {
          title: "Messages",
          icon: <RiMailOpenFill />,
          link: '/'
        },
        {
          title: "Bookmarks",
          icon: <FaBookmark />,
          link: '/'
        },
        {
          title: "Profiles",
          icon: <IoPersonSharp/>,
          link: `/${user?.id}`
        },
      ]
    ,[user?.id])
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
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div>
          <div className="text-4xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
          <RiSpeakFill />
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul className="text-xl ">
              {sideBarMenuItems.map((item) => (
                <li
                  
                  key={item.title}
                >
                  <Link className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit mt-2 cursor-pointer transition-all" href={item.link}>
                  <span className=" text-3xl">{item.icon}</span>
                  <span className="hidden sm:inline">{item.title}</span></Link>
                  
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                Post
              </button>
              <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
              <TbPencilPlus />
              </button>
            </div>
            {user && (
              <div className="absolute bottom-5 flex gap-2 items-center hover:bg-gray-800 px-3 py-2 rounded-full cursor-pointer transition-all">
               {user && user.profileImageURL && (
                    <Image
                      className={`${inter.className} font-extrabol rounded-full`}
                      src={user?.profileImageURL}
                      width="40"
                      height="40"
                      alt="user image"
                    />
                  )}
                  
                <div className="hidden sm:block">
                    <h3 className="text-sm">{user?.firstName} {user?.lastName}</h3>
                </div>
                
              </div>
            )}
          </div>
          </div>
        </div>
        <div className="col-span-10 sm:col-span-5 md:col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
          {props.children}
        </div>
        <div className="sm:col-span-3 p-5">
          {!user ? (
            <div className="border p-3 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-xl">New To Chirper?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle}></GoogleLogin>
            </div>
          ) : (<div className="border px-4 py-3 hover:bg-slate-900 rounded-lg transition-all cursor-pointer">
            <h1 className="my-2 text-xl mb-5">Users you may know</h1>
            {
              user?.recommendedUsers?.map(el => (
              <div className="flex items-center gap-3 mt-2" key={el?.id}>
                {el?.profileImageURL && <Image className="rounded-full" src={el?.profileImageURL} width={60} height={60} alt="profile-image"/>}
                <div className="text-lg">
                  <div>{el?.firstName} {el?.lastName}</div>
                  <Link href={`/${el?.id}`} className="bg-white text-black text-sm px-5 py-1 rounded-lg">View</Link> 
                </div>
              </div>))
            }
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChirperLayout;

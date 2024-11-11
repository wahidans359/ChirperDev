import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { Post } from "@/gql/graphql";
import { Inter } from 'next/font/google'

import Link from "next/link";


const inter = Inter({ subsets: ['latin'] })

interface FeedCardProps {
  data: Post;
}

export const FeedCard: React.FC<FeedCardProps>  = (props) => {


  const { data } = props;
  // console.log(data)
  return (
    <div className="border border-r-0 border-l-0 border-t-0 border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-1 ">
          {data.author?.profileImageURL && <Image
            className="rounded-full"
            src={data.author?.profileImageURL}
            width={50}
            height={50}
            alt="user image"
          />}
        </div>
        <div className="col-span-11">
          <Link href={`/${data.author?.id}`} className={`${inter.className} text-lg font-semibold`}>
          {data.author?.firstName} {data.author?.lastName }
          </Link>
          {/* <h5 className="">{data.author?.firstName} {data.author?.lastName }</h5> */}
          <p className="">
            {data.content}
          </p>
          {
            data.imageUrl && <Image src={data.imageUrl} width={400} height={400} alt="post image"/>
          }
          <div className="flex justify-between mt-5 text-lg items-center pr-10">
            <div>
              <FiMessageCircle />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <CiHeart />
            </div>
            <div>
              <MdOutlineFileUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



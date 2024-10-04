import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { Post } from "@/gql/graphql";
interface FeedCardProps {
  data: Post;
}
const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer">
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
          <h5 className="">{data.author?.firstName} {data.author?.lastName }</h5>
          <p className="">
            {data.content}
          </p>
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
export default FeedCard;

import ChirperLayout from "@/components/FeedCard/Layout/ChirperLayout";
import type { NextPage } from "next";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
const userProfilePage: NextPage = () => {
  
  const { user } = useCurrentUser();
  return (
    <div>
      <ChirperLayout>
        <div>
          <nav className="flex items-center gap-2 py-3 px-3">
            <FaArrowLeft className="text-3xl" />
            <div>
              <h1 className="text-2xl font-bold">wahid ansari</h1>
              <h1 className="text-md font-bold text-slate-600">100 posts</h1>
            </div>
          </nav>
          <div className="p-4 border-b">
            {user?.profileImageURL && (
              <Image
                className="rounded-full"
                src={user?.profileImageURL}
                width={100}
                height={100}
                alt="user image"
              />
            )}
            <h1 className="text-2xl font-bold mt-3s">wahid ansari</h1>
          </div>
        </div>
      </ChirperLayout>
    </div>
  );
};
export default userProfilePage;

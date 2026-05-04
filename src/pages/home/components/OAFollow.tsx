import React from "react";
import { useNavigate } from "react-router-dom";
import { ASSETS } from "@/constants/assets";

import { getUserInfo, followOA } from "zmp-sdk/apis";

const OAFollow: React.FC = () => {
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = React.useState(false);

  React.useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const { userInfo } = await getUserInfo({});
        if (userInfo.followedOA) {
          setIsFollowed(true);
        }
      } catch (e) {
        console.log("Error checking OA follow status", e);
      }
    };
    checkFollowStatus();
  }, []);

  const handleFollowOA = async () => {
    try {
      await followOA({ id: "4289073059490896771" });
      setIsFollowed(true);
    } catch (e) {
      console.log("Follow OA cancelled or failed", e);
    }
  };

  return (
    <div className="mx-3.5 rounded-2xl border border-divider01 bg-white p-3.5 shadow-sm">
      <div className="text-small text-text-primary">
        Quan tâm OA để nhận các đặc quyền ưu đãi
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-full border border-divider01 bg-white">
            <img
              src={ASSETS.LOGO}
              alt="DEV PỒ logo"
              className="h-6 w-6 rounded-full"
              draggable={false}
            />
          </div>
          <div>
            <div className="text-large-sb text-text-primary">DEV PỒ</div>
            <div className="text-xsmall italic text-text-secondary">Official Account</div>
          </div>
        </div>

        <button
          type="button"
          disabled={isFollowed}
          onClick={handleFollowOA}
          className={`rounded-full px-5 py-2 text-small-m transition-colors ${
            isFollowed 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-blue500 text-white active:bg-blue-600"
          }`}
        >
          {isFollowed ? "Đã quan tâm" : "Quan tâm"}
        </button>
      </div>
    </div>
  );
};

export default OAFollow;

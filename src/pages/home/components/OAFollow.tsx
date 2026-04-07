import React from "react";
import { useNavigate } from "react-router-dom";
import { ASSETS } from "@/constants/assets";

const OAFollow: React.FC = () => {
  const navigate = useNavigate();

  const handleFollowOA = () => {
    // TODO: Integrate zmp-sdk followOA
    navigate("/profile");
  };

  return (
    <div className="mx-3.5 rounded-2xl border border-divider01 bg-white p-3.5 shadow-sm">
      <div className="text-small text-text-primary">
        Quan tâm OA để nhận các chương trình đặc quyền ưu đãi
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
            <div className="text-large-sb text-text-primary">DEV PỒ Store</div>
            <div className="text-xsmall italic text-text-secondary">Official Account</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleFollowOA}
          className="rounded-full bg-blue500 px-5 py-2 text-small-m text-white"
        >
          Quan tâm
        </button>
      </div>
    </div>
  );
};

export default OAFollow;

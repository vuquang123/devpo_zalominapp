import React from "react";
import { copy } from "@/constants/copy";
import { ASSETS } from "@/constants/assets";

const HomeBanner: React.FC = () => {
  return (
    <div className="relative mx-3.5 mt-2 overflow-hidden rounded-2xl shadow-sm">
      <img
        src={ASSETS.BANNER}
        alt={`${copy.brand.name} banner`}
        className="h-44 w-full object-cover"
        draggable={false}
      />
    </div>
  );
};

export default HomeBanner;

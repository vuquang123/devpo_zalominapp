import React from "react";
import { ASSETS } from "@/constants/assets";

const TrustMarquee: React.FC = () => {
  const marqueeImages = [...ASSETS.FEEDBACK, ...ASSETS.FEEDBACK];

  return (
    <div className="border-divider01 border-t px-3.5 pt-6">
      <div className="text-center text-xxlarge-m text-text-primary">
        Khách hàng tin tưởng DEV PỒ
      </div>
      <div className="mx-auto mt-2 max-w-[320px] text-center text-small text-text-secondary">
        Hàng ngàn khách hàng đã trải nghiệm và hài lòng với chất lượng máy tại shop
      </div>

      <div className="trust-marquee mt-4 pb-2">
        <div className="trust-marquee-track">
          {marqueeImages.map((image, index) => (
            <img
              key={`${index}-${image}`}
              src={image}
              alt={`Khách hàng DEV PỒ ${index + 1}`}
              className="h-44 w-32 shrink-0 rounded-2xl object-cover"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustMarquee;

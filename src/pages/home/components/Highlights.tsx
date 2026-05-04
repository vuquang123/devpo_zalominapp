import React from "react";

const highlights = ["Free Ship toàn quốc", "Hỗ trợ trọn đời", "Cam kết hàng zin chuẩn"];

const Highlights: React.FC = () => {
  const content = highlights.map((item, index) => (
    <React.Fragment key={index}>
      <span className="mx-6">{item}</span>
      <span className="text-white/40">•</span>
    </React.Fragment>
  ));

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 12s linear infinite;
          }
        `}
      </style>
      <div className="flex w-full overflow-hidden bg-black py-2.5 text-[11px] font-semibold text-white">
        <div className="animate-marquee flex shrink-0 items-center">
          {content}
        </div>
        <div className="animate-marquee flex shrink-0 items-center" aria-hidden="true">
          {content}
        </div>
        <div className="animate-marquee flex shrink-0 items-center" aria-hidden="true">
          {content}
        </div>
      </div>
    </>
  );
};

export default Highlights;

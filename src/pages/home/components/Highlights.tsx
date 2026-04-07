import React from "react";

const highlights = ["Free Ship toàn quốc", "Hỗ trợ trọn đời", "Cam kết hàng zin chuẩn"];

const Highlights: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-neutral900 px-3 py-2 text-xxsmall-m text-white">
      {highlights.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
};

export default Highlights;

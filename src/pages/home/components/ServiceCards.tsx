import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-3.5 grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-border-primary bg-white p-3.5 shadow-sm">
        <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-blue100 text-blue500">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <circle cx="11" cy="11" r="6.6" stroke="currentColor" strokeWidth="2" />
            <path d="M16 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <button
          type="button"
          onClick={() => navigate("/menu", { state: { activeFilter: "Tất cả" } })}
          className="text-left"
        >
          <div className="text-xlarge-sb">Danh mục máy</div>
        </button>
        <div className="text-xsmall text-text-secondary">Sẵn hàng đủ mã</div>
      </div>

      <div className="rounded-2xl border border-border-primary bg-white p-3.5 shadow-sm">
        <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#FFECE2] text-orange500">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path d="M12 4.5C8.9 4.5 6.4 7 6.4 10.1V12.4L5 14V15H19V14L17.6 12.4V10.1C17.6 7 15.1 4.5 12 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M10 18C10.3 19 11 19.5 12 19.5C13 19.5 13.7 19 14 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <button
          type="button"
          onClick={() => navigate("/order")}
          className="text-left"
        >
          <div className="text-xlarge-sb">Thông báo</div>
        </button>
        <div className="text-xsmall text-text-secondary">Ưu đãi, tin tức mới</div>
      </div>
    </div>
  );
};

export default ServiceCards;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const quickActions = [
  { id: "may-lock", name: "Máy Lock", tone: "blue" },
  { id: "quoc-te", name: "Quốc tế", tone: "green" },
  { id: "ipad", name: "iPad", tone: "purple" },
  { id: "vong-quay", name: "Vòng quay", tone: "yellow" },
  { id: "ma-imsi", name: "Mã IMSI", tone: "orange" },
  { id: "ho-tro", name: "Hỗ trợ", tone: "red" },
];

export const actionToneClass: Record<string, { bg: string; fg: string }> = {
  blue: { bg: "bg-blue100", fg: "text-blue500" },
  green: { bg: "bg-green100", fg: "text-green500" },
  purple: { bg: "bg-[#F1E8FF]", fg: "text-[#A03AFF]" },
  yellow: { bg: "bg-yellow100", fg: "text-[#DE8F00]" },
  orange: { bg: "bg-[#FFECE2]", fg: "text-orange500" },
  red: { bg: "bg-red100", fg: "text-red500" },
};

const imsiData = [
  { network: "US Reseller Flex Policy", imsi: "310120" },
  { network: "AT&T US-GSM", imsi: "3104101" },
  { network: "T-Mobile", imsi: "3102600 / 3102605" },
  { network: "Verizon", imsi: "2040438 / 311480" },
  { network: "Sprint", imsi: "310120" },
  { network: "Tracfone | Straight Talk", imsi: "310120 / 311480" },
  { network: "Xfinity", imsi: "2040438 / 311480" },
  { network: "US Cellular", imsi: "3115801" },
  { network: "Cricket", imsi: "3101508" },
  { network: "MetroPCS", imsi: "3102400", gid1: "6D" },
  { network: "Japan Softbank", imsi: "4402081", gid1: "00" },
  { network: "Japan Docomo", imsi: "4401020" },
  { network: "Japan AU - KDDI", imsi: "44050 / 44051" },
  { network: "UK O2", imsi: "2341091" },
  { network: "UK EE / Orange", imsi: "2343301" },
  { network: "UK Vodafone", imsi: "2341590" },
  { network: "UK Three", imsi: "2342091" },
  { network: "Canada Bell / Virgin", imsi: "3026101 / 302610" },
  { network: "Canada Rogers / Fido", imsi: "3027204 / 3023704" },
  { network: "Canada Telus / Koodo", imsi: "3022200 / 302220" },
  { network: "Canada Sasktel", imsi: "302780" },
  { network: "Canada Freedom", imsi: "302490" },
  { network: "Korea SK", imsi: "45005" },
  { network: "Korea KT", imsi: "45008" },
  { network: "Korea LG", imsi: "45006" },
  { network: "Viettel", imsi: "45204" },
  { network: "Vinaphone", imsi: "45202" },
  { network: "Mobifone", imsi: "45201" },
];

function QuickActionIcon({ id }: { id: string }) {
  const className = "h-6 w-6";

  switch (id) {
    case "may-lock":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 5.5H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case "quoc-te":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3.8 12H20.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 3.8C14.2 5.9 15.4 8.8 15.4 12C15.4 15.2 14.2 18.1 12 20.2C9.8 18.1 8.6 15.2 8.6 12C8.6 8.8 9.8 5.9 12 3.8Z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "ipad":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 5.5H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="18.2" r="0.9" fill="currentColor" />
        </svg>
      );
    case "vong-quay":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 3.5V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4.8 7.8L7.2 9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3.5 15H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8.7 20.2L10.5 17.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15.3 20.2L13.5 17.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20.5 15H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M19.2 7.8L16.8 9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "ma-imsi":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 4V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6.8 6.8L17.2 17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M17.2 6.8L6.8 17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 3.5L18.5 6.4V11.4C18.5 15.6 15.8 19.4 12 20.5C8.2 19.4 5.5 15.6 5.5 11.4V6.4L12 3.5Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.2 12.1L11 13.9L14.8 10.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const [showImsi, setShowImsi] = useState(false);

  const handleQuickActionClick = (id: string) => {
    if (id === "vong-quay") return navigate("/lucky-wheel");
    if (id === "ho-tro") return navigate("/profile");
    if (id === "ma-imsi") return setShowImsi(true);
    if (id === "may-lock") return navigate("/menu", { state: { activeFilter: "iPhone Lock" } });
    if (id === "quoc-te") return navigate("/menu", { state: { activeFilter: "iPhone Quốc tế" } });
    if (id === "ipad") return navigate("/menu", { state: { activeFilter: "iPad" } });
    return navigate("/menu", { state: { activeFilter: "Tất cả" } });
  };

  return (
    <>
      <div className="mx-4 grid grid-cols-4 gap-x-0.5 gap-y-1">
        {quickActions.map((item) => {
          const tone = actionToneClass[item.tone] || actionToneClass.blue;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleQuickActionClick(item.id)}
              className="flex w-full flex-col items-center gap-1 rounded-xl bg-transparent py-2.5"
            >
              <div
                className={`flex size-11 items-center justify-center rounded-2xl ${tone.bg} ${tone.fg}`}
              >
                <QuickActionIcon id={item.id} />
              </div>
              <div className="text-xxxsmall-m text-text-tertiary">{item.name}</div>
            </button>
          );
        })}
      </div>

      {showImsi && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 pointer-events-auto">
          <div className="flex h-[85vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-xl animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-[#f8f9fa] px-4 py-3 shrink-0">
              <h2 className="text-[13px] font-bold text-black uppercase">Danh sách mã IMSI</h2>
              <button 
                onClick={() => setShowImsi(false)} 
                className="rounded-full bg-gray-200 p-1.5 text-gray-600 active:bg-gray-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            
            {/* Table Header fixed */}
            <div className="grid grid-cols-12 border-b border-gray-200 bg-black text-white px-3 py-2 text-[10px] font-semibold shrink-0">
              <div className="col-span-5">Nhà mạng</div>
              <div className="col-span-5 text-center">IMSI</div>
              <div className="col-span-2 text-center">GID1</div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto">
              {imsiData.map((row, i) => (
                <div key={i} className={`grid grid-cols-12 px-3 py-3 text-[10px] border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-[#fcfcfc]"}`}>
                  <div className="col-span-5 font-bold text-black flex items-center">{row.network}</div>
                  <div className="col-span-5 text-center text-gray-700 flex items-center justify-center font-mono tracking-tight">{row.imsi}</div>
                  <div className="col-span-2 text-center text-gray-700 flex items-center justify-center">{row.gid1 || ""}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;

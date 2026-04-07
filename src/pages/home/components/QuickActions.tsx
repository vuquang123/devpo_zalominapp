import React from "react";
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

function QuickActionIcon({ id }: { id: string }) {
  const className = "h-5 w-5";

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

  const handleQuickActionClick = (id: string) => {
    if (id === "vong-quay") return navigate("/lucky-wheel");
    if (id === "ho-tro") return navigate("/profile");
    if (id === "ma-imsi") return navigate("/order");
    return navigate("/menu");
  };

  return (
    <div className="mx-3.5 grid grid-cols-3 gap-x-2 gap-y-3">
      {quickActions.map((item) => {
        const tone = actionToneClass[item.tone] || actionToneClass.blue;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleQuickActionClick(item.id)}
            className="flex flex-col items-center gap-1 rounded-xl bg-transparent py-2"
          >
            <div
              className={`flex size-10 items-center justify-center rounded-2xl ${tone.bg} ${tone.fg}`}
            >
              <QuickActionIcon id={item.id} />
            </div>
            <div className="text-xxxsmall-m text-text-tertiary">{item.name}</div>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;

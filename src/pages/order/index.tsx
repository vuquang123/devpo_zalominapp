import { useMemo, useState } from "react";
import guide1 from "@/static/guides/guide-1.png";
import guide10 from "@/static/guides/guide-10.png";
import guide11 from "@/static/guides/guide-11.png";
import guide12 from "@/static/guides/guide-12.png";
import guide13 from "@/static/guides/guide-13.png";
import guide14 from "@/static/guides/guide-14.png";
import guide15 from "@/static/guides/guide-15.png";
import guide2 from "@/static/guides/guide-2.png";
import guide3 from "@/static/guides/guide-3.png";
import guide4 from "@/static/guides/guide-4.png";
import guide5 from "@/static/guides/guide-5.png";
import guide6 from "@/static/guides/guide-6.png";
import guide7 from "@/static/guides/guide-7.png";
import guide8 from "@/static/guides/guide-8.png";
import guide9 from "@/static/guides/guide-9.png";

const guideItems = [
  {
    id: "1",
    badge: "Mới nhất",
    image: guide1,
    title: "Fix lỗi điểm truy cập cá nhân",
    action: "Xem video",
  },
  {
    id: "2",
    badge: "",
    image: guide2,
    title: "Thông tin, kiến thức về iPhone Lock",
    action: "Danh sách phần (5)",
  },
  {
    id: "3",
    badge: "",
    image: guide3,
    title: "Cách lắp sim EID 1 sim",
    action: "Xem video",
  },
  {
    id: "4",
    badge: "",
    image: guide4,
    title: "Cách lắp sim EID 2 sim",
    action: "Xem video",
  },
  {
    id: "5",
    badge: "",
    image: guide5,
    title: "Cách lắp sim ghép 2 mảnh đúng cách",
    action: "Xem video",
  },
  {
    id: "6",
    badge: "",
    image: guide6,
    title: "Tái sử dụng sim ghép khi hỏng 1 mặt",
    action: "Xem video",
  },
  {
    id: "7",
    badge: "",
    image: guide7,
    title: "Respring iOS 26",
    action: "Xem video",
  },
  {
    id: "8",
    badge: "",
    image: guide8,
    title: "Giải đáp 999 câu hỏi",
    action: "Xem video",
  },
  {
    id: "9",
    badge: "",
    image: guide9,
    title: "Fix lỗi iPhone Lock EID mới",
    action: "Xem video",
  },
  {
    id: "10",
    badge: "",
    image: guide10,
    title: "Fix lỗi KHÔNG UPDATE IOS được",
    action: "Xem video",
  },
  {
    id: "11",
    badge: "",
    image: guide11,
    title: "Thiết bị MDM là gì",
    action: "Danh sách phần (2)",
  },
  {
    id: "12",
    badge: "",
    image: guide12,
    title: "Quốc tế nửa mùa là gì?",
    action: "Xem video",
  },
  {
    id: "13",
    badge: "",
    image: guide13,
    title: "Fix lỗi danh bạ ghép sim TMSI/QPE",
    action: "Xem video",
  },
  {
    id: "14",
    badge: "",
    image: guide14,
    title: "Tin mới về iPhone Lock",
    action: "Xem video",
  },
  {
    id: "15",
    badge: "",
    image: guide15,
    title: "Thông tin về iPhone Lock năm 2026",
    action: "Xem video",
  },
];

const ITEMS_PER_PAGE = 8;

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path
        d="M13 5.5H18.5V11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 13.5L18.3 5.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18.5 14V18.5H5.5V5.5H10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OrderPage() {
  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(guideItems.length / ITEMS_PER_PAGE));
  const visibleGuides = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    return guideItems.slice(start, start + ITEMS_PER_PAGE);
  }, [activePage]);

  return (
    <div className="px-3.5 pb-5 pt-2">
      <div className="rounded-2xl bg-white px-3 pb-4 pt-3 shadow-sm">
        <div className="text-center text-xxlarge-m uppercase text-text-primary">
          CẨM NANG iPHONE LOCK
        </div>
        <div className="mt-2 text-center text-large text-text-secondary">
          Tổng hợp toàn bộ kiến thức, cách ghép sim, và
        </div>
        <div className="text-center text-large text-text-secondary">
          hướng dẫn fix lỗi chi tiết trên iPhone Lock
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {visibleGuides.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-divider01 bg-white"
            >
              <div className="relative">
                {item.badge && (
                  <div className="absolute left-2 top-2 rounded-full bg-neutral900 px-2 py-0.5 text-xxsmall-m text-white">
                    {item.badge}
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-28 w-full object-cover"
                  draggable={false}
                />
              </div>

              <div className="p-2.5">
                <div className="line-clamp-2 min-h-[56px] text-xlarge text-text-primary">
                  {item.title}
                </div>

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-between rounded-xl bg-neutral900 px-2.5 py-2 text-small-m text-white"
                >
                  <span>{item.action}</span>
                  <ExternalIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-text-primary">
          <button
            type="button"
            className="h-8 w-8 rounded-lg border border-transparent text-large disabled:text-text-disabled"
            onClick={() => setActivePage((page) => Math.max(1, page - 1))}
            disabled={activePage === 1}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isActive = page === activePage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setActivePage(page)}
                className={`h-8 min-w-8 rounded-lg px-2 text-small-m ${
                  isActive
                    ? "border border-divider01 bg-white text-text-primary"
                    : "text-text-primary"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            className="h-8 w-8 rounded-lg border border-transparent text-large disabled:text-text-disabled"
            onClick={() => setActivePage((page) => Math.min(totalPages, page + 1))}
            disabled={activePage === totalPages}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Modal, Text } from "zmp-ui";
import { GITHUB_RAW_BASE } from "@/constants/assets";

interface GuideItem {
  id: string;
  badge: string;
  image: string;
  title: string;
  action: string;
  content: string[];
}

const guideItems: GuideItem[] = [
  {
    id: "1",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-1.png`,
    title: "Tin mới về iPhone Lock năm 2026",
    action: "Xem chi tiết",
    content: [
      "Dự báo iPhone Lock năm 2026 vẫn sẽ chiếm thị phần lớn nhờ cấu hình mạnh giá rẻ.",
      "Công nghệ AI sẽ giúp việc ghép sim trở nên tự động hoàn toàn.",
      "Cộng đồng DEV PỒ luôn cập nhật các giải pháp fix lỗi nhanh nhất cho các dòng máy mới nhất.",
      "Chúng tôi cam kết đồng hành cùng người dùng iPhone Lock trong mọi tình huống.",
    ],
  },
  {
    id: "2",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-2.png`,
    title: "iPhone Lock có đáng trải nghiệm không?",
    action: "Xem chi tiết",
    content: [
      "Ưu điểm lớn nhất là mức giá rẻ hơn từ 30-50% so với máy quốc tế.",
      "Hiện nay, iPhone Lock có thể dùng ổn định như quốc tế nhờ sim ghép thế hệ mới (QPE, TMSI).",
      "Sóng sánh ổn định, hỗ trợ đầy đủ 4G/5G và các tính năng như iMessage, FaceTime.",
      "Đây là lựa chọn tuyệt vời cho người dùng muốn sở hữu iPhone đời cao với chi phí thấp.",
    ],
  },
  {
    id: "3",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-3.png`,
    title: "Giải đáp 999 câu hỏi về iPhone Lock",
    action: "Xem chi tiết",
    content: [
      "Q: iPhone Lock có dùng được eSIM không? A: Có, nếu máy được unlock hoặc dùng sim ghép hỗ trợ.",
      "Q: Có nên cập nhật iOS không? A: Nên kiểm tra tình hình mã ICCID trước khi cập nhật.",
      "Q: Sóng iPhone Lock có ổn định không? A: Với SIM ghép QPE mới nhất, sóng cực kỳ ổn định.",
    ],
  },
  {
    id: "4",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-4.png`,
    title: "Fix lỗi iPhone Lock EID mới",
    action: "Xem chi tiết",
    content: [
      "Bước 1: Kiểm tra mã EID trên máy (Cài đặt > Cài đặt chung > Giới thiệu).",
      "Bước 2: Truy cập trang web cập nhật mã ICCID/EID của DEV PỒ.",
      "Bước 3: Nhập mã mới vào bảng menu của sim ghép khi cắm sim vào.",
      "Bước 4: Khởi động lại máy để nhận cấu hình mới.",
    ],
  },
  {
    id: "5",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-5.png`,
    title: "Fix lỗi không Update được IOS",
    action: "Xem chi tiết",
    content: [
      "Lỗi này thường do máy đang cài đặt các cấu hình chặn Update hoặc đầy bộ nhớ.",
      "Bước 1: Vào Cài đặt > Cài đặt chung > Quản lý VPN & Thiết bị.",
      "Bước 2: Xóa cấu hình 'Block Update' nếu có.",
      "Bước 3: Giải phóng bộ nhớ máy ít nhất 10GB trống.",
      "Bước 4: Cắm sạc và thử cập nhật lại qua Wifi.",
    ],
  },
  {
    id: "6",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-6.png`,
    title: "Thiết bị MDM là gì?",
    action: "Xem chi tiết",
    content: [
      "MDM (Mobile Device Management) là máy được quản lý bởi doanh nghiệp hoặc tổ chức.",
      "Máy thường có cấu hình giới hạn một số tính năng để bảo mật.",
      "Người dùng có thể 'bypass' MDM để dùng bình thường nhưng không nên Reset dòng 2.",
      "Hãy kiểm tra kỹ thông tin máy trước khi quyết định mua các dòng MDM.",
    ],
  },
  {
    id: "7",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-7.png`,
    title: "Quốc tế nửa mùa là gì?",
    action: "Xem chi tiết",
    content: [
      "Quốc tế nửa mùa là máy quốc tế dùng được tất cả các nhà mạng trừ nhà mạng của Mỹ.",
      "Về cơ bản máy vẫn là máy quốc tế, không cần dùng sim ghép tại Việt Nam.",
      "Tuy nhiên, nếu mang sang Mỹ và lắp sim nhà mạng Mỹ, máy sẽ bị khóa lại.",
      "Đây là loại máy phổ biến và có giá thành rẻ hơn máy quốc tế thông thường.",
    ],
  },
  {
    id: "8",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-8.png`,
    title: "Fix danh bạ TMSI/QPE",
    action: "Xem chi tiết",
    content: [
      "iPhone Lock thường gặp lỗi không hiện tên danh bạ khi có cuộc gọi đến.",
      "Bước 1: Cài ứng dụng 'Edit Prefix' hoặc 'Contact Optimizer' trên App Store.",
      "Bước 2: Sử dụng tính năng đổi toàn bộ đầu số 0 thành +84.",
      "Bước 3: Lưu lại và kiểm tra kết quả trong danh bạ.",
    ],
  },
  {
    id: "9",
    badge: "Mới nhất",
    image: `${GITHUB_RAW_BASE}/guides/guide-9.png`,
    title: "Fix lỗi điểm truy cập cá nhân",
    action: "Xem chi tiết",
    content: [
      "Bước 1: Vào Cài đặt > Di động > Mạng dữ liệu di động.",
      "Bước 2: Tìm phần 'Điểm truy cập cá nhân' ở phía dưới.",
      "Bước 3: Nhập APN tương ứng với nhà mạng (VD: Viettel là 'v-internet', VinaPhone là 'm3-world').",
      "Bước 4: Bật/Tắt chế độ máy bay để kích hoạt cài đặt mới.",
    ],
  },
  {
    id: "10",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-10.png`,
    title: "Thông tin, kiến thức về iPhone Lock",
    action: "Xem chi tiết",
    content: [
      "iPhone Lock là máy được nhà mạng nước ngoài bán dưới dạng hợp đồng.",
      "Tìm hiểu về các khái niệm: ICCID, EID, TMSI, QPE để làm chủ thiết bị của bạn.",
      "Luôn theo dõi Fanpage DEV PỒ để cập nhật các tin tức mới nhất về cộng đồng iPhone Lock.",
    ],
  },
  {
    id: "11",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-11.png`,
    title: "Cách lắp sim EID 1 sim",
    action: "Xem chi tiết",
    content: [
      "Bước 1: Chuẩn bị khay sim, sim chính và sim ghép DEV PỒ.",
      "Bước 2: Đặt sim ghép vào khay sim trước sao cho khớp các góc cạnh.",
      "Bước 3: Đặt sim chính đè lên trên sim ghép.",
      "Bước 4: Đẩy khay sim vào máy và thực hiện các bước kích hoạt trên màn hình.",
    ],
  },
  {
    id: "12",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-12.png`,
    title: "Cách lắp sim EID 2 sim",
    action: "Xem chi tiết",
    content: [
      "Đối với máy Lock 2 sim vật lý (thường là mã CH/A hoặc ZP/A).",
      "Bước 1: Lắp mảnh sim ghép thứ nhất vào mặt dưới khay sim cùng sim phụ.",
      "Bước 2: Lắp mảnh sim ghép thứ hai vào mặt trên khay sim cùng sim chính.",
      "Bước 3: Nhập mã ICCID/EID mới nhất để kích hoạt cả 2 sim.",
    ],
  },
  {
    id: "13",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-13.png`,
    title: "Lắp sim ghép 2 mảnh đúng cách",
    action: "Xem chi tiết",
    content: [
      "Bước 1: Tách nhẹ hai mảnh của sim ghép DEV PỒ ra.",
      "Bước 2: Đặt một mảnh dưới phôi sim, sau đó gập mảnh còn lại qua phía trên.",
      "Bước 3: Giữ sim chặt và đẩy nhẹ vào trong khay sim của máy.",
      "Bước 4: Chọn mode 'QPE' hoặc 'TMSI' sao cho phù hợp nhất với máy của bạn.",
    ],
  },
  {
    id: "14",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-14.png`,
    title: "Tái sử dụng sim ghép bị hỏng",
    action: "Xem chi tiết",
    content: [
      "Nếu sim ghép bị hỏng một mảnh, bạn vẫn có thể tận dụng mảnh còn lại.",
      "Bước 1: Dùng kéo cắt bỏ phần cáp nối giữa hai mảnh của sim ghép.",
      "Bước 2: Chỉ lấy phần chip còn xanh/vàng hoạt động tốt.",
      "Bước 3: Dán cố định vào khay sim và dùng như sim ghép một mảnh thông thường.",
    ],
  },
  {
    id: "15",
    badge: "",
    image: `${GITHUB_RAW_BASE}/guides/guide-15.png`,
    title: "Hướng dẫn Respring iOS 16",
    action: "Xem chi tiết",
    content: [
      "Respring giúp iPhone load lại sóng mà không cần khởi động lại toàn bộ máy.",
      "Cách 1: Sử dụng Phím tắt (Shortcuts) có cài sẵn lệnh Respring.",
      "Cách 2: Thay đổi ngôn ngữ của máy sang một ngôn ngữ khác rồi chuyển lại tiếng Việt.",
      "Cách 3: Sử dụng các ứng dụng hỗ trợ chuyên biệt có tính năng Respring.",
    ],
  },
];


const ITEMS_PER_PAGE = 8;

export default function OrderPage() {
  const [activePage, setActivePage] = useState(1);
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);

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
                  onClick={() => setSelectedGuide(item)}
                  className="mt-3 flex w-full items-center justify-center rounded-xl bg-neutral900 py-2 text-small-m text-white active:bg-neutral800 transition-colors"
                >
                  {item.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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
                    ? "border border-divider01 bg-white text-text-primary shadow-sm"
                    : "text-text-primary hover:bg-neutral100"
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

      {/* Guide Detail Modal */}
      <Modal
        visible={!!selectedGuide}
        onClose={() => setSelectedGuide(null)}
        title={selectedGuide?.title || ""}
        className="guide-modal relative"
      >
        <button
          type="button"
          onClick={() => setSelectedGuide(null)}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100/80 text-neutral-900 shadow-sm active:scale-95 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className="max-h-[70vh] overflow-y-auto px-1">
          {selectedGuide && (
            <>
              <img
                src={selectedGuide.image}
                alt={selectedGuide.title}
                className="mb-4 aspect-video w-full rounded-xl object-cover"
              />
              <div className="space-y-3">
                {selectedGuide.content.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-neutral900 flex items-center justify-center text-[10px] text-white font-bold">
                      {idx + 1}
                    </div>
                    <Text className="text-large text-text-primary leading-relaxed">
                      {step}
                    </Text>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-divider01 pt-4">
                <Text size="small" className="italic text-text-secondary text-center">
                  Cần hỗ trợ thêm? Hãy nhắn tin cho chúng tôi qua Zalo.
                </Text>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}


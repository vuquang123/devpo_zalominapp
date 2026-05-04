import { useState } from "react";
// @ts-ignore
import { openChat, openPhone, openWebview, showToast } from "zmp-sdk/apis";

function ActionIcon({ type }: { type: "chat" | "group" | "phone" }) {
  if (type === "chat") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M5.5 7.5H18.5C19.6 7.5 20.5 8.4 20.5 9.5V13.5C20.5 14.6 19.6 15.5 18.5 15.5H12.7L9.2 18V15.5H5.5C4.4 15.5 3.5 14.6 3.5 13.5V9.5C3.5 8.4 4.4 7.5 5.5 7.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "group") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M8.5 11.5C9.9 11.5 11 10.4 11 9C11 7.6 9.9 6.5 8.5 6.5C7.1 6.5 6 7.6 6 9C6 10.4 7.1 11.5 8.5 11.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M15.5 10.5C16.6 10.5 17.5 9.6 17.5 8.5C17.5 7.4 16.6 6.5 15.5 6.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4.5 17.5C5.4 15.8 6.9 15 8.5 15C10.1 15 11.6 15.8 12.5 17.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M14 15.2C15.1 15.4 16.1 16.1 16.8 17.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M7.5 5.5C7.9 5.1 8.6 5 9.1 5.4L10.9 6.9C11.4 7.3 11.5 8 11.1 8.5L10.3 9.6C10.8 10.7 11.7 11.7 12.8 12.2L13.9 11.4C14.4 11 15.1 11.1 15.5 11.6L17 13.4C17.4 13.9 17.3 14.6 16.9 15C16.2 15.7 15.4 16.1 14.5 16.1C10.1 16.1 6.5 12.5 6.5 8.1C6.5 7.2 6.8 6.3 7.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProfilePage() {
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleChat = async () => {
    try {
      await openChat({
        type: "oa",
        id: "2768058252194371751",
        message: "Chào DEV PỒ, tư vấn giúp mình nhé.",
      });
    } catch (e) {
      console.log(e);
      window.location.href = "https://zalo.me/4289073059490896771";
    }
  };

  const handleCall = async () => {
    try {
      await openPhone({ phoneNumber: "0909097177" });
    } catch (e) {
      window.location.href = "tel:0909097177";
    }
  };

  const openLink = async (url: string) => {
    try {
      await openWebview({ url, config: { style: "bottomSheet" } });
    } catch (e) {
      console.error("Error opening webview:", e);
    }
  };

  const handleCopyAddress = () => {
    const address = "3/39A Bình Giã, Phường 13, Tân Bình, TP. HCM";
    try {
      navigator.clipboard.writeText(address);
      showToast({
        message: "Đã sao chép địa chỉ",
      });
    } catch (e) {
      console.error("Error copying address:", e);
    }
  };

  return (
    <>
      <div className="px-3.5 pb-5 pt-2">
        <div className="rounded-2xl bg-white px-3 pb-6 pt-3 shadow-sm">
          <div className="text-center text-xxlarge-m text-text-primary">
            Liên hệ với DEV PỒ
          </div>
          <div className="text-center text-large text-text-secondary">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleChat}
              className="flex flex-col items-center gap-1 rounded-2xl bg-blue500 py-3 text-white active:bg-blue600"
            >
              <ActionIcon type="chat" />
              <span className="text-xsmall-m">Chat Zalo</span>
            </button>
            <button
              type="button"
              onClick={() => setShowGroupModal(true)}
              className="flex flex-col items-center gap-1 rounded-2xl bg-orange500 py-3 text-white active:bg-orange600"
            >
              <ActionIcon type="group" />
              <span className="text-xsmall-m">Nhóm Báo Giá</span>
            </button>
            <button
              type="button"
              onClick={handleCall}
              className="flex flex-col items-center gap-1 rounded-2xl bg-green500 py-3 text-white active:bg-green600"
            >
              <ActionIcon type="phone" />
              <span className="text-xsmall-m">Gọi Hotline</span>
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-elevation-01 p-3">
            <div className="mb-2 text-xxlarge-m text-text-primary">Vị trí cửa hàng</div>
            <div className="rounded-xl bg-white p-3 text-center">
              <div className="text-normal-sb text-text-primary mb-3">
                3/39A Bình Giã, Phường 13, Tân Bình, TP. HCM
              </div>

              <div className="flex h-40 w-full items-center justify-center rounded-xl bg-gray-50 border border-dashed border-gray-200">
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="text-xsmall">Bản đồ Zalo</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="mt-3 w-full rounded-full border border-divider01 bg-white py-2 text-small-m text-text-primary active:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Sao chép địa chỉ
              </button>
            </div>
          </div>

          {/* Social icons removed to comply with Zalo Mini App policies regarding third-party links */}

          <div className="mt-5 text-center text-xxsmall text-text-secondary">
            © 2026 DEV PỒ
          </div>
        </div>
      </div>

      {showGroupModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 pointer-events-auto">
          <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-[#f4f5f9] shadow-xl animate-fade-in relative pb-2 pt-2">
            <div className="px-4 py-3 pb-2">
              <h2 className="text-[16px] font-bold text-black text-center">Chọn Nhóm Báo Giá</h2>
              <button 
                onClick={() => setShowGroupModal(false)}
                className="absolute right-3 top-4 rounded-full bg-gray-200 p-1.5 text-gray-600 active:bg-gray-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-2 px-3 py-2">
              <button
                type="button"
                onClick={() => openLink("https://zalo.me/g/anrqrh676")}
                className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm border border-gray-100 active:bg-gray-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                  <span className="font-bold text-lg leading-none mt-0.5">Z</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[14px] font-bold text-gray-900">Nhóm Zalo (01)</span>
                  <span className="text-[11px] text-gray-500">Cập nhật bảng giá & Deal mới mỗi ngày</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openLink("https://zalo.me/g/nawgdc041")}
                className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm border border-gray-100 active:bg-gray-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                  <span className="font-bold text-lg leading-none mt-0.5">Z</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[14px] font-bold text-gray-900">Nhóm Zalo (02)</span>
                  <span className="text-[11px] text-gray-500">Kênh hỗ trợ kỹ thuật & giải đáp thắc mắc</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

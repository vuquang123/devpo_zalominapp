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

function SocialIcon({ type }: { type: "facebook" | "instagram" | "youtube" }) {
  const label =
    type === "facebook" ? "f" : type === "instagram" ? "◉" : "▶";
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-divider01 bg-white text-large-sb text-text-secondary">
      {label}
    </div>
  );
}

export default function ProfilePage() {
  return (
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
            className="flex flex-col items-center gap-1 rounded-2xl bg-blue500 py-3 text-white"
          >
            <ActionIcon type="chat" />
            <span className="text-xsmall-m">Chat Zalo</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1 rounded-2xl bg-orange500 py-3 text-white"
          >
            <ActionIcon type="group" />
            <span className="text-xsmall-m">Nhóm Báo Giá</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1 rounded-2xl bg-green500 py-3 text-white"
          >
            <ActionIcon type="phone" />
            <span className="text-xsmall-m">Gọi Hotline</span>
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-elevation-01 p-3">
          <div className="mb-2 text-xxlarge-m text-text-primary">Vị trí cửa hàng</div>
          <div className="rounded-xl bg-white p-3">
            <div className="text-normal-sb text-text-primary">
              3/39A Bình Giã, P. Tân Bình, TP. Hồ Chí Minh
            </div>

            <img
              src="https://static-maps.yandex.ru/1.x/?lang=vi_VN&ll=106.6402,10.8019&z=15&l=map&size=450,220&pt=106.6402,10.8019,pm2rdm"
              alt="Bản đồ cửa hàng DEV PỒ"
              className="mt-3 h-40 w-full rounded-xl object-cover"
              draggable={false}
            />

            <button
              type="button"
              className="mt-3 w-full rounded-full border border-divider01 bg-white py-2 text-small-m text-text-primary"
            >
              Chỉ đường bằng Google Maps
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-7">
          <div className="flex flex-col items-center gap-1">
            <SocialIcon type="facebook" />
            <span className="text-xxsmall text-text-secondary">Facebook</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <SocialIcon type="instagram" />
            <span className="text-xxsmall text-text-secondary">Instagram</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <SocialIcon type="youtube" />
            <span className="text-xxsmall text-text-secondary">YouTube</span>
          </div>
        </div>

        <div className="mt-5 text-center text-xxsmall text-text-secondary">
          © 2026 Dev PỒ (DevpoStore)
        </div>
      </div>
    </div>
  );
}

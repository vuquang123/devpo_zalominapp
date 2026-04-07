import { useMemo, useState } from "react";
import { ASSETS } from "@/constants/assets";

type Stage = "intro" | "survey" | "wheel" | "result";

type SurveyStep = {
  id: number;
  title: string;
  section: string;
  kind: "single" | "multi" | "text" | "phone";
  options?: string[];
  chips?: string[];
  placeholder?: string;
  note?: string;
};

const surveySteps: SurveyStep[] = [
  {
    id: 1,
    title: "Bạn đang dùng iPhone nào?",
    section: "PHẦN 1: THẤU HIỂU NHU CẦU",
    kind: "single",
    options: [
      "iPhone 13 Series trở xuống",
      "iPhone 14 Series / 15 Series",
      "iPhone 16 Series / 17 Series",
      "Đang dùng Android muốn qua iPhone",
    ],
  },
  {
    id: 2,
    title: "Dự định mua thêm máy?",
    section: "PHẦN 1: THẤU HIỂU NHU CẦU",
    kind: "single",
    options: [
      "Đang muốn mua ngay trong tháng này",
      "Khoảng 2 - 3 tháng tới",
      "Cuối năm nay hoặc khi có iPhone mới",
      "Chưa có nhu cầu, chỉ vào xem giá",
    ],
  },
  {
    id: 3,
    title: "Bạn đang quan tâm nhất?",
    section: "PHẦN 1: THẤU HIỂU NHU CẦU",
    kind: "text",
    placeholder: "Nhập dòng máy bạn quan tâm nhất...",
    note: "VÍ DỤ:IPHONE 13 PRO MAX, 15 PRO MAX...",
    chips: ["15 Pro Max", "16 Pro Max", "17 Pro", "17 Pro Max"],
  },
  {
    id: 4,
    title: "Tần suất gửi bảng giá?",
    section: "PHẦN 2: TỐI ƯU KÊNH ZALO & FB",
    kind: "single",
    options: [
      "Rất tốt, giúp tôi cập nhật giá sớm.",
      "Hơi nhiều, chỉ nên gửi 2-3 lần/tuần.",
      "Chỉ cần gửi khi có máy mới/Sale lớn.",
    ],
  },
  {
    id: 5,
    title: "Bạn muốn xem thêm gì?",
    section: "PHẦN 2: TỐI ƯU KÊNH ZALO & FB",
    kind: "multi",
    options: [
      "Video thực tế máy đang có tại shop",
      "Mẹo sử dụng, cách kiểm tra iPhone cũ",
      "Các deal phụ kiện đồng giá 9k, 99k",
      "Chương trình Thu cũ đổi mới",
    ],
  },
  {
    id: 6,
    title: "Số điện thoại nhận quà?",
    section: "PHẦN CUỐI: XÁC NHẬN NHẬN QUÀ",
    kind: "phone",
    placeholder: "Nhập số điện thoại của bạn...",
    note: "Shop sẽ gửi mã Voucher trúng thưởng vào số Zalo này của bạn. Vui lòng nhập chính xác nhé!",
  },
];

const wheelLabels = [
  "VOUCHER 100K",
  "VOUCHER 150K",
  "VOUCHER 200K",
  "VOUCHER 250K",
  "VOUCHER 30K",
  "VOUCHER 350K",
  "VOUCHER 400K",
  "VOUCHER 500K",
];

const voucherWeights = [
  { label: "VOUCHER 100K", weight: 40 },
  { label: "VOUCHER 150K", weight: 20 },
  { label: "VOUCHER 200K", weight: 15 },
  { label: "VOUCHER 250K", weight: 10 },
  { label: "VOUCHER 30K", weight: 7 },
  { label: "VOUCHER 350K", weight: 5 },
  { label: "VOUCHER 400K", weight: 2 },
  { label: "VOUCHER 500K", weight: 1 },
];

const confettiDots = [
  "top-4 left-6 bg-red-500",
  "top-10 left-14 bg-green-500",
  "top-5 left-24 bg-yellow-400",
  "top-8 right-8 bg-blue-500",
  "top-14 right-16 bg-fuchsia-500",
  "top-6 right-24 bg-lime-500",
];

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <rect x="3" y="10" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M12 10V21" stroke="currentColor" strokeWidth="2" />
      <path d="M3 14H21" stroke="currentColor" strokeWidth="2" />
      <path d="M5 10H19V8.8C19 7.8 18.2 7 17.2 7H6.8C5.8 7 5 7.8 5 8.8V10Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7C12 5.9 12.9 5 14 5C15.1 5 16 5.9 16 7" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7C12 5.9 11.1 5 10 5C8.9 5 8 5.9 8 7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function pickWeightedVoucher() {
  const totalWeight = voucherWeights.reduce((sum, item) => sum + item.weight, 0);
  const random = Math.random() * totalWeight;

  let cumulative = 0;
  for (const item of voucherWeights) {
    cumulative += item.weight;
    if (random <= cumulative) {
      return item.label;
    }
  }

  return voucherWeights[0].label;
}

export default function LuckyWheelPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [singleAnswers, setSingleAnswers] = useState<Record<number, string>>({});
  const [multiAnswers, setMultiAnswers] = useState<Record<number, string[]>>({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState("VOUCHER 200K");

  const currentStep = surveySteps[stepIndex];

  const canContinue = useMemo(() => {
    if (stage !== "survey") return true;

    if (currentStep.kind === "single") {
      return Boolean(singleAnswers[currentStep.id]);
    }
    if (currentStep.kind === "multi") {
      return (multiAnswers[currentStep.id] || []).length > 0;
    }
    if (currentStep.kind === "text" || currentStep.kind === "phone") {
      return Boolean((textAnswers[currentStep.id] || "").trim());
    }
    return true;
  }, [stage, currentStep, singleAnswers, multiAnswers, textAnswers]);

  const handleNext = () => {
    if (stepIndex < surveySteps.length - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }
    setStage("wheel");
  };

  const handleSpin = () => {
    if (isSpinning) return;

    const target = pickWeightedVoucher();
    const extra = 1440 + Math.floor(Math.random() * 360);

    setPrize(target);
    setIsSpinning(true);
    setRotation((prev) => prev + extra);

    setTimeout(() => {
      setIsSpinning(false);
      setStage("result");
    }, 2600);
  };

  return (
    <div className="flex h-full flex-col bg-background px-4 pb-4 pt-2">
      <div className="mx-auto mt-1">
        <img src={ASSETS.LOGO} alt="DEV PỒ" className="h-14 w-auto" draggable={false} />
      </div>

      {stage === "intro" && (
        <div className="mx-1 mt-4 rounded-[28px] bg-white px-6 py-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-divider01 bg-white text-neutral900 shadow-md">
            <GiftIcon />
          </div>
          <div className="mt-5 text-xxlarge-m text-text-primary">MỞ HỘP QUÀ</div>
          <div className="mx-auto mt-2 max-w-[220px] text-large text-text-secondary">
            Quan tâm Zalo OA để nhận quà ngay.
          </div>

          <button
            type="button"
            onClick={() => setStage("survey")}
            className="mt-6 w-full rounded-2xl bg-neutral900 py-3 text-xlarge-sb text-white"
          >
            QUAN TÂM ›
          </button>

          <div className="mt-8 text-xxxsmall-bl uppercase tracking-[2px] text-[#A8B3C7]">
            CHỨNG THỰC BỞI ZALO
          </div>
        </div>
      )}

      {stage === "survey" && (
        <div className="mx-1 mt-3 rounded-[24px] bg-white p-2 shadow-sm">
          <div className="rounded-full border border-divider01 bg-[#F7F9FC] py-1 text-center text-small-m text-text-primary">
            ⏱ KHẢO SÁT ĐỂ NHẬN QUÀ
          </div>

          <div className="mt-3 rounded-[22px] border border-divider01 bg-white p-2.5">
            <div className="flex items-center justify-between">
              <div className="text-normal-sb">BƯỚC {currentStep.id}/6</div>
              <div className="flex gap-1">
                {surveySteps.map((step) => (
                  <div
                    key={step.id}
                    className={`h-1.5 w-5 rounded-full ${
                      step.id <= currentStep.id ? "bg-neutral900" : "bg-neutral100"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 text-xxlarge-m text-text-primary">{currentStep.title}</div>
            <div className="mt-1 text-large text-text-secondary">{currentStep.section}</div>

            {currentStep.note && (
              <div className="mt-4 rounded-2xl bg-[#F3F6FB] p-3 text-large text-[#4E6A8D]">
                {currentStep.note}
              </div>
            )}

            {(currentStep.kind === "single" || currentStep.kind === "multi") && (
              <div className="mt-4 space-y-3">
                {currentStep.options?.map((option) => {
                  const isSingleActive = singleAnswers[currentStep.id] === option;
                  const isMultiActive = (multiAnswers[currentStep.id] || []).includes(option);
                  const isActive = isSingleActive || isMultiActive;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        if (currentStep.kind === "single") {
                          setSingleAnswers((prev) => ({ ...prev, [currentStep.id]: option }));
                          return;
                        }

                        setMultiAnswers((prev) => {
                          const list = prev[currentStep.id] || [];
                          const updated = list.includes(option)
                            ? list.filter((item) => item !== option)
                            : [...list, option];
                          return { ...prev, [currentStep.id]: updated };
                        });
                      }}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-large-sb ${
                        isActive
                          ? "border-[#93AACE] bg-[#EEF4FF] text-[#2F4A6C]"
                          : "border-divider01 bg-white text-[#2F4A6C]"
                      }`}
                    >
                      {currentStep.kind === "multi" && (
                        <span
                          className={`h-5 w-5 rounded border ${
                            isActive ? "border-[#2F4A6C] bg-[#2F4A6C]" : "border-divider01"
                          }`}
                        />
                      )}
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {(currentStep.kind === "text" || currentStep.kind === "phone") && (
              <div className="mt-4">
                <input
                  value={textAnswers[currentStep.id] || ""}
                  onChange={(event) =>
                    setTextAnswers((prev) => ({
                      ...prev,
                      [currentStep.id]: event.target.value,
                    }))
                  }
                  placeholder={currentStep.placeholder}
                  className="w-full rounded-2xl border border-divider01 px-4 py-3 text-xlarge text-text-primary outline-none"
                />

                {currentStep.chips && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {currentStep.chips.map((chip) => (
                      <button
                        type="button"
                        key={chip}
                        onClick={() =>
                          setTextAnswers((prev) => ({ ...prev, [currentStep.id]: chip }))
                        }
                        className="rounded-full bg-[#F3F5F8] px-4 py-1.5 text-small-m text-[#2F4A6C]"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                  className="w-[34%] rounded-2xl bg-[#EFF3F8] py-3 text-large-sb text-[#2F4A6C]"
                >
                  ‹ Quay lại
                </button>
              )}
              <button
                type="button"
                disabled={!canContinue}
                onClick={handleNext}
                className={`${stepIndex > 0 ? "w-[66%]" : "w-full"} rounded-2xl py-3 text-large-sb text-white ${
                  canContinue ? "bg-[#8D8F93]" : "bg-[#C7C9CC]"
                }`}
              >
                {stepIndex === surveySteps.length - 1 ? "Quay thưởng ngay!" : "Tiếp theo  ›"}
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === "wheel" && (
        <div className="mx-3 mt-6 text-center">
          <div className="text-[44px] font-bold leading-[52px] text-text-primary">THỬ VẬN MAY</div>
          <div className="mt-2 text-small-m tracking-[4px] text-[#A8B3C7]">CHẠM VÀO TÂM ĐỂ QUAY</div>

          <div className="mx-auto mt-4 w-[320px] rounded-[40px] border-2 border-[#8FA3C4] bg-white px-4 pb-8 pt-5">
            <div className="relative mx-auto h-[260px] w-[260px]">
              <div className="absolute left-1/2 top-0 z-10 h-8 w-5 -translate-x-1/2 rounded-b-full bg-neutral900" />
              <div
                className="absolute inset-0 rounded-full border-4 border-neutral900"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? "transform 2.5s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
                  background:
                    "conic-gradient(#1F2F49 0deg 45deg, #F1F5FA 45deg 90deg, #000 90deg 135deg, #F1F5FA 135deg 180deg, #1F2F49 180deg 225deg, #F1F5FA 225deg 270deg, #000 270deg 315deg, #F1F5FA 315deg 360deg)",
                }}
              />
              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning}
                className="absolute left-1/2 top-1/2 z-20 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#2A2A2A] bg-black text-small-m font-bold text-white"
              >
                DEV PỒ
              </button>
            </div>

            <div className="mt-4 text-small-m tracking-[4px] text-[#8FA3C4]">MIỄN PHÍ 1 LẦN QUAY</div>
          </div>
        </div>
      )}

      {stage === "result" && (
        <div className="relative mx-3 mt-6 rounded-[26px] bg-white px-6 pb-8 pt-6 text-center shadow-sm">
          {confettiDots.map((dot) => (
            <span key={dot} className={`absolute h-2 w-2 rounded-full ${dot}`} />
          ))}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-4xl text-white shadow-lg">
            🏆
          </div>

          <div className="mt-6 text-small-m tracking-[4px] text-[#A8B3C7]">CHÚC MỪNG</div>
          <div className="mt-2 text-[52px] font-black leading-[56px] text-text-primary">{prize}</div>

          <button
            type="button"
            className="mt-6 w-full rounded-2xl bg-neutral900 py-3 text-xlarge-sb text-white"
          >
            NHẬN QUÀ ✈
          </button>

          <button
            type="button"
            onClick={() => {
              setStage("intro");
              setStepIndex(0);
            }}
            className="mt-5 text-small-m tracking-[2px] text-[#C5D0E0]"
          >
            QUAY LẠI TRANG CHỦ
          </button>
        </div>
      )}

      <div className="mt-auto pb-2 pt-8 text-center text-xxxsmall-bl tracking-[3px] text-[#D4DCEA]">
        DEV PỒ STORE © 2026
      </div>
    </div>
  );
}

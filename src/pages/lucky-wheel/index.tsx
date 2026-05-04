import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { followOA, getAccessToken, getPhoneNumber, getUserInfo, openChat } from "zmp-sdk/apis";
import { ASSETS } from "@/constants/assets";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7Nx8shja4YgkjwI00-hH0Cg5B6putZftuq7HO9qIykicamdHfJdBzFFRwz4A_Vw26/exec"; // Link Webhook của shop DEV PỒ
const ZALO_SECRET_KEY = "O5XTTBiQVo5VpS7pD26s"; // Mã bí mật dùng để giải mã SĐT trực tiếp trên thiết bị

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
];

const wheelLabels = [
  "VOUCHER 100K",
  "VOUCHER 150K",
  "VOUCHER 200K",
  "VOUCHER 250K",
  "VOUCHER 300K",
  "VOUCHER 350K",
  "VOUCHER 400K",
  "VOUCHER 500K",
];

const voucherWeights = [
  { label: "VOUCHER 100K", weight: 54 },
  { label: "VOUCHER 150K", weight: 20 },
  { label: "VOUCHER 200K", weight: 10 },
  { label: "VOUCHER 250K", weight: 10 },
  { label: "VOUCHER 300K", weight: 5 },
  { label: "VOUCHER 350K", weight: 1 },
  { label: "VOUCHER 400K", weight: 0 },
  { label: "VOUCHER 500K", weight: 0 },
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
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [singleAnswers, setSingleAnswers] = useState<Record<number, string>>({});
  const [multiAnswers, setMultiAnswers] = useState<Record<number, string[]>>({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prize, setPrize] = useState("VOUCHER 200K");

  const [isFollowed, setIsFollowed] = useState(false);
  const [phoneToken, setPhoneToken] = useState("");
  const [isGettingPhone, setIsGettingPhone] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [alreadyParticipated, setAlreadyParticipated] = useState(false);
  const [savedPrize, setSavedPrize] = useState("");
  const [userName, setUserName] = useState("Khách hàng Zalo");

  const currentStep = surveySteps[stepIndex];

  // Check follow status & previous participation on mount
  useEffect(() => {
    const checkStatus = async () => {
      // Check LocalStorage first
      const result = localStorage.getItem("devpo_lucky_wheel_result");
      if (result) {
        setSavedPrize(result);
        setPrize(result);
      }

      try {
        const { userInfo } = await getUserInfo({});
        setUserName(userInfo.name);
        if (userInfo.followedOA) {
          setIsFollowed(true);
        }
      } catch (e) {
        console.log("Check follow status error", e);
      }
    };
    checkStatus();
  }, []);

  const canContinue = useMemo(() => {
    if (stage !== "survey") return true;

    if (currentStep.kind === "single") {
      return Boolean(singleAnswers[currentStep.id]);
    }
    if (currentStep.kind === "multi") {
      return (multiAnswers[currentStep.id] || []).length > 0;
    }
    if (currentStep.kind === "phone") {
      return Boolean(phoneToken);
    }
    if (currentStep.kind === "text") {
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

  /**
   * GIẢI MÃ SĐT TRỰC TIẾP TRÊN THIẾT BỊ (Vượt lỗi IP Việt Nam)
   */
  const decryptPhoneLocally = async (token: string, accessToken: string) => {
    try {
      // Thử dùng API graph.zalo.me/v2.0/me/info với code tham số
      const url = `https://graph.zalo.me/v2.0/me/info?access_token=${accessToken}&code=${token}&secret_key=${ZALO_SECRET_KEY}`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.data && result.data.number) {
        return result.data.number;
      }
      
      // Fallback: Thử tham số token nếu code không chạy
      const fallbackUrl = `https://graph.zalo.me/v2.0/me/phone_number?token=${token}`;
      const fallbackResp = await fetch(fallbackUrl, {
        headers: { "secret_key": ZALO_SECRET_KEY }
      });
      const fallbackResult = await fallbackResp.json();
      
      if (fallbackResult.data && fallbackResult.data.number) {
        return fallbackResult.data.number;
      }
      
      return null;
    } catch (e) {
      console.error("Local decryption failed:", e);
      return null;
    }
  };

  const handleStartCheck = async () => {
    try {
      // 1. Follow OA (Nếu chưa)
      if (!isFollowed) {
        await followOA({ id: "4289073059490896771" });
        setIsFollowed(true);
      }

      // 2. Lấy Token SĐT và Access Token của người dùng
      setIsGettingPhone(true);
      const { token } = await getPhoneNumber({});
      const accessToken = await getAccessToken({});
      
      if (!token) {
        alert("Để xác thực giải thưởng và đảm bảo tính công bằng, chương trình yêu cầu bạn cung cấp SĐT Zalo. Bạn vui lòng thử lại nhé!");
        setIsGettingPhone(false);
        return;
      }

      // GIẢI MÃ SĐT TRỰC TIẾP TẠI ĐÂY
      const decryptedPhone = await decryptPhoneLocally(token, accessToken);
      const finalIdentifier = decryptedPhone || `ZALO_TOKEN:${token}`;
      
      setPhoneToken(finalIdentifier);
      setIsGettingPhone(false);

      // 3. Kiểm tra với Google Sheet (Chỉ gửi SĐT đã giải mã nếu thành công)
      setIsValidating(true);
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          type: "CHECK",
          phoneNumber: finalIdentifier
        }),
      });

      const resultText = await response.text();
      setIsValidating(false);

      if (resultText.startsWith("ALREADY_SPUN:")) {
        const p = resultText.replace("ALREADY_SPUN:", "");
        setPrize(p);
        setSavedPrize(p);
        setAlreadyParticipated(true);
        setStage("result");
        localStorage.setItem("devpo_lucky_wheel_result", p);
        return;
      }

      // 4. Nếu là người dùng mới, xóa bộ nhớ cũ (nếu có) và bắt đầu khảo sát
      localStorage.removeItem("devpo_lucky_wheel_result");
      setStage("survey");
    } catch (e: any) {
      console.log("Start check error:", e);
      setIsValidating(false);
      setIsGettingPhone(false);
      alert("Gặp lỗi khi xác thực tài khoản. Vui lòng thử lại sau!");
    }
  };

  const submitResultsToSheet = async (finalPrize: string) => {
    try {
      const payload = {
        type: "SUBMIT",
        userName,
        phoneNumber: phoneToken,
        currentIphone: singleAnswers[1] || "N/A",
        purchaseIntent: singleAnswers[2] || "N/A",
        interestedModel: textAnswers[3] || "N/A",
        pricingFreq: singleAnswers[4] || "N/A",
        contentPrefs: multiAnswers[5] || [],
        prize: finalPrize
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error("Auto-submit error:", e);
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;

    const target = pickWeightedVoucher();
    const extra = 1440 + Math.floor(Math.random() * 360);

    setIsSpinning(true);
    setRotation((prev) => prev + extra);

    setTimeout(() => {
      setIsSpinning(false);
      setPrize(target);
      setStage("result");
      localStorage.setItem("devpo_lucky_wheel_result", target);
      submitResultsToSheet(target);
    }, 2600);
  };

  const handleClaimPrize = async () => {
    try {
      await openChat({ 
        type: "oa", 
        id: "4289073059490896771", 
        message: `Chào shop, mình vừa quay trúng ${prize}! Mình đã cung cấp SĐT qua Zalo. Tư vấn cho mình trúng thưởng nhé.` 
      });
    } catch (e) {
      console.log("Open chat error:", e);
      alert("Gặp lỗi khi mở Chat, bạn vui lòng chụp màn hình phần thưởng và nhắn tin cho Shop nhé!");
    }
  };

  return (
    <div className="relative flex h-full flex-col overflow-x-hidden overflow-y-auto bg-gradient-to-tr from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] px-3 pb-4 pt-2 sm:px-4">
      {/* Background Glow Effect */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <button 
        onClick={() => navigate(-1)} 
        className="absolute left-4 top-11 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md shadow-sm z-[100] border border-white/10 active:bg-white/20"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white -ml-0.5">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="mx-auto mt-1 flex w-full justify-center px-6 transition-transform hover:scale-105">
        <img 
          src={ASSETS.LOGO} 
          alt="DEV PỒ" 
          className="w-[40%] max-w-[160px] h-auto object-contain invert brightness-[2]" 
          draggable={false} 
        />
      </div>

      {stage === "intro" && (
        <div className="mx-1 mt-3 rounded-[32px] border border-white/10 bg-white/5 px-6 py-7 text-center shadow-2xl backdrop-blur-xl animate-fade-in sm:mt-5 sm:py-9">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-gradient-to-tr from-white/10 to-transparent text-white shadow-xl animate-bounce-slow">
            <GiftIcon />
          </div>
          <div className="mt-6 text-[28px] font-black tracking-tight text-white uppercase italic">MỞ HỘP QUÀ</div>
          <div className="mx-auto mt-2 max-w-[240px] text-[15px] font-medium text-white/50 leading-relaxed">
            Quan tâm Zalo OA để nhận ngay các món quà đặc quyền từ DEV PỒ.
          </div>

          <button
            type="button"
            disabled={isGettingPhone || isValidating}
            onClick={handleStartCheck}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-[16px] font-black text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all active:scale-[0.98] sm:mt-9"
          >
            {(isGettingPhone || isValidating) ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ĐANG XÁC THỰC...
              </>
            ) : (
              "QUAN TÂM NHẬN QUÀ ›"
            )}
          </button>

          <div className="mt-6 text-[9px] font-bold uppercase tracking-[4px] text-white/20 sm:mt-8">
            CHỨNG THỰC BỞI ZALO
          </div>
        </div>
      )}

      {stage === "survey" && (
        <div className="mx-0.5 mt-4 flex flex-1 flex-col animate-fade-in text-white sm:mx-1">
          <div className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md py-2 text-center text-[10px] font-bold tracking-[3px] text-white/60 uppercase">
            ⏱ KHẢO SÁT ĐỂ NHẬN QUÀ
          </div>

          <div className="mt-3 flex flex-1 flex-col rounded-[28px] border border-white/10 bg-white/5 p-3.5 shadow-2xl backdrop-blur-xl sm:mt-4 sm:rounded-[32px] sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 sm:text-[12px] sm:tracking-widest">BƯỚC {currentStep.id}/5</div>
            <div className="flex flex-wrap justify-end gap-1 sm:gap-1.5">
              {surveySteps.map((step) => (
                <div
                  key={step.id}
                  className={`h-1.5 w-5 rounded-full transition-all duration-300 sm:w-7 ${
                    step.id <= currentStep.id ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            </div>

            <div className="mt-4 text-[20px] font-black leading-tight text-white sm:mt-6 sm:text-[24px]">{currentStep.title}</div>
            <div className="mt-1 text-[11px] font-bold uppercase italic tracking-wide text-white/30 sm:text-[13px]">{currentStep.section}</div>

            {currentStep.note && (
              <div className="mt-5 rounded-2xl border border-white/5 bg-white/5 p-4 text-[13px] font-medium leading-relaxed text-white/50">
                {currentStep.note}
              </div>
            )}

            <div className="mt-4 flex-1 overflow-y-auto sm:mt-6">
              {(currentStep.kind === "single" || currentStep.kind === "multi") && (
                <div className="space-y-3 pb-4">
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
                        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 sm:gap-4 sm:px-5 sm:py-4 ${
                          isActive
                            ? "border-white bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
                            : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                        }`}
                      >
                        {currentStep.kind === "multi" && (
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                              isActive ? "border-black bg-black" : "border-white/20"
                            }`}
                          >
                            {isActive && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>}
                          </div>
                        )}
                        <span className="break-words text-[14px] font-bold sm:text-[15px]">{option}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Bước SĐT đã được xử lý ở màn hình Intro */}

              {currentStep.kind === "text" && (
                <div className="mt-2 pb-4">
                  <input
                    value={textAnswers[currentStep.id] || ""}
                    onChange={(event) =>
                      setTextAnswers((prev) => ({
                        ...prev,
                        [currentStep.id]: event.target.value,
                      }))
                    }
                    placeholder={currentStep.placeholder}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-[16px] font-bold text-white outline-none transition-all placeholder:text-white/20 focus:border-white/30 sm:px-5 sm:py-4 sm:text-[17px]"
                  />

                  {currentStep.chips && (
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {currentStep.chips.map((chip) => (
                        <button
                          type="button"
                          key={chip}
                          onClick={() =>
                            setTextAnswers((prev) => ({ ...prev, [currentStep.id]: chip }))
                          }
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-bold text-white/70 transition-all active:bg-white active:text-black sm:px-5 sm:text-[13px]"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-auto flex gap-2 border-t border-white/5 pt-3 sm:gap-3 sm:pt-4">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                  className="w-[36%] rounded-2xl bg-white/10 py-3 text-[13px] font-black text-white/60 transition-all active:bg-white/20 sm:w-[34%] sm:py-4 sm:text-[14px]"
                >
                  QUAY LẠI
                </button>
              )}
              <button
                type="button"
                disabled={!canContinue}
                onClick={handleNext}
                className={`${stepIndex > 0 ? "w-[64%] sm:w-[66%]" : "w-full"} rounded-2xl py-3 text-[13px] font-black transition-all sm:py-4 sm:text-[14px] ${
                  canContinue ? "bg-white text-black shadow-lg active:scale-[0.98]" : "bg-white/20 text-white/20"
                }`}
              >
                {stepIndex === surveySteps.length - 1 ? "QUAY THƯỞNG NGAY!" : "TIẾP THEO"}
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === "wheel" && (
        <div className="mx-3 mt-0 text-center animate-fade-in relative z-10 flex flex-1 flex-col justify-start pt-0">
          <div className="text-[32px] font-black leading-tight text-white drop-shadow-md mt-2">THỬ VẬN MAY</div>
          <div className="mt-1 text-[11px] font-bold tracking-[3px] text-white/40 uppercase">Chạm vào tâm để quay</div>

          <div className="relative mx-auto mt-10 flex h-[340px] w-[340px] items-center justify-center">
            {/* Outer Rim Decor with Golden Gradient */}
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-[#8a6d3b] via-[#ffd700] to-[#8a6d3b] p-[4px] shadow-[0_0_30px_rgba(255,215,0,0.3)] animate-pulse-slow">
              <div className="h-full w-full rounded-full bg-[#1c1c1e] shadow-inner" />
            </div>
            <div className="absolute inset-0 rounded-full border-[1px] border-white/10" />

            {/* Pointer / Needle */}
            <div className="absolute -top-3 left-1/2 z-50 h-10 w-8 -translate-x-1/2 drop-shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                <path d="M12 24L20 4H4L12 24Z" fill="#ffd700" />
                <path d="M12 20L18 6H6L12 20Z" fill="#ffb400" />
              </svg>
            </div>

            {/* The Rotating Wheel */}
            <div
              className="relative h-[300px] w-[300px] rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? "transform 3.5s cubic-bezier(0.15, 0, 0.15, 1)" : "none",
                background: `conic-gradient(
                  #1c1c1e 0deg 45deg, 
                  #2c2c2e 45deg 90deg, 
                  #1c1c1e 90deg 135deg, 
                  #2c2c2e 135deg 180deg, 
                  #1c1c1e 180deg 225deg, 
                  #2c2c2e 225deg 270deg, 
                  #1c1c1e 270deg 315deg, 
                  #2c2c2e 315deg 360deg
                )`
              }}
            >
              {/* Segment Dividers */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-0 h-1/2 w-[1px] origin-bottom bg-white/10"
                  style={{ transform: `translateX(-50%) rotate(${i * 45}deg)` }}
                />
              ))}

              {/* Labels */}
              {wheelLabels.map((label, i) => (
                <div
                  key={label}
                  className="absolute left-1/2 top-4 w-20 -translate-x-1/2 origin-[center_134px] text-center"
                  style={{ transform: `translateX(-50%) rotate(${i * 45 + 22.5}deg)` }}
                >
                  <span className={`text-[10px] font-black uppercase leading-tight ${label === "VOUCHER 500K" ? "text-[#ffd700]" : "text-white/80"}`}>
                    {label.replace("VOUCHER ", "")}
                  </span>
                </div>
              ))}
            </div>

            {/* Center Hub / Spin Button */}
            <button
              type="button"
              onClick={handleSpin}
              disabled={isSpinning}
              className={`absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 border-[#1c1c1e] shadow-2xl transition-all active:scale-90 ${
                isSpinning ? "bg-gray-800 opacity-80" : "bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] hover:brightness-110"
              }`}
            >
              <span className="text-[10px] font-bold tracking-tighter text-white opacity-60">QUAY</span>
              <span className="text-[14px] font-black text-white">DEV PỒ</span>
              <div className="absolute inset-1 rounded-full border border-white/5" />
            </button>
          </div>

          <div className="mt-8 text-[12px] font-medium italic text-white/30 tracking-widest">MIỄN PHÍ 1 LẦN QUAY</div>
        </div>
      )}

      {stage === "result" && (
        <div className="relative mx-3 mt-6 overflow-hidden rounded-[32px] bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] px-6 pb-10 pt-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 animate-scale-up">
          {confettiDots.map((dot, i) => (
            <span key={i} className={`absolute h-2 w-2 rounded-full animate-ping ${dot}`} style={{ animationDelay: `${i * 0.2}s` }} />
          ))}

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-[#ffd700] to-[#ffb400] text-5xl shadow-[0_0_30px_rgba(255,215,0,0.3)]">
            🎁
          </div>

          <div className="mt-8 text-[11px] font-bold tracking-[5px] text-white/40 uppercase">Chúc mừng bạn!</div>
          <div className={`mt-3 text-[54px] font-[1000] leading-none tracking-tighter drop-shadow-lg ${prize.includes("500") ? "text-[#ffd700]" : "text-white"}`}>
            {prize.replace("VOUCHER ", "")}
          </div>
          <div className="mt-2 text-[14px] font-medium text-white/60 italic">Bạn đã nhận được Voucher {prize.replace("VOUCHER ", "")}</div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleClaimPrize}
            className={`mt-10 w-full rounded-2xl py-4 text-[16px] font-black tracking-widest text-black transition-all shadow-xl ${
              isSubmitting 
                ? "bg-gray-500 opacity-50" 
                : "bg-gradient-to-r from-[#ffd700] via-[#fff5a5] to-[#ffb400] active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? "ĐANG LƯU HỆ THỐNG..." : "NHẬN QUÀ NGAY ✈"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 text-small-m tracking-[2px] text-[#C5D0E0] font-bold uppercase"
          >
            QUAY LẠI TRANG CHỦ
          </button>
        </div>
      )}

      <div
        className={`pb-2 text-center text-xxxsmall-bl tracking-[3px] text-[#D4DCEA] ${
          stage === "intro" ? "mt-4 pt-4" : "mt-auto pt-8"
        }`}
      >
        DEV PỒ STORE © 2026
      </div>
    </div>
  );
}

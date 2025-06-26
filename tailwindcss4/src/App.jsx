import React, { useState, useEffect } from "react";
import tiktok from "./assets/social-media.jpg";
import logo from "./assets/WeTrip Avatar.jpg";
import { getCount, incrementCount } from "./firebase";
import banner from "./assets/banner.jpg";
import banner_mobile from "./assets/banner_mobile.jpg";
import apple from "./assets/apple1.jpg";
import android from "./assets/android1.jpg";
// ============================================================================
// Icon Components (Replaced lucide-react for standalone functionality)
// ============================================================================

// Icon: ArrowRight
const ArrowRightIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// Icon: Download
const DownloadIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

// Icon: Check (for success message)
const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Icon: Facebook
const FacebookIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
  </svg>
);

const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

// NOTE: TikTokIcon component has been removed and will be replaced by an <img> tag.

// ============================================================================
// Hero Section
// ============================================================================
const HeroSection = () => {
  const [isSocialsVisible, setIsSocialsVisible] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [isCountLoading, setIsCountLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPlatformOptions, setShowPlatformOptions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    const loadCount = async () => {
      setIsCountLoading(true);
      try {
        const count = await getCount();
        setDownloadCount(count);
      } catch (error) {
        setDownloadCount(0);
      } finally {
        setIsCountLoading(false);
      }
    };
    loadCount();
  }, []);

  const handleDownloadClick = async () => {
    setIsLoading(true);
    try {
      await incrementCount();
      setDownloadCount((prev) => prev + 1);

      // Hiển thị 2 nền tảng
      setShowPlatformOptions(true);

      // Hiển thị thông báo thành công như cũ (tuỳ ý, có thể bỏ)
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert("Có lỗi xảy ra khi tải ứng dụng. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPlatformOptions = () => {
    setShowPlatformOptions(!showPlatformOptions);
  }

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background Image and Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${isMobile ? banner_mobile : banner})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
        >
          Hãy đến với chúng tôi
          <span
            className="block w-full text-center pb-2"
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              background: "linear-gradient(90deg, #7fffd4 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `
      0 2px 6px rgba(0,0,0,0.18)  /* chỉ một bóng đen nhạt cho nổi chữ, KHÔNG glow trắng */
    `,
              lineHeight: 1.38,
              marginTop: "0.5em",
            }}
          >
            We Trip
          </span>
        </h1>

        <p
          className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-10 mt-10"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
        >
          Trải nghiệm những chuyến du lịch tuyệt vời cùng chúng tôi. Khám phá vẻ
          đẹp thiên nhiên và văn hóa độc đáo của đất nước hình chữ S.
        </p>

        {/* UX FIX: Changed to a flex-col layout. Replaced hover with onClick to toggle social icons. */}
        <div className="flex flex-col gap-4 justify-center items-center">
          {/* Container for the "Explore" button and its expandable social links */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <button
              onClick={() => setIsSocialsVisible(!isSocialsVisible)}
              className="group w-full sm:w-auto px-8 py-4 bg-white/10 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Khám phá ngay
              <ArrowRightIcon
                className={`transition-transform duration-300 w-5 h-5 ${
                  isSocialsVisible ? "rotate-90" : "group-hover:translate-x-1"
                }`}
              />
            </button>

            {/* Conditionally rendered social media icons. They now appear in the normal flow. */}
            {isSocialsVisible && (
              <div className="mt-4 flex items-center justify-center gap-3 animate-fade-in">
                <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                <a
                  href="https://www.facebook.com/wetrip.innox"
                  aria-label="Facebook"
                  className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-[#1877F2] transition-colors"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@wetrip.innox"
                  aria-label="TikTok"
                  className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white transition-colors flex items-center justify-center"
                >
                  <img src={tiktok} alt="TikTok Logo" className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            {/* Nút tải ứng dụng luôn hiện */}
            <button
              onClick={handleShowPlatformOptions}
              disabled={isLoading}
              className="group w-full sm:w-auto px-8 py-4 bg-teal-500 border-2 border-teal-500 text-white rounded-full font-semibold text-lg hover:bg-teal-600 hover:border-teal-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <DownloadIcon className="w-5 h-5" />
              {isLoading ? "Đang tải..." : "Tải ứng dụng"}
            </button>

            {/* Slide logo nền tảng xuống khi showPlatformOptions */}
            <div
              className={`
      flex items-center justify-center gap-3
      transition-all duration-300 
      ${
        showPlatformOptions
          ? "opacity-100 translate-y-0 pointer-events-auto mt-4"
          : "opacity-0 -translate-y-4 pointer-events-none h-0"
      }
    `}
              style={{ minHeight: showPlatformOptions ? 56 : 0 }} // giữ chiều cao khi ẩn/hiện
            >
              <a
              //Link tair IOS
                href="https://apps.apple.com/app/id0000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tải cho iOS"
                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center"
                onClick={async (e) => {
                  setIsLoading(true);
                  try {
                    await incrementCount();
                    setDownloadCount((prev) => prev + 1);
                    setShowSuccess(true);
                    setShowPlatformOptions(false);
                    setTimeout(() => setShowSuccess(false), 3000);
                  } catch {
                    alert("Có lỗi xảy ra khi tải ứng dụng. Vui lòng thử lại!");
                  } finally {
                    setIsLoading(false);
                  }
                  // không preventDefault để link tự mở
                }}
              >
                <img src={apple} alt="Tải cho iOS" className="w-7 h-7" />
              </a>
              <a
              //Link tair Android
                href="https://expo.dev/artifacts/eas/w5HRKyFmXJNi3qwWsWqTL8.apk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tải cho Android"
                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center"
                onClick={async (e) => {
                  setIsLoading(true);
                  try {
                    await incrementCount();
                    setDownloadCount((prev) => prev + 1);
                    setShowSuccess(true);
                    setShowPlatformOptions(false);
                    setTimeout(() => setShowSuccess(false), 3000);
                  } catch {
                    alert("Có lỗi xảy ra khi tải ứng dụng. Vui lòng thử lại!");
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                <img src={android} alt="Tải cho Android" className="w-7 h-7" />
              </a>
            </div>

            {/* Đếm số lần tải */}
            <div className="text-sm text-slate-300 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {isCountLoading ? (
                <span className="text-teal-300">Đang tải...</span>
              ) : (
                <>
                  <span className="font-semibold text-teal-300">
                    {downloadCount.toLocaleString()}
                  </span>{" "}
                  người đã tải
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckIcon className="w-5 h-5" />
          <span>Tải ứng dụng thành công!</span>
        </div>
      )}
    </section>
  );
};

// ============================================================================
// Main App Component
// ============================================================================
export default function App() {
  return (
    <div className="bg-slate-900 font-sans antialiased">
      <main>
        <HeroSection />
      </main>
    </div>
  );
}

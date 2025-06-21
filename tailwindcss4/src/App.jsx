import React, { useState, useEffect } from 'react';
import tiktok from "./assets/social-media.jpg"
import logo from "./assets/WeTrip Avatar.jpg"
import { getCount, incrementCount } from './firebase';
// ============================================================================
// Icon Components (Replaced lucide-react for standalone functionality)
// ============================================================================

// Icon: ArrowRight
const ArrowRightIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

// Icon: Download
const DownloadIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

// Icon: Check (for success message)
const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Icon: Facebook
const FacebookIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
  </svg>
);

// Icon: Instagram
const InstagramIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// NOTE: TikTokIcon component has been removed and will be replaced by an <img> tag.

// ============================================================================
// Hero Section
// ============================================================================
const HeroSection = () => {
  // State to manage the visibility of the social media icons
  const [isSocialsVisible, setIsSocialsVisible] = useState(false);
  // UX FIX: State to manage logo text visibility on click
  const [isLogoTextVisible, setIsLogoTextVisible] = useState(false);
  // State để lưu số lần bấm nút tải ngay
  const [downloadCount, setDownloadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCountLoading, setIsCountLoading] = useState(true);

  // Load số lần tải khi component mount
  useEffect(() => {
    const loadCount = async () => {
      setIsCountLoading(true);
      try {
        const count = await getCount();
        setDownloadCount(count);
      } catch (error) {
        console.error('Lỗi khi tải số lần tải:', error);
        // Hiển thị 0 nếu có lỗi
        setDownloadCount(0);
      } finally {
        setIsCountLoading(false);
      }
    };
    
    loadCount();
  }, []);

  // Hàm xử lý khi bấm nút tải ngay
  const handleDownloadClick = async () => {
    setIsLoading(true);
    try {
      await incrementCount();
      // Cập nhật count ngay lập tức để UX tốt hơn
      setDownloadCount(prev => prev + 1);
      console.log("Download App Clicked - Count updated");
      
      // Hiển thị thông báo thành công
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); // Ẩn sau 3 giây
    } catch (error) {
      console.error('Lỗi khi tăng số lần tải:', error);
      alert('Có lỗi xảy ra khi tải ứng dụng. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* UX FIX: Changed logo behavior from hover to click */}
      <div className="absolute top-5 left-5 sm:top-8 sm:left-8 z-20">
          <div
            onClick={() => setIsLogoTextVisible(!isLogoTextVisible)}
            className="flex cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-black/30 p-1.5 shadow-md transition-all duration-500 ease-in-out hover:bg-black/50 hover:shadow-lg backdrop-blur-sm"
          >
            <img
              className="h-14 w-14 shrink-0 rounded-full object-cover"
              src={logo}
              alt="We Trip Logo"
            />
            <div className={`grid h-12 transition-[grid-template-columns] duration-500 ease-in-out ${isLogoTextVisible ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'}`}>
              <div className="flex items-center overflow-hidden">
                <span className="whitespace-nowrap pr-4 text-2xl font-bold text-teal-300">
                  We Trip
                </span>
              </div>
            </div>
          </div>
      </div>
      {/* Background Image and Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80")',
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
          {/* FIX: Added padding-bottom to prevent clipping of diacritics */}
          <span className="block mt-2 pb-3 bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
            We Trip
          </span>
        </h1>
        <p
          className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-10"
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
                className={`transition-transform duration-300 w-5 h-5 ${isSocialsVisible ? 'rotate-90' : 'group-hover:translate-x-1'}`}
              />
            </button>

            {/* Conditionally rendered social media icons. They now appear in the normal flow. */}
            {isSocialsVisible && (
              <div
                className="mt-4 flex items-center justify-center gap-3 animate-fade-in"
              >
                <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                <a href="https://www.facebook.com/wetrip.innox" aria-label="Facebook" className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-[#1877F2] transition-colors">
                  <FacebookIcon className="w-5 h-5"/>
                </a>
                <a href="https://www.tiktok.com/@wetrip.innox" aria-label="TikTok" className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white transition-colors flex items-center justify-center">
                  <img src={tiktok} alt="TikTok Logo" className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

          {/* Download button với count */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleDownloadClick}
              disabled={isLoading}
              className="group w-full sm:w-auto px-8 py-4 bg-teal-500 border-2 border-teal-500 text-white rounded-full font-semibold text-lg hover:bg-teal-600 hover:border-teal-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <DownloadIcon className="w-5 h-5" />
              {isLoading ? 'Đang tải...' : 'Tải ứng dụng'}
            </button>
            
            {/* Hiển thị số lần tải */}
            <div className="text-sm text-slate-300 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {isCountLoading ? (
                <span className="text-teal-300">Đang tải...</span>
              ) : (
                <>
                  <span className="font-semibold text-teal-300">{downloadCount.toLocaleString()}</span> người đã tải
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
}


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


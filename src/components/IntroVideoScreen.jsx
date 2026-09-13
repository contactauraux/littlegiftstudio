import React, { useState, useRef, useEffect } from 'react';

export default function IntroVideoScreen({ onComplete }) {
  const videoRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const hasFinishedRef = useRef(false);

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 7) {
      handleFinish();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Autoplay prevented:', err);
      });
    }

    // Safety fallback timer in case timeUpdate event is delayed
    const timer = setTimeout(() => {
      handleFinish();
    }, 7600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden transition-opacity duration-600 ease-out cursor-pointer ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        src="/media/intro-video.mp4"
        autoPlay
        playsInline
        muted
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleFinish}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

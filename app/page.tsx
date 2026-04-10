"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCounting, setIsCounting] = useState(false);
  const [seconds, setSeconds] = useState(5); // カウントダウンは5秒
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const REDIRECT_URL = "https://b-short.link/kmDpry";

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  
  // 動画が再生開始されたら3秒タイマーをスタート
  const handlePlay = () => {
    setTimeout(() => {
      setIsCounting(true);
    }, 3000); // ここで「3秒後」を指定
  };

  // カウントダウンと自動遷移
  useEffect(() => {
    if (!isCounting) return;
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
      videoRef.current?.pause();
      window.location.href = REDIRECT_URL;
    }
  }, [isCounting, seconds]);

  return (
    <div style={{ backgroundColor: '#000', height: '100dvh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dpakyf8su/video/upload/q_auto/f_auto/v1775783637/kijyoi_repjqj.mp4"
        autoPlay
        muted
        playsInline
        loop
        onPlay={handlePlay} // 再生開始イベントをトリガーにする
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          objectFit: 'cover', zIndex: 1, opacity: isReady ? 0.6 : 1, transition: 'opacity 0.5s'
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {isCounting && (
          <a 
            href={REDIRECT_URL}
            style={{ 
              backgroundColor: '#ff69b4', color: 'white', padding: '12px 20px', borderRadius: '16px', 
              width: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)', border: '2px solid white', 
              marginBottom: '30px', textDecoration: 'none', animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>【アプリ限定】</p>
              <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>フル動画公開中♡</p>
            </div>
            
            <div style={{ 
              backgroundColor: isReady ? '#fff' : 'rgba(255,255,255,0.2)', 
              color: isReady ? '#ff69b4' : '#fff',
              padding: '6px 16px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.9rem',
              animation: isReady ? 'pulse 1.2s infinite' : 'none', transition: 'all 0.3s'
            }}>
              {isReady ? '続きを見る' : `今すぐ見る (${seconds}s)`}
            </div>
          </a>
        )}

        {!isReady && (
          <button 
            onClick={toggleMute}
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '8px 20px', borderRadius: '30px', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            音声 {isMuted ? 'ON' : 'OFF'}
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.7); } 70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255,255,255,0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0); } }
      `}</style>

      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 5, pointerEvents: 'none' }} />
    </div>
  );
}

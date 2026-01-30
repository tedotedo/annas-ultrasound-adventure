import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';

// Import images and video from the book
import scanRoom from '../../assets/images/scenes/scan_room.png';
import backgroundVideo from '../../assets/images/scenes/Animated_Chat_Video_Generation.mp4';

function Home() {
  const videoRef = useRef(null);

  // Fade effect for smooth looping
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const timeLeft = video.duration - video.currentTime;
      // Fade out in last 0.5 seconds
      if (timeLeft < 0.5) {
        video.style.opacity = Math.max(0.05, (timeLeft / 0.5) * 0.15);
      } else if (video.currentTime < 0.5) {
        // Fade in during first 0.5 seconds
        video.style.opacity = Math.min(0.15, (video.currentTime / 0.5) * 0.15);
      } else {
        video.style.opacity = 0.15;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);
  const menuItems = [
    {
      to: '/team',
      label: 'Meet the Team',
      description: 'Say hello to Anna, Tedrick and friends',
      bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200',
      borderColor: 'hover:border-pink-400',
    },
    {
      to: '/explore',
      label: 'Explore the Scan Room',
      description: "See what's inside",
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      borderColor: 'hover:border-blue-400',
    },
    {
      to: '/checklist',
      label: 'Getting Ready Checklist',
      description: 'Prepare for your visit',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
      borderColor: 'hover:border-green-400',
    },
    {
      to: '/book',
      label: 'Get the Book',
      description: "Read Anna's story",
      bgColor: 'bg-gradient-to-br from-amber-100 to-orange-200',
      borderColor: 'hover:border-orange-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-fun relative overflow-hidden">
      {/* Animated background video - subtle and reassuring */}
      <video
        ref={videoRef}
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 object-cover transition-opacity duration-300"
        style={{
          opacity: 0.15,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-6 md:py-8 min-h-screen">
        {/* Header with Anna and Tedrick */}
        <header className="text-center mb-4 md:mb-6">
          {/* Anna with Tedrick image from the book */}
          <div className="mb-3 md:mb-4">
            <img
              src={scanRoom}
              alt="Anna with Tedrick and Mum in the scan room"
              className="w-64 md:w-80 object-contain rounded-3xl border-4 border-white shadow-lg mx-auto animate-float-slow"
            />
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark font-heading mb-1 md:mb-2">
            Anna's Ultrasound
            <span className="block text-primary-blue">Adventure</span>
          </h1>
          <p className="text-base md:text-lg text-text-light font-semibold">
            Get ready for your scan with Anna and Tedrick!
          </p>
        </header>

        {/* Navigation Buttons */}
        <nav className="w-full max-w-md space-y-1.5 md:space-y-2 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block w-full ${item.bgColor} rounded-lg md:rounded-xl py-2 px-3 md:py-2.5 md:px-4
                         shadow-md hover:shadow-lg
                         transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                         border border-white/70 ${item.borderColor}
                         focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2`}
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-text-dark font-heading block">
                    {item.label}
                  </span>
                  <span className="text-xs text-text-light/90 block">
                    {item.description}
                  </span>
                </div>
                <span className="text-text-light/60 text-base flex-shrink-0">→</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* About Button */}
        <div className="w-full max-w-md px-2 mt-4">
          <Link
            to="/about"
            className="block w-full bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg md:rounded-xl py-2 px-3 md:py-2.5 md:px-4
                       shadow-md hover:shadow-lg
                       transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                       border border-white/70 hover:border-purple-400
                       focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
          >
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold text-text-dark font-heading block">
                  About & Privacy
                </span>
                <span className="text-xs text-text-light/90 block">
                  Meet the author and more
                </span>
              </div>
              <span className="text-text-light/60 text-base flex-shrink-0">→</span>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-4 md:pt-6 text-center">
          <p className="text-text-light text-sm">
            Based on the book by Dr Moira McCarty
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;

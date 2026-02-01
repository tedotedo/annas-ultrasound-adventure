import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { hotspots } from '../data/hotspots';
import { useSpeech } from '../hooks/useSpeech';

// Import scan room image
import scanRoom from '../../assets/images/scan-room.png';

// Import audio files
import ultrasoundMachineAudio from '../../assets/Ultrasound_machine.m4a';

// Map audio keys to imported files
const audioFiles = {
  'ultrasound-machine': ultrasoundMachineAudio
};

function Explore() {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(null);
  const { speak, stop, isSpeaking, currentId } = useSpeech();

  const handleHotspotClick = (hotspot) => {
    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stop();

    setSelectedHotspot(hotspot);

    // If hotspot has a recorded audio file, play it
    if (hotspot.audio && audioFiles[hotspot.audio]) {
      const audio = new Audio(audioFiles[hotspot.audio]);
      audioRef.current = audio;
      setIsPlayingAudio(true);
      audio.play().catch(console.error);
      audio.onended = () => setIsPlayingAudio(false);
    } else {
      // Fall back to text-to-speech
      speak(hotspot.explanation, hotspot.id);
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlayingAudio(false);
    stop();
    setSelectedHotspot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-fun">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-blue hover:text-blue-700
                     font-semibold mb-6 transition-colors"
        >
          <span className="text-xl">←</span>
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark font-heading mb-2">
            Explore the Scan Room
          </h1>
          <p className="text-text-light text-base md:text-lg">
            Tap the glowing circles to learn about each thing!
          </p>
        </header>

        {/* Interactive Image Container */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
          <img
            src={scanRoom}
            alt="The ultrasound scan room with Anna, Mum, and the doctor"
            className="w-full h-auto"
          />

          {/* Hotspots */}
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              onClick={() => handleHotspotClick(hotspot)}
              className={`absolute w-8 h-8 md:w-10 md:h-10 rounded-full
                         bg-primary-blue/80 border-2 border-white
                         transform -translate-x-1/2 -translate-y-1/2
                         transition-all duration-300
                         hover:scale-125 hover:bg-primary-blue
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                         ${selectedHotspot?.id === hotspot.id ? 'scale-125 bg-warm-orange' : ''}
                         animate-pulse`}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
              }}
              aria-label={`Learn about ${hotspot.name}`}
            >
              <span className="sr-only">{hotspot.name}</span>
              <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
            </button>
          ))}
        </div>

        {/* Hotspot legend */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              onClick={() => handleHotspotClick(hotspot)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all
                         ${selectedHotspot?.id === hotspot.id
                           ? 'bg-primary-blue text-white'
                           : 'bg-white/80 text-text-dark hover:bg-white'}`}
            >
              {hotspot.name}
            </button>
          ))}
        </div>
      </div>

      {/* Info Panel - slides up from bottom */}
      {selectedHotspot && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-40 transition-opacity"
            onClick={handleClose}
          />

          {/* Panel */}
          <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
            <div className="bg-white rounded-t-3xl p-6 pb-8 max-w-lg mx-auto shadow-2xl">
              {/* Handle bar */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

              {/* Content */}
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold text-text-dark font-heading mb-3">
                  {selectedHotspot.name}
                </h2>

                {/* Speaker indicator */}
                {(isPlayingAudio || (isSpeaking && currentId === selectedHotspot.id)) && (
                  <div className="flex items-center justify-center gap-2 mb-3 text-primary-blue">
                    <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                    <span className="text-sm font-medium">Playing...</span>
                  </div>
                )}

                <p className="text-text-dark text-base md:text-lg leading-relaxed mb-6">
                  {selectedHotspot.explanation}
                </p>

                <button
                  onClick={handleClose}
                  className="bg-success-green text-white font-bold py-3 px-8 rounded-xl
                             hover:bg-green-600 transition-colors
                             focus:outline-none focus:ring-2 focus:ring-success-green focus:ring-offset-2"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add animation keyframes */}
      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Explore;

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { hotspots } from '../data/hotspots';
import { useSpeech } from '../hooks/useSpeech';
import { useLanguage } from '../i18n';

// Import scan room image
import scanRoom from '../../assets/images/scan-room.png';

// Import English audio files
import screenAudio from '../../assets/screen.m4a';
import ultrasoundMachineAudio from '../../assets/ultrasound-machine.m4a';
import probeAudio from '../../assets/probe.m4a';
import couchAudio from '../../assets/couch.m4a';
import gelAudio from '../../assets/gel.m4a';
import tissueAudio from '../../assets/tissues.m4a';

// Import German audio files
import screenAudioDe from '../../assets/screen-de.mp3';
import ultrasoundMachineAudioDe from '../../assets/ultrasound-machine-de.mp3';
import probeAudioDe from '../../assets/probe-de.mp3';
import couchAudioDe from '../../assets/couch-de.mp3';
import gelAudioDe from '../../assets/gel-de.mp3';
import tissueAudioDe from '../../assets/tissue-de.mp3';

// Map audio keys to imported files
const enAudioFiles = {
  'screen': screenAudio,
  'ultrasound-machine': ultrasoundMachineAudio,
  'probe': probeAudio,
  'couch': couchAudio,
  'gel': gelAudio,
  'tissue-paper': tissueAudio,
};

const deAudioFiles = {
  'screen': screenAudioDe,
  'ultrasound-machine': ultrasoundMachineAudioDe,
  'probe': probeAudioDe,
  'couch': couchAudioDe,
  'gel': gelAudioDe,
  'tissue-paper': tissueAudioDe,
};

function getAudio(language, audioKey) {
  if (language === 'de' && deAudioFiles[audioKey]) {
    return deAudioFiles[audioKey];
  }
  return enAudioFiles[audioKey];
}

function Explore() {
  const { t, language } = useLanguage();
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
    const audioSrc = hotspot.audio && getAudio(language, hotspot.audio);
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      setIsPlayingAudio(true);
      audio.play().catch(console.error);
      audio.onended = () => setIsPlayingAudio(false);
    } else {
      // Fall back to text-to-speech with translated text
      const explanation = t.hotspots[hotspot.id]?.explanation || hotspot.explanation;
      speak(explanation, hotspot.id);
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

  // Helper to get translated hotspot text
  const getHotspotName = (hotspot) => t.hotspots[hotspot.id]?.name || hotspot.name;
  const getHotspotExplanation = (hotspot) => t.hotspots[hotspot.id]?.explanation || hotspot.explanation;

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
          <span>{t.common.backToHome}</span>
        </Link>

        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark font-heading mb-2">
            {t.explore.title}
          </h1>
          <p className="text-text-light text-base md:text-lg">
            {t.explore.subtitle}
          </p>
        </header>

        {/* Interactive Image Container */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
          <img
            src={scanRoom}
            alt={t.explore.imageAlt}
            className="w-full h-auto"
          />

          {/* Hotspots */}
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              onClick={() => handleHotspotClick(hotspot)}
              className={`absolute w-6 h-6 md:w-8 md:h-8 rounded-full
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
              aria-label={`${t.explore.learnAbout} ${getHotspotName(hotspot)}`}
            >
              <span className="sr-only">{getHotspotName(hotspot)}</span>
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
              {getHotspotName(hotspot)}
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
                  {getHotspotName(selectedHotspot)}
                </h2>

                {/* Speaker indicator */}
                {(isPlayingAudio || (isSpeaking && currentId === selectedHotspot.id)) && (
                  <div className="flex items-center justify-center gap-2 mb-3 text-primary-blue">
                    <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                    <span className="text-sm font-medium">{t.explore.playing}</span>
                  </div>
                )}

                <p className="text-text-dark text-base md:text-lg leading-relaxed mb-6">
                  {getHotspotExplanation(selectedHotspot)}
                </p>

                <button
                  onClick={handleClose}
                  className="bg-success-green text-white font-bold py-3 px-8 rounded-xl
                             hover:bg-green-600 transition-colors
                             focus:outline-none focus:ring-2 focus:ring-success-green focus:ring-offset-2"
                >
                  {t.explore.gotIt}
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

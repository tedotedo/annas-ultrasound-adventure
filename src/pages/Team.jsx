import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { characters } from '../data/characters';
import { useSpeech } from '../hooks/useSpeech';
import { useLanguage } from '../i18n';

// Import character images (resized versions)
import annaImg from '../../assets/images/characters/reszied_images/anna.jpg';
import mumImg from '../../assets/images/characters/reszied_images/annas-mum.jpg';
import tedrickImg from '../../assets/images/characters/reszied_images/Tedrick.png';
import nickyImg from '../../assets/images/characters/reszied_images/nicky.jpg';
import carlyImg from '../../assets/images/characters/reszied_images/carly.png';

// Import English character videos
import annaVideoEn from '../../assets/images/videos/anna_explains_nothing_to_be_scared_of.mp4';
import mumVideoEn from '../../assets/images/videos/annas-mum-video.mp4';
import tedrickVideoEn from '../../assets/images/videos/tedrick-portrait-video.mp4';
import carlyVideoEn from '../../assets/images/videos/carly.mp4';
import nickyVideoEn from '../../assets/images/videos/drnicky.mp4';

// Import German character videos and captions
import annaVideoDe from '../../assets/images/videos/de/anna.mp4';
import mumVideoDe from '../../assets/images/videos/de/mum.mp4';
import nickyVideoDe from '../../assets/images/videos/de/nicky.mp4';
import carlyVideoDe from '../../assets/images/videos/de/carly.mp4';
import tedrickVideoDe from '../../assets/images/videos/de/tedrick.mp4';

import annaCaptionsDe from '../../assets/images/videos/de/anna.vtt';
import mumCaptionsDe from '../../assets/images/videos/de/mum.vtt';
import nickyCaptionsDe from '../../assets/images/videos/de/nicky.vtt';
import carlyCaptionsDe from '../../assets/images/videos/de/carly.vtt';
import tedrickCaptionsDe from '../../assets/images/videos/de/tedrick.vtt';

const imageMap = {
  'anna.jpg': annaImg,
  'annas-mum.jpg': mumImg,
  'Tedrick.png': tedrickImg,
  'nicky.jpg': nickyImg,
  'carly.png': carlyImg,
};

const enVideos = {
  anna: annaVideoEn,
  mum: mumVideoEn,
  tedrick: tedrickVideoEn,
  carly: carlyVideoEn,
  nicky: nickyVideoEn,
};

const deVideos = {
  anna: annaVideoDe,
  mum: mumVideoDe,
  tedrick: tedrickVideoDe,
  carly: carlyVideoDe,
  nicky: nickyVideoDe,
};

const deCaptions = {
  anna: annaCaptionsDe,
  mum: mumCaptionsDe,
  tedrick: tedrickCaptionsDe,
  carly: carlyCaptionsDe,
  nicky: nickyCaptionsDe,
};

function getVideo(language, characterId) {
  if (language === 'de' && deVideos[characterId]) {
    return deVideos[characterId];
  }
  return enVideos[characterId];
}

function Team() {
  const { t, language } = useLanguage();
  const { speak, stop, isSpeaking, currentId } = useSpeech();
  const [playingId, setPlayingId] = useState(null);
  const videoRefs = useRef({});

  const stopAllVideos = useCallback(() => {
    Object.values(videoRefs.current).forEach((ref) => {
      if (ref) {
        ref.pause();
        ref.currentTime = 0;
      }
    });
    setPlayingId(null);
  }, []);

  const handleCardClick = useCallback((character) => {
    const videoSrc = getVideo(language, character.id);

    if (videoSrc) {
      if (playingId === character.id) {
        // Stop this video
        const ref = videoRefs.current[character.id];
        if (ref) {
          ref.pause();
          ref.currentTime = 0;
        }
        setPlayingId(null);
      } else {
        // Stop everything and play this video
        stop();
        stopAllVideos();
        setPlayingId(character.id);
        const ref = videoRefs.current[character.id];
        if (ref) {
          const playPromise = ref.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error(`${character.id} video play failed:`, error);
              setPlayingId(null);
            });
          }
        }
      }
    } else {
      // Fallback to TTS
      stopAllVideos();
      const audioText = t.characters[character.id]?.audio || character.audio;
      if (isSpeaking && currentId === character.id) {
        stop();
      } else {
        speak(audioText, character.id);
      }
    }
  }, [language, playingId, stop, stopAllVideos, isSpeaking, currentId, speak, t]);

  const handleVideoEnd = useCallback((characterId) => {
    setPlayingId(null);
  }, []);

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
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark font-heading mb-2">
            {t.team.title}
          </h1>
          <p className="text-text-light text-base md:text-lg">
            {t.team.subtitle}
          </p>
        </header>

        {/* Character Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {characters.map((character) => {
            const isActive = playingId === character.id || (isSpeaking && currentId === character.id);
            const videoSrc = getVideo(language, character.id);
            const captionsSrc = language === 'de' ? deCaptions[character.id] : null;
            const charName = t.characters[character.id]?.name || character.name;

            return (
              <button
                key={character.id}
                onClick={() => handleCardClick(character)}
                className={`bg-white/90 rounded-2xl p-4 md:p-6 shadow-lg
                           transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]
                           focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2
                           ${isActive ? 'ring-2 ring-primary-blue shadow-xl scale-[1.02]' : ''}
                           ${character.id === 'anna' ? 'col-span-2 md:col-span-1' : ''}`}
              >
                {/* Character Image or Video */}
                <div className="relative mb-3">
                  <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden bg-soft-blue relative">
                    <img
                      src={imageMap[character.image]}
                      alt={charName}
                      className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                        playingId === character.id ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    {videoSrc && (
                      <video
                        ref={(el) => { videoRefs.current[character.id] = el; }}
                        key={`${character.id}-${language}`}
                        src={videoSrc}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                          playingId === character.id ? 'opacity-100' : 'opacity-0'
                        }`}
                        onEnded={() => handleVideoEnd(character.id)}
                        playsInline
                        muted={false}
                        preload="auto"
                      />
                    )}
                  </div>

                  {/* Speaker/Play icon */}
                  <div className={`absolute bottom-0 right-1/2 translate-x-12 md:translate-x-16
                                  w-8 h-8 rounded-full flex items-center justify-center
                                  transition-all duration-300
                                  ${isActive
                                    ? 'bg-primary-blue text-white scale-110'
                                    : 'bg-white/80 text-text-light shadow-md'}`}
                  >
                    {isActive ? (
                      <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Character Name */}
                <h2 className="text-lg md:text-xl font-bold text-text-dark font-heading text-center">
                  {charName}
                </h2>

                {/* Tap hint */}
                <p className={`text-xs text-text-light mt-1 text-center ${isActive ? 'hidden' : 'block'}`}>
                  {t.team.tapToHear}
                </p>
                
                {/* Transcript Text (shows only when playing) */}
                {isActive && (
                  <div className="mt-4 p-4 bg-teal-50 border-l-4 border-teal-500 rounded-r-xl text-left shadow-inner relative overflow-hidden">
                    {/* Decorative quote mark */}
                    <span className="absolute top-2 right-2 text-teal-200 text-4xl font-serif leading-none italic select-none pointer-events-none">
                      "
                    </span>
                    <p className="text-gray-800 text-sm md:text-base leading-relaxed relative z-10 font-medium whitespace-pre-line">
                      {t.characters[character.id]?.audio || character.audio}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-teal-600/70 mt-3 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      {t.team.tapToStop}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Info text */}
        <div className="mt-8 text-center">
          <p className="text-text-light text-sm">
            {t.team.footer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;

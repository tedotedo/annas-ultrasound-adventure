import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { characters } from '../data/characters';
import { useSpeech } from '../hooks/useSpeech';

// Import character images (resized versions)
import annaImg from '../../assets/images/characters/reszied_images/anna.jpg';
import mum from '../../assets/images/characters/reszied_images/annas-mum.jpg';
import tedrick from '../../assets/images/characters/reszied_images/Tedrick.png';
import nicky from '../../assets/images/characters/reszied_images/nicky.jpg';
import carly from '../../assets/images/characters/reszied_images/carly.png';

// Import character videos
import annaVideo from '../../assets/images/videos/anna_explains_nothing_to_be_scared_of.mp4';
import mumVideo from '../../assets/images/videos/annas-mum-video.mp4';
import tedrickVideo from '../../assets/images/videos/tedrick-portrait-video.mp4';
import carlyVideo from '../../assets/images/videos/carly.mp4';
import nickyVideo from '../../assets/images/videos/drnicky.mp4';

const imageMap = {
  'anna.jpg': annaImg,
  'annas-mum.jpg': mum,
  'Tedrick.png': tedrick,
  'nicky.jpg': nicky,
  'carly.png': carly,
};

function Team() {
  const { speak, stop, isSpeaking, currentId } = useSpeech();
  const [annaPlaying, setAnnaPlaying] = useState(false);
  const [mumPlaying, setMumPlaying] = useState(false);
  const [tedrickPlaying, setTedrickPlaying] = useState(false);
  const [carlyPlaying, setCarlyPlaying] = useState(false);
  const [nickyPlaying, setNickyPlaying] = useState(false);
  const annaVideoRef = useRef(null);
  const mumVideoRef = useRef(null);
  const tedrickVideoRef = useRef(null);
  const carlyVideoRef = useRef(null);
  const nickyVideoRef = useRef(null);

  const stopAllVideos = () => {
    if (annaPlaying) {
      annaVideoRef.current?.pause();
      annaVideoRef.current.currentTime = 0;
      setAnnaPlaying(false);
    }
    if (mumPlaying) {
      mumVideoRef.current?.pause();
      mumVideoRef.current.currentTime = 0;
      setMumPlaying(false);
    }
    if (tedrickPlaying) {
      tedrickVideoRef.current?.pause();
      tedrickVideoRef.current.currentTime = 0;
      setTedrickPlaying(false);
    }
    if (carlyPlaying) {
      carlyVideoRef.current?.pause();
      carlyVideoRef.current.currentTime = 0;
      setCarlyPlaying(false);
    }
    if (nickyPlaying) {
      nickyVideoRef.current?.pause();
      nickyVideoRef.current.currentTime = 0;
      setNickyPlaying(false);
    }
  };

  const handleCardClick = (character) => {
    // Special handling for Anna - play video instead of TTS
    if (character.id === 'anna') {
      if (annaPlaying) {
        annaVideoRef.current?.pause();
        annaVideoRef.current.currentTime = 0;
        setAnnaPlaying(false);
      } else {
        stop(); // Stop any other TTS
        stopAllVideos(); // Stop other videos
        setAnnaPlaying(true);
        const playPromise = annaVideoRef.current?.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Anna video play failed:', error);
            setAnnaPlaying(false);
          });
        }
      }
      return;
    }

    // Special handling for Mum - play video instead of TTS
    if (character.id === 'mum') {
      if (mumPlaying) {
        mumVideoRef.current?.pause();
        mumVideoRef.current.currentTime = 0;
        setMumPlaying(false);
      } else {
        stop(); // Stop any other TTS
        stopAllVideos(); // Stop other videos
        setMumPlaying(true);
        const playPromise = mumVideoRef.current?.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Mum video play failed:', error);
            setMumPlaying(false);
          });
        }
      }
      return;
    }

    // Special handling for Tedrick - play video instead of TTS
    if (character.id === 'tedrick') {
      if (tedrickPlaying) {
        tedrickVideoRef.current?.pause();
        tedrickVideoRef.current.currentTime = 0;
        setTedrickPlaying(false);
      } else {
        stop(); // Stop any other TTS
        stopAllVideos(); // Stop other videos
        setTedrickPlaying(true);
        const playPromise = tedrickVideoRef.current?.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Tedrick video play failed:', error);
            setTedrickPlaying(false);
          });
        }
      }
      return;
    }

    // Special handling for Carly - play video instead of TTS
    if (character.id === 'carly') {
      if (carlyPlaying) {
        carlyVideoRef.current?.pause();
        carlyVideoRef.current.currentTime = 0;
        setCarlyPlaying(false);
      } else {
        stop(); // Stop any other TTS
        stopAllVideos(); // Stop other videos
        setCarlyPlaying(true);
        const playPromise = carlyVideoRef.current?.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Carly video play failed:', error);
            setCarlyPlaying(false);
          });
        }
      }
      return;
    }

    // Special handling for Dr Nicky - play video instead of TTS
    if (character.id === 'nicky') {
      if (nickyPlaying) {
        nickyVideoRef.current?.pause();
        nickyVideoRef.current.currentTime = 0;
        setNickyPlaying(false);
      } else {
        stop(); // Stop any other TTS
        stopAllVideos(); // Stop other videos
        setNickyPlaying(true);
        const playPromise = nickyVideoRef.current?.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Dr Nicky video play failed:', error);
            setNickyPlaying(false);
          });
        }
      }
      return;
    }

    // Stop all videos if playing
    stopAllVideos();

    if (isSpeaking && currentId === character.id) {
      stop();
    } else {
      speak(character.audio, character.id);
    }
  };

  const handleAnnaVideoEnd = () => {
    setAnnaPlaying(false);
  };

  const handleMumVideoEnd = () => {
    setMumPlaying(false);
  };

  const handleTedrickVideoEnd = () => {
    setTedrickPlaying(false);
  };

  const handleCarlyVideoEnd = () => {
    setCarlyPlaying(false);
  };

  const handleNickyVideoEnd = () => {
    setNickyPlaying(false);
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
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark font-heading mb-2">
            Say Hello!
          </h1>
          <p className="text-text-light text-base md:text-lg">
            Tap on a character to hear them say hello!
          </p>
        </header>

        {/* Character Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {characters.map((character) => {
            const isActive = character.id === 'anna'
              ? annaPlaying
              : character.id === 'mum'
              ? mumPlaying
              : character.id === 'tedrick'
              ? tedrickPlaying
              : character.id === 'carly'
              ? carlyPlaying
              : character.id === 'nicky'
              ? nickyPlaying
              : (isSpeaking && currentId === character.id);

            const hasVideo = true; // All characters now have videos

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
                  {character.id === 'anna' ? (
                    // Anna has a video
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden bg-soft-blue relative">
                      <img
                        src={imageMap[character.image]}
                        alt={character.name}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${annaPlaying ? 'opacity-0' : 'opacity-100'}`}
                      />
                      <video
                        ref={annaVideoRef}
                        src={annaVideo}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${annaPlaying ? 'opacity-100' : 'opacity-0'}`}
                        onEnded={handleAnnaVideoEnd}
                        playsInline
                        muted={false}
                        preload="auto"
                      />
                    </div>
                  ) : character.id === 'mum' ? (
                    // Mum has a video
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden bg-soft-blue relative">
                      <img
                        src={imageMap[character.image]}
                        alt={character.name}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${mumPlaying ? 'opacity-0' : 'opacity-100'}`}
                      />
                      <video
                        ref={mumVideoRef}
                        src={mumVideo}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${mumPlaying ? 'opacity-100' : 'opacity-0'}`}
                        onEnded={handleMumVideoEnd}
                        playsInline
                        muted={false}
                        preload="auto"
                      />
                    </div>
                  ) : character.id === 'tedrick' ? (
                    // Tedrick has a video
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden bg-soft-blue relative">
                      <img
                        src={imageMap[character.image]}
                        alt={character.name}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${tedrickPlaying ? 'opacity-0' : 'opacity-100'}`}
                      />
                      <video
                        ref={tedrickVideoRef}
                        src={tedrickVideo}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${tedrickPlaying ? 'opacity-100' : 'opacity-0'}`}
                        onEnded={handleTedrickVideoEnd}
                        playsInline
                        muted={false}
                        preload="auto"
                      />
                    </div>
                  ) : character.id === 'carly' ? (
                    // Carly has a video
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden bg-soft-blue relative">
                      <img
                        src={imageMap[character.image]}
                        alt={character.name}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${carlyPlaying ? 'opacity-0' : 'opacity-100'}`}
                      />
                      <video
                        ref={carlyVideoRef}
                        src={carlyVideo}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${carlyPlaying ? 'opacity-100' : 'opacity-0'}`}
                        onEnded={handleCarlyVideoEnd}
                        playsInline
                        muted={false}
                        preload="auto"
                      />
                    </div>
                  ) : character.id === 'nicky' ? (
                    // Dr Nicky has a video
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden bg-soft-blue relative">
                      <img
                        src={imageMap[character.image]}
                        alt={character.name}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${nickyPlaying ? 'opacity-0' : 'opacity-100'}`}
                      />
                      <video
                        ref={nickyVideoRef}
                        src={nickyVideo}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${nickyPlaying ? 'opacity-100' : 'opacity-0'}`}
                        onEnded={handleNickyVideoEnd}
                        playsInline
                        muted={false}
                        preload="auto"
                      />
                    </div>
                  ) : (
                    <img
                      src={imageMap[character.image]}
                      alt={character.name}
                      className="w-24 h-24 md:w-32 md:h-32 mx-auto object-contain rounded-full
                                 bg-soft-blue p-2"
                    />
                  )}

                  {/* Speaker/Play icon */}
                  <div className={`absolute bottom-0 right-1/2 ${hasVideo ? 'translate-x-12 md:translate-x-16' : 'translate-x-8 md:translate-x-12'}
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
                  {character.name}
                </h2>

                {/* Tap hint */}
                <p className="text-xs text-text-light mt-1 text-center">
                  {isActive ? 'Tap to stop' : 'Tap to hear me!'}
                </p>
              </button>
            );
          })}
        </div>

        {/* Info text */}
        <div className="mt-8 text-center">
          <p className="text-text-light text-sm">
            You'll meet all these friends in Anna's story!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;

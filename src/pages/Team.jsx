import { Link } from 'react-router-dom';
import { characters } from '../data/characters';
import { useSpeech } from '../hooks/useSpeech';

// Import character images (resized versions)
import anna from '../../assets/images/characters/reszied_images/anna.jpg';
import mum from '../../assets/images/characters/reszied_images/annas-mum.jpg';
import tedrick from '../../assets/images/characters/reszied_images/Tedrick.png';
import nicky from '../../assets/images/characters/reszied_images/nicky.jpg';
import carly from '../../assets/images/characters/reszied_images/carly.png';

const imageMap = {
  'anna.jpg': anna,
  'annas-mum.jpg': mum,
  'Tedrick.png': tedrick,
  'nicky.jpg': nicky,
  'carly.png': carly,
};

function Team() {
  const { speak, stop, isSpeaking, currentId } = useSpeech();

  const handleCardClick = (character) => {
    if (isSpeaking && currentId === character.id) {
      stop();
    } else {
      speak(character.audio, character.id);
    }
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
            const isActive = isSpeaking && currentId === character.id;

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
                {/* Character Image */}
                <div className="relative mb-3">
                  <img
                    src={imageMap[character.image]}
                    alt={character.name}
                    className="w-24 h-24 md:w-32 md:h-32 mx-auto object-contain rounded-full
                               bg-soft-blue p-2"
                  />

                  {/* Speaker icon */}
                  <div className={`absolute bottom-0 right-1/2 translate-x-8 md:translate-x-12
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

import { useState, useCallback, useEffect } from 'react';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text, id) => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentId(id);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentId(null);
    };

    speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentId(null);
  }, []);

  return { speak, stop, isSpeaking, currentId };
}

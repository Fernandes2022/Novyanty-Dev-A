'use client';

import { useState, useEffect, useCallback } from 'react';

export function useAudioInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('Voice: Not in browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.log('Voice: Not supported in this browser. Use Chrome or Edge.');
      return;
    }

    console.log('Voice: Initializing...');
    setIsSupported(true);

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onstart = () => {
      console.log('Voice: Started listening');
    };

    recognitionInstance.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      console.log('Voice: Got result:', speechResult);
      setTranscript(speechResult);
      setIsListening(false);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Voice: Error -', event.error);
      if (event.error === 'not-allowed') {
        alert('Microphone permission denied. Please allow microphone access in your browser settings.');
      }
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      console.log('Voice: Stopped listening');
      setIsListening(false);
    };

    setRecognition(recognitionInstance);
    console.log('Voice: Ready!');
  }, []);

  const startListening = useCallback(() => {
    console.log('Voice: Start button clicked');
    
    if (!recognition) {
      console.error('Voice: Recognition not initialized');
      alert('Voice input not available. Please use Chrome or Edge browser.');
      return;
    }

    if (isListening) {
      console.log('Voice: Already listening');
      return;
    }

    setTranscript('');
    
    try {
      recognition.start();
      setIsListening(true);
      console.log('Voice: Starting...');
    } catch (error: any) {
      console.error('Voice: Start error -', error);
      if (error.message.includes('already started')) {
        recognition.stop();
        setTimeout(() => {
          try {
            recognition.start();
            setIsListening(true);
          } catch (e) {
            console.error('Voice: Retry failed', e);
          }
        }, 100);
      }
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    console.log('Voice: Stop button clicked');
    
    if (recognition && isListening) {
      try {
        recognition.stop();
      } catch (error) {
        console.error('Voice: Stop error -', error);
      }
    }
  }, [recognition, isListening]);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
  };
}
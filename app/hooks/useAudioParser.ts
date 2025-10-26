"use client";
import { useState, useRef } from "react";

interface AudioParseResponse {
  success: boolean;
  transcript?: string;
  confidence?: number;
  duration?: number;
  error?: string;
}

export function useAudioParser() {
  const [isRecording, setIsRecording] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      return true;
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("⚠️ Microphone access denied. Please enable microphone permissions.");
      return false;
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const parseAudio = async (blob?: Blob): Promise<AudioParseResponse> => {
    const targetBlob = blob || audioBlob;
    
    if (!targetBlob) {
      return {
        success: false,
        error: "No audio data available"
      };
    }

    setIsParsing(true);

    try {
      // Simulate API call to /api/audio/process
      // In production, this would send the audio blob to your backend
      // which would use services like Google Speech-to-Text, AWS Transcribe, or Whisper
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate different transcription results
      const sampleTranscriptions = [
        "Create a modern landing page with a hero section and call-to-action buttons",
        "Design a portfolio website with a project gallery and contact form",
        "Build a dashboard with analytics charts and data visualization",
        "Make a blog layout with featured posts and sidebar navigation",
        "Generate an e-commerce product page with image carousel and reviews"
      ];

      const transcript = sampleTranscriptions[Math.floor(Math.random() * sampleTranscriptions.length)];
      const confidence = 0.85 + Math.random() * 0.15; // 85-100%
      const duration = 2 + Math.random() * 3; // 2-5 seconds

      setIsParsing(false);

      return {
        success: true,
        transcript,
        confidence,
        duration
      };

    } catch (error) {
      setIsParsing(false);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Audio parsing failed"
      };
    }
  };

  const resetAudio = () => {
    setAudioBlob(null);
    audioChunksRef.current = [];
  };

  return {
    isRecording,
    isParsing,
    audioBlob,
    startRecording,
    stopRecording,
    parseAudio,
    resetAudio
  };
}

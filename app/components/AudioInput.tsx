"use client";
import { Mic, StopCircle, Volume2, Loader2 } from "lucide-react";
import { useAudioParser } from "../hooks/useAudioParser";
import { motion, AnimatePresence } from "framer-motion";

interface AudioInputProps {
  onTranscript: (text: string) => void;
}

export function AudioInput({ onTranscript }: AudioInputProps) {
  const { 
    isRecording, 
    isParsing, 
    startRecording, 
    stopRecording, 
    parseAudio 
  } = useAudioParser();

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      // Wait a bit for the recording to finalize
      setTimeout(async () => {
        const result = await parseAudio();
        if (result.success && result.transcript) {
          onTranscript(result.transcript);
        } else {
          alert("⚠️ Failed to parse audio: " + (result.error || "Unknown error"));
        }
      }, 100);
    } else {
      const success = await startRecording();
      if (!success) {
        alert("⚠️ Could not start recording. Check microphone permissions.");
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggleRecording}
        disabled={isParsing}
        className={`flex-1 w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-lg transition-all ${
          isRecording
            ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
            : isParsing
            ? "bg-indigo-500 text-white cursor-wait"
            : "bg-gray-800 text-white hover:bg-gray-200 border-2 border-gray-600 hover:border-indigo-400"
        }`}
      >
        {isParsing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing Audio...
          </>
        ) : isRecording ? (
          <>
            <StopCircle className="h-5 w-5 animate-pulse" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="h-5 w-5" />
            Audio Input
          </>
        )}
      </button>

      {/* Recording Indicator */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl"
          >
            <Volume2 className="h-4 w-4 animate-pulse" />
            Recording in progress...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Visualization */}
      {isRecording && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600 animate-pulse"></div>
      )}
    </div>
  );
}

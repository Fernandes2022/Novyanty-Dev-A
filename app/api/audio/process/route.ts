import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { success: false, error: "Audio file is required" },
        { status: 400 }
      );
    }

    // Simulate audio transcription
    // In production, this would call Google Speech-to-Text, AWS Transcribe, or Whisper API
    await new Promise(resolve => setTimeout(resolve, 1500));

    const sampleTranscriptions = [
      "Create a modern landing page with a hero section and call-to-action buttons",
      "Design a portfolio website with a project gallery and contact form",
      "Build a dashboard with analytics charts and data visualization",
      "Make a blog layout with featured posts and sidebar navigation",
      "Generate an e-commerce product page with image carousel and reviews"
    ];

    const transcript = sampleTranscriptions[Math.floor(Math.random() * sampleTranscriptions.length)];

    return NextResponse.json({
      success: true,
      transcript,
      confidence: 0.85 + Math.random() * 0.15,
      duration: audioFile.size / 16000, // Approximate duration
      language: "en-US"
    });
  } catch (error) {
    console.error("Error in /api/audio/process:", error);
    return NextResponse.json(
      { success: false, error: "Audio processing failed" },
      { status: 500 }
    );
  }
}

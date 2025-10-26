import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draftId, customDomain } = body;

    if (!draftId) {
      return NextResponse.json(
        { success: false, error: "Draft ID is required" },
        { status: 400 }
      );
    }

    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 2000));

    const deploymentUrl = customDomain || 
      `https://creative-workspace.app/${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json({
      success: true,
      url: deploymentUrl,
      draftId,
      publishedAt: new Date().toISOString(),
      status: "live"
    });
  } catch (error) {
    console.error("Error in /api/publish:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

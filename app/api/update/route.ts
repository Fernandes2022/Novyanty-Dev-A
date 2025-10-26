import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draftId, content, blockId } = body;

    if (!draftId) {
      return NextResponse.json(
        { success: false, error: "Draft ID is required" },
        { status: 400 }
      );
    }

    // Simulate update processing
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      draftId,
      updatedAt: new Date().toISOString(),
      message: "Draft updated successfully"
    });
  } catch (error) {
    console.error("Error in /api/update:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

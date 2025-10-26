import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { directive, tier, references, userId } = body;

    // Validate input
    if (!directive || directive.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Directive is required" },
        { status: 400 }
      );
    }

    // Simulate AI composition processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate composition response
    const composition = {
      success: true,
      draftId: `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      previewData: {
        title: `${tier || 'Enhanced'} Composition`,
        description: directive.slice(0, 150),
        blocks: [
          {
            id: "hero",
            type: "hero",
            content: {
              headline: directive.split('.')[0] || "Your Composition",
              subheadline: "Created with adaptive composition engine",
              cta: "Get Started"
            }
          },
          {
            id: "features",
            type: "features",
            content: {
              title: "Key Features",
              items: [
                "Responsive design",
                "Modern aesthetics",
                "Performance optimized"
              ]
            }
          },
          {
            id: "cta",
            type: "cta",
            content: {
              headline: "Ready to launch?",
              button: "Go Live"
            }
          }
        ],
        meta: {
          title: `${tier || 'Enhanced'} - Creative Workspace`,
          description: directive.slice(0, 160),
          ogImage: "/og-image.png"
        },
        referenceAnalysis: references?.length > 0 ? {
          processed: references.length,
          insights: "Reference URLs analyzed for style and structure"
        } : null
      },
      tier: tier || "enhanced",
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(composition);
  } catch (error) {
    console.error("Error in /api/create:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

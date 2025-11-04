"use client";
import { Globe } from "lucide-react";

interface MetaPreviewProps {
  title?: string;
  description?: string;
  url?: string;
}

export function MetaPreview({ title, description, url }: MetaPreviewProps) {
  const displayTitle = title || "Your Composition Title";
  const displayDescription = description || "Your composition description will appear here";
  const displayUrl = url || "https://creative-workspace.app/your-project";

  return (
    <div className="bg-gray-900 rounded-2xl border-2 border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-gray-900">SEO Preview</h3>
      </div>

      <div className="space-y-3">
        {/* Google Search Preview */}
        <div className="p-4 bg-gray-800 rounded-xl">
          <p className="text-xs text-gray-600 mb-1">{displayUrl}</p>
          <h4 className="text-blue-600 text-lg font-semibold mb-1">
            {displayTitle}
          </h4>
          <p className="text-sm text-gray-700">
            {displayDescription}
          </p>
        </div>

        {/* Social Media Preview */}
        <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
          <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">Preview Image</span>
          </div>
          <h4 className="text-gray-900 font-bold mb-1">{displayTitle}</h4>
          <p className="text-sm text-gray-600">{displayDescription}</p>
        </div>
      </div>
    </div>
  );
}

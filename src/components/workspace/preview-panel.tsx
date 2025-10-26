"use client";

import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/ui/panel";
import { Draft } from "@/types/schema";
import { Eye, Sparkles } from "lucide-react";

interface PreviewPanelProps {
  draft: Draft | null;
}

export function PreviewPanel({ draft }: PreviewPanelProps) {
  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
            <Eye className="h-4 w-4 text-white" />
          </div>
          <PanelTitle>Live Preview</PanelTitle>
        </div>
      </PanelHeader>

      <PanelContent>
        {draft ? (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
              <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {draft.title}
              </h1>
              {draft.metadata?.author && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  by {draft.metadata.author}
                </p>
              )}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">{draft.content}</p>
              </div>
            </div>

            {draft.metadata?.tags && (
              <div className="flex flex-wrap gap-2">
                {draft.metadata.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-6 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
              <Sparkles className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              No Preview Yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Enter a directive and click Compose to see your creation come to life
            </p>
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}

"use client";

import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/ui/panel";
import { Draft } from "@/types/schema";
import { Code2, FileText } from "lucide-react";

interface EditorPanelProps {
  draft: Draft | null;
}

export function EditorPanel({ draft }: EditorPanelProps) {
  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
            <Code2 className="h-4 w-4 text-white" />
          </div>
          <PanelTitle>Properties</PanelTitle>
        </div>
      </PanelHeader>

      <PanelContent>
        {draft ? (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                Title
              </p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{draft.title}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                Content Length
              </p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {draft.content.length} characters
              </p>
            </div>

            {draft.metadata && (
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Metadata
                </p>
                <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-auto">
                  {JSON.stringify(draft.metadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FileText className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No composition selected
            </p>
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}

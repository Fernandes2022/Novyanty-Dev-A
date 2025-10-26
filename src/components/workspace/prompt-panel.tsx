"use client";

import { useState } from "react";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCompose } from "@/hooks/useCompose";
import { Draft } from "@/types/schema";
import { Mic, Sparkles, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PromptPanelProps {
  onComposed: (draft: Draft) => void;
}

export function PromptPanel({ onComposed }: PromptPanelProps) {
  const [directive, setDirective] = useState("");
  const [tier, setTier] = useState<"free" | "basic" | "pro">("free");
  const { compose, isLoading } = useCompose();
  const { toast } = useToast();

  const handleCompose = async () => {
    if (!directive.trim()) return;

    try {
      const result = await compose({ directive, settings: { tier } });
      if (result.success && result.previewData) {
        onComposed(result.previewData);
        toast({
          title: "✨ Composition Created",
          description: "Your composition is ready to view!",
        });
        setDirective("");
      }
    } catch (error) {
      toast({
        title: "⚠️ Failed",
        description: "Unable to create composition.",
        variant: "destructive",
      });
    }
  };

  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <PanelTitle>Directive Input</PanelTitle>
        </div>
      </PanelHeader>

      <PanelContent>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 block">
              Composition Tier
            </label>
            <Select value={tier} onValueChange={(v: any) => setTier(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">🆓 Free</SelectItem>
                <SelectItem value="basic">⚡ Basic</SelectItem>
                <SelectItem value="pro">💎 Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 block">
              Your Directive
            </label>
            <Textarea
              placeholder="Describe what you want to create..."
              value={directive}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDirective(e.target.value)}
              className="min-h-[300px] resize-none text-base"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleCompose}
              disabled={isLoading || !directive.trim()}
              className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-pulse" />
                  Composing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Compose
                </>
              )}
            </Button>
            <Button variant="outline" size="icon" disabled className="h-12 w-12">
              <Mic className="h-5 w-5" />
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">
              Recent Directives
            </p>
            <div className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">
              No recent directives yet
            </div>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}

"use client";
import { useState } from "react";
import { Save, Download, Eye, EyeOff, Layout, Type, Image as ImageIcon } from "lucide-react";
import { EditableBlock } from "./EditableBlock";

interface Block {
  id: string;
  type: "text" | "image" | "media";
  content: string;
}

interface EditorPanelProps {
  blocks: Block[];
  onBlockUpdate: (id: string, content: string) => void;
  onBlockDelete: (id: string) => void;
  onBlockAdd: (type: Block["type"]) => void;
  onSave: () => void;
  onExport: () => void;
}

export function EditorPanel({
  blocks,
  onBlockUpdate,
  onBlockDelete,
  onBlockAdd,
  onSave,
  onExport
}: EditorPanelProps) {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-300 dark:border-gray-700 shadow-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onBlockAdd("text")}
            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            title="Add Text Block"
          >
            <Type className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Text</span>
          </button>

          <button
            onClick={() => onBlockAdd("image")}
            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            title="Add Image Block"
          >
            <ImageIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Image</span>
          </button>

          <button
            onClick={() => onBlockAdd("media")}
            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            title="Add Media Block"
          >
            <Layout className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Media</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={showPreview ? "Hide Preview" : "Show Preview"}
          >
            {showPreview ? (
              <EyeOff className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Eye className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            <Save className="h-4 w-4" />
            Save
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {blocks.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Layout className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Blocks Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Add text, images, or media blocks to start building
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => onBlockAdd("text")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Add Text Block
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {blocks.map((block) => (
              <EditableBlock
                key={block.id}
                {...block}
                onUpdate={onBlockUpdate}
                onDelete={onBlockDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Preview Panel */}
      {showPreview && blocks.length > 0 && (
        <div className="border-t-2 border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Live Preview</h4>
          <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 max-h-48 overflow-y-auto">
            {blocks.map((block) => (
              <div key={block.id} className="mb-3 last:mb-0">
                <p className="text-sm text-gray-700 dark:text-gray-300">{block.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

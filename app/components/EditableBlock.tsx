"use client";
import { useState } from "react";
import { GripVertical, Trash2, Edit2 } from "lucide-react";

interface EditableBlockProps {
  id: string;
  type: "text" | "image" | "media";
  content: string;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export function EditableBlock({ id, type, content, onUpdate, onDelete }: EditableBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);

  const handleSave = () => {
    onUpdate(id, value);
    setIsEditing(false);
  };

  return (
    <div className="group relative bg-gray-800 border-2 border-gray-700 rounded-xl p-4 hover:border-indigo-600 transition-all">
      {/* Drag Handle */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
      </div>

      <div className="ml-6">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border-2 border-indigo-400 rounded-lg text-white outline-none"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setValue(content);
                  setIsEditing(false);
                }}
                className="px-3 py-1 bg-gray-700 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{content}</p>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                title="Edit"
              >
                <Edit2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </button>
              <button
                onClick={() => onDelete(id)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

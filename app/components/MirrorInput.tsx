"use client";
import { Link as LinkIcon, X } from "lucide-react";
import { useState } from "react";

interface MirrorInputProps {
  onReferenceAdd: (url: string) => void;
}

export function MirrorInput({ onReferenceAdd }: MirrorInputProps) {
  const [url, setUrl] = useState("");
  const [references, setReferences] = useState<string[]>([]);

  const handleAdd = () => {
    if (!url.trim()) return;
    
    try {
      new URL(url);
      setReferences([...references, url]);
      onReferenceAdd(url);
      setUrl("");
    } catch {
      alert("⚠️ Please enter a valid URL");
    }
  };

  const handleRemove = (index: number) => {
    setReferences(references.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-white">
        Reference URLs (Optional)
      </label>
      
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          placeholder="https://example.com"
          className="flex-1 px-4 py-2 bg-gray-800 border-2 border-gray-600 rounded-xl text-white focus:border-indigo-400 outline-none transition-colors"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <LinkIcon className="h-4 w-4" />
          Add
        </button>
      </div>

      {references.length > 0 && (
        <div className="space-y-2">
          {references.map((ref, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <LinkIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span className="flex-1 text-sm text-gray-700 truncate">
                {ref}
              </span>
              <button
                onClick={() => handleRemove(i)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

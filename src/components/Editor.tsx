import React from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Manuscript</h2>
      </div>
      <textarea
        className="w-full h-[calc(100vh-300px)] p-4 text-gray-800 resize-none focus:outline-none"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing your manuscript here..."
      />
    </div>
  );
}

export default Editor;
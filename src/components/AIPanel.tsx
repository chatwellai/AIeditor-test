import React from 'react';
import { StopCircle, RefreshCw, Trash2, Bot } from 'lucide-react';

interface AIPanelProps {
  isStreaming: boolean;
  response: string;
  onStop: () => void;
  onClear: () => void;
}

const AIPanel: React.FC<AIPanelProps> = ({ isStreaming, response, onStop, onClear }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-700">AI Assistant</h2>
        </div>
        <div className="flex space-x-2">
          {isStreaming && (
            <button
              onClick={onStop}
              className="p-1 rounded-full hover:bg-gray-200 text-gray-600"
              title="Stop generating"
            >
              <StopCircle className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClear}
            className="p-1 rounded-full hover:bg-gray-200 text-gray-600"
            title="Clear response"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4 h-[calc(100vh-300px)] overflow-y-auto">
        {isStreaming ? (
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="animate-pulse">AI is thinking...</div>
            <div className="animate-spin">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
        ) : null}
        
        <div className="prose max-w-none">
          {response || (
            <p className="text-gray-500 italic">
              AI responses will appear here in real-time as you write...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIPanel;
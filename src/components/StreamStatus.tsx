import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface StreamStatusProps {
  isConnected: boolean;
  tokenCount: number;
}

export const StreamStatus: React.FC<StreamStatusProps> = ({ isConnected, tokenCount }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          Tokens: {tokenCount}
        </div>
      </div>
    </div>
  );
}
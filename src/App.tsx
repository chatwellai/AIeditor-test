import React, { useState, useEffect } from 'react';
import { Bot, Settings } from 'lucide-react';
import Editor from './components/Editor';
import AIPanel from './components/AIPanel';
import ContextControls from './components/ContextControls';
import { StreamStatus } from './components/StreamStatus';
import { socketService } from './lib/socket';

function App() {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = socketService['socket'];
    
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const handleContentChange = async (newContent: string) => {
    setContent(newContent);
    
    if (!isConnected || newContent.trim().length < 50) return;
    
    try {
      setIsStreaming(true);
      setStreamedResponse('');
      
      const cleanup = socketService.analyzeText(
        newContent,
        temperature,
        (token) => {
          setStreamedResponse(prev => prev + token);
        },
        () => {
          setIsStreaming(false);
          cleanup();
        },
        (error) => {
          console.error('Streaming error:', error);
          setStreamedResponse('Error: ' + error);
          setIsStreaming(false);
          cleanup();
        }
      );
    } catch (error) {
      console.error('Setup error:', error);
      setStreamedResponse('Error: Failed to initialize streaming. Please try again.');
      setIsStreaming(false);
    }
  };

  const handleStopStreaming = () => {
    setIsStreaming(false);
  };

  const handleClearResponse = () => {
    setStreamedResponse('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">AI Manuscript Editor</h1>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Editor 
              content={content} 
              onChange={handleContentChange}
            />
            <ContextControls 
              temperature={temperature}
              onTemperatureChange={setTemperature}
            />
          </div>

          <div className="space-y-4">
            <AIPanel
              isStreaming={isStreaming}
              response={streamedResponse}
              onStop={handleStopStreaming}
              onClear={handleClearResponse}
            />
            <StreamStatus 
              isConnected={isConnected} 
              tokenCount={streamedResponse.length} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
'use client';

import { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

export default function Page() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [bottomPanelHeight, setBottomPanelHeight] = useState(200); // Resizable panel height
  const [isResizing, setIsResizing] = useState(false); // State for resizing interaction

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let fullTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          fullTranscript += result[0].transcript;
        }

        setTranscript(fullTranscript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn('Speech Recognition API is not supported in this browser.');
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech Recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }

    setIsListening((prev) => !prev);
  };

  const handleResize = (e: React.MouseEvent) => {
    const startY = e.clientY;
    const startHeight = bottomPanelHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newHeight = startHeight - (moveEvent.clientY - startY);
      setBottomPanelHeight(Math.max(100, Math.min(newHeight, window.innerHeight - 100)));
    };

    const onMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    setIsResizing(true);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Toggle Button */}
          <div className="flex items-center gap-4 justify-start mb-4">
            <button
              className={`p-4 rounded-full ${
                isListening ? 'bg-red-500' : 'bg-green-500'
              } hover:bg-opacity-80 transition-all duration-300`}
              onClick={toggleListening}
            >
              {isListening ? (
                <PauseIcon className="h-8 w-8 text-white" />
              ) : (
                <PlayIcon className="h-8 w-8 text-white" />
              )}
            </button>
          </div>

          {/* Transcript */}
          <div className="flex-1 p-4 bg-gray-100 rounded">
            <p className="text-gray-800 font-medium">
              <strong>Transcript:</strong>
            </p>
            <p className="text-gray-900">{transcript || 'Start speaking...'}</p>
          </div>

          {/* Resizable Bottom Panel */}
          <div
            className="relative bg-muted/50"
            style={{ height: `${bottomPanelHeight}px` }}
          >
            {/* Resizing Handle */}
            <div
              className={`absolute top-0 left-0 right-0 h-2 cursor-row-resize ${
                isResizing ? 'bg-blue-500' : ''
              } transition-all duration-200`}
              style={{ userSelect: 'none' }} // Prevents selection
              onMouseDown={handleResize}
            />

            {/* Note-Taking Textarea */}
            <textarea
              className="w-full h-full resize-none bg-gray-100 p-4 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your notes here..."
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

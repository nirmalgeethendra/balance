import React, { useState, useRef, useEffect } from 'react';

interface AiChatProps {
  selectedRfp: any;
  selectedCell: {
    rowId: string | number;
    field: string;
  } | null;
}

interface Message {
  type: 'user' | 'ai';
  text: string;
}

const AiChat: React.FC<AiChatProps> = ({ selectedRfp, selectedCell }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: inputMessage }]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          type: 'ai',
          text: `Based on the selected ${selectedCell?.field}, here's a suggested response...`
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      {/* Chat Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 text-xl">🤖</span>
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-4">Select a cell from the table to get AI assistance</p>
            <button
              onClick={() => setMessages([{
                type: 'ai',
                text: 'Hello! I can help you draft responses for your RFP. Select a question or answer cell from the table, and I will assist you in creating professional and accurate content.'
              }])}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Start AI Assistant
            </button>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] ${
                  message.type === 'user' ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="max-w-[85%] mr-auto">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  AI is typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Ask the AI assistant..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
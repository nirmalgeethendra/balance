import React, { useState, useRef, useEffect } from 'react';

interface Message {
  type: 'user' | 'ai';
  text: string;
}

interface SelectedCell {
  rowId: number;
  field: string;
}

interface TableRow {
  id: number;
  seq_num: number;
  questions: string;
  answer_v1: string;
  answer_v2: string;
  answer_v3: string;
  [key: string]: string | number;
}

const Workbench: React.FC = () => {
  const [selectedRfp, setSelectedRfp] = useState('');
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample data
  const rfpList = [
    { id: 1, name: 'Q1 2024 RFP - Requirements.xlsx' },
    { id: 2, name: 'Tech Provider RFP - Specifications.xlsx' }
  ];

  const tableData: TableRow[] = [
    {
      id: 1,
      seq_num: 1,
      questions: "Describe your company's experience in providing similar solutions.",
      answer_v1: "",
      answer_v2: "",
      answer_v3: ""
    },
    {
      id: 2,
      seq_num: 2,
      questions: "What security certifications does your company hold?",
      answer_v1: "",
      answer_v2: "",
      answer_v3: ""
    }
  ];

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

  // Table View Component
  const TableView = () => {
    const handleCellClick = (rowId: number, field: string) => {
      setSelectedCell({ rowId, field });
    };

    const isCellSelected = (rowId: number, field: string) => {
      return selectedCell?.rowId === rowId && selectedCell?.field === field;
    };

    if (!selectedRfp) {
      return (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Please select an RFP document to view its content
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow h-full flex flex-col">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">RFP Content</h2>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-2 border-b font-medium text-gray-600">Row #</th>
                <th className="text-left p-2 border-b font-medium text-gray-600">Questions</th>
                <th className="text-left p-2 border-b font-medium text-gray-600">Answer V1</th>
                <th className="text-left p-2 border-b font-medium text-gray-600">Answer V2</th>
                <th className="text-left p-2 border-b font-medium text-gray-600">Answer V3</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="p-2">{row.seq_num}</td>
                  <td className="p-2">
                    <div
                      onClick={() => handleCellClick(row.id, 'questions')}
                      className={`p-2 rounded-md ${
                        isCellSelected(row.id, 'questions')
                          ? 'ring-2 ring-blue-500 bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {row.questions}
                    </div>
                  </td>
                  {['answer_v1', 'answer_v2', 'answer_v3'].map((field) => (
                    <td key={field} className="p-2">
                      <textarea
                        rows={3}
                        value={row[field]}
                        onClick={() => handleCellClick(row.id, field)}
                        className={`w-full p-2 border rounded-md resize-none ${
                          isCellSelected(row.id, field)
                            ? 'ring-2 ring-blue-500'
                            : 'hover:border-gray-400'
                        }`}
                        placeholder="Click to edit answer..."
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // AI Chat Component
  const AiChat = () => (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <div className="border-b px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 text-xl">🤖</span>
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
      </div>

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

  return (
    <div className="h-[calc(100vh-theme(spacing.32))]">
      {/* Header with RFP Selection */}
      <div className="bg-white rounded-lg shadow mb-4 p-4">
        <select
          value={selectedRfp}
          onChange={(e) => setSelectedRfp(e.target.value)}
          className="w-full md:w-96 p-2 border rounded-lg text-sm"
        >
          <option value="">Select RFP Document</option>
          {rfpList.map((rfp) => (
            <option key={rfp.id} value={rfp.id}>
              {rfp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Workbench Area */}
      <div className="flex gap-4 h-[calc(100%-theme(spacing.20))]">
        {/* Table Section */}
        <div className="flex-1">
          <TableView />
        </div>

        {/* AI Chat Section */}
        <div className="w-96">
          <AiChat />
        </div>
      </div>
    </div>
  );
};

export default Workbench;
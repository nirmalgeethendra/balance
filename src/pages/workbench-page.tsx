import React, { useState } from 'react';

interface Message {
  type: 'user' | 'ai';
  text: string;
}

interface SelectedCell {
  rowId: number;
  field: keyof TableData;
}

interface Rfp {
  id: number;
  name: string;
}

interface TableData {
  id: number;
  seq_num: number;
  questions: string;
  answer_v1: string;
  answer_v2: string;
  answer_v3: string;
  [key: string]: string | number;
}

const WorkbenchPage: React.FC = () => {
  const [selectedRfp, setSelectedRfp] = useState<string>('');
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  // Sample data
  const rfpList: Rfp[] = [
    { id: 1, name: 'Q1 2024 RFP - Requirements.xlsx' },
    { id: 2, name: 'Tech Provider RFP - Specifications.xlsx' }
  ];

  const tableData: TableData[] = [
    {
      id: 1,
      seq_num: 1,
      questions: "What is your company's experience in AI?",
      answer_v1: "Our company has extensive experience...",
      answer_v2: "We have been working in AI for...",
      answer_v3: "With over a decade of experience..."
    },
    {
      id: 2,
      seq_num: 2,
      questions: "Describe your security measures",
      answer_v1: "We implement multiple layers of security...",
      answer_v2: "Our security framework includes...",
      answer_v3: "Security is our top priority..."
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text: inputMessage }]);
    setInputMessage('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai',
        text: 'Based on the RFP question, here is a suggested response...'
      }]);
    }, 1000);
  };

  const handleCellSelect = (rowId: number, field: keyof TableData) => {
    setSelectedCell({ rowId, field });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Workbench</h1>
      
      {/* RFP Selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <select
          value={selectedRfp}
          onChange={(e) => setSelectedRfp(e.target.value)}
          className="w-full md:w-96 p-2 border rounded-lg text-sm"
        >
          <option value="">Select RFP Document</option>
          {rfpList.map((rfp) => (
            <option key={rfp.id} value={rfp.id}>{rfp.name}</option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="flex gap-4">
        {/* Table Section */}
        <div className="flex-1 bg-white rounded-lg shadow">
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2 border-b">Row #</th>
                  <th className="text-left p-2 border-b">Questions</th>
                  <th className="text-left p-2 border-b">Answer V1</th>
                  <th className="text-left p-2 border-b">Answer V2</th>
                  <th className="text-left p-2 border-b">Answer V3</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="border-b">
                    <td className="p-2">{row.seq_num}</td>
                    <td className="p-2">
                      <div
                        onClick={() => handleCellSelect(row.id, 'questions')}
                        className={`p-2 rounded-md cursor-pointer ${
                          selectedCell?.rowId === row.id && selectedCell?.field === 'questions'
                            ? 'bg-blue-50 ring-2 ring-blue-500'
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
                          defaultValue={row[field]}
                          onClick={() => handleCellSelect(row.id, field)}
                          className={`w-full p-2 border rounded-md ${
                            selectedCell?.rowId === row.id && selectedCell?.field === field
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

        {/* AI Chat Section */}
        <div className="w-96 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
          </div>
          
          <div className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] ${message.type === 'user' ? 'ml-auto' : ''}`}
                >
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkbenchPage;
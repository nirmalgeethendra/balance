import React from 'react';

interface TableViewProps {
  selectedRfp: any;
  onCellSelect: (cell: { rowId: number; field: string }) => void;
  selectedCell: { rowId: number; field: string } | null;
}

interface TableRow {
  id: number;
  seq_num: number;
  questions: string;
  answer_v1: string;
  answer_v2: string;
  answer_v3: string;
  [key: string]: any;
}

const TableView: React.FC<TableViewProps> = ({ selectedRfp, onCellSelect, selectedCell }) => {
  // Sample table data - replace with API data
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

  const handleCellClick = (rowId: number, field: string) => {
    onCellSelect({ rowId, field });
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
      {/* Table Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">RFP Content</h2>
      </div>

      {/* Table Content */}
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

export default TableView;
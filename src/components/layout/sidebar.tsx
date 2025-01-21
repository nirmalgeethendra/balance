import React, { useState } from 'react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [activePage, setActivePage] = useState('manage');

  const menuItems = [
    { id: 'manage', label: 'Manage RFP', icon: '📄' },
    { id: 'workbench', label: 'Workbench', icon: '🔧' },
    { id: 'ai', label: 'AI Integrations', icon: '🤖' },
    { id: 'guide', label: 'Guide', icon: '📚' },
    { id: 'settings', label: 'Account Settings', icon: '⚙️' }
  ];

  return (
    <aside 
      className={`
        bg-white border-r fixed top-0 left-0 h-full transition-all duration-200
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className="h-16 border-b flex items-center px-4">
        <span className={`font-semibold text-blue-600 transition-all duration-200 ${
          isCollapsed ? 'text-sm' : 'text-xl'
        }`}>
          {isCollapsed ? 'RFP' : 'RFP-AI'}
        </span>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`
              w-full flex items-center rounded-lg mb-2 px-4 py-2 transition-all duration-200
              ${activePage === item.id 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'}
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && (
              <span className="ml-3">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
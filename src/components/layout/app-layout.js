import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AppLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'manage', label: 'Manage RFP', icon: '📄', path: '/rfp/list' },
    { id: 'workbench', label: 'Workbench', icon: '🔧', path: '/workbench' },
    { id: 'ai', label: 'AI Integrations', icon: '🤖', path: '/ai' },
    { id: 'guide', label: 'Guide', icon: '📚', path: '/guide' },
    { id: 'settings', label: 'Account Settings', icon: '⚙️', path: '/settings' }
  ];

  const SidebarContent = () => (
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
            onClick={() => navigate(item.path)}
            className={`
              w-full flex items-center rounded-lg mb-2 px-4 py-2 transition-all duration-200
              ${location.pathname.startsWith(item.path)
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
          className="w-full flex items-center justify-center text-gray-600 hover:text-blue-600"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarContent />
      <main className={`transition-all duration-200 ${
        isCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;

import React, { useState } from 'react';

interface UserData {
  name: string;
  email: string;
  company: string;
  role: string;
  timezone: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  desktopNotifications: boolean;
  updateAlerts: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark';
  density: 'comfortable' | 'compact';
  fontSize: 'small' | 'medium' | 'large';
}

const AccountSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Sample user data state
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Tech Corp",
    role: "Admin",
    timezone: "UTC+0"
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    desktopNotifications: false,
    updateAlerts: true
  });

  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    theme: "light",
    density: "comfortable",
    fontSize: "medium"
  });

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b px-6">
          <div className="flex space-x-8">
            {["profile", "notifications", "appearance", "security"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-4 border-b-2 font-medium ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="max-w-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={userData.company}
                    onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={userData.role}
                    disabled
                    className="w-full p-2 border rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={userData.timezone}
                    onChange={(e) => setUserData({ ...userData, timezone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div className="pt-4">
                  {isEditing ? (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSaveChanges}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="text-gray-600 hover:text-gray-800 px-4 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive email updates about your RFPs</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Desktop Notifications</h3>
                  <p className="text-sm text-gray-600">Get notifications on your desktop</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.desktopNotifications}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      desktopNotifications: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="max-w-2xl space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Theme
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: "light" })}
                    className={`px-4 py-2 rounded-lg ${
                      appearanceSettings.theme === "light"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: "dark" })}
                    className={`px-4 py-2 rounded-lg ${
                      appearanceSettings.theme === "dark"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Font Size
                </label>
                <select
                  value={appearanceSettings.fontSize}
                  onChange={(e) => setAppearanceSettings({
                    ...appearanceSettings,
                    fontSize: e.target.value as 'small' | 'medium' | 'large'
                  })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="max-w-2xl space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full p-2 border rounded-lg"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
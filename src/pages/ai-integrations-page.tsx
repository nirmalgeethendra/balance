import React, { useState } from 'react';

type Provider = 'openai' | 'azure' | 'anthropic';

interface ModelSettings {
  [key: string]: {
    temperature: number;
    maxTokens: number;
    model: string;
  };
}

interface ProviderData {
  id: Provider;
  name: string;
  description: string;
  isConnected: boolean;
  icon: string;
}

const AiIntegrationsPage: React.FC = () => {
  const [activeProvider, setActiveProvider] = useState<Provider>('openai');
  const [apiKey, setApiKey] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);

  const providers: ProviderData[] = [
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'Use OpenAI models for RFP response generation',
      isConnected: true,
      icon: '🤖'
    },
    {
      id: 'azure',
      name: 'Azure AI',
      description: 'Microsoft Azure AI services integration',
      isConnected: false,
      icon: '☁️'
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      description: 'Use Claude for advanced language processing',
      isConnected: false,
      icon: '🧠'
    }
  ];

  const modelSettings: ModelSettings = {
    openai: {
      temperature: 0.7,
      maxTokens: 2048,
      model: "gpt-4"
    },
    azure: {
      temperature: 0.5,
      maxTokens: 1024,
      model: "azure-gpt"
    },
    anthropic: {
      temperature: 0.6,
      maxTokens: 4096,
      model: "claude-2"
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">AI Integrations</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium">AI Providers</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Provider Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div 
                key={provider.id}
                onClick={() => setActiveProvider(provider.id)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  activeProvider === provider.id 
                    ? "border-blue-500 ring-2 ring-blue-500 bg-blue-50"
                    : "hover:border-gray-400"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{provider.icon}</span>
                  <div>
                    <h3 className="font-medium">{provider.name}</h3>
                    <span className={`text-sm ${
                      provider.isConnected ? "text-green-600" : "text-gray-500"
                    }`}>
                      {provider.isConnected ? "Connected" : "Not Connected"}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{provider.description}</p>
              </div>
            ))}
          </div>

          {/* Configuration Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">
              Configure {providers.find(p => p.id === activeProvider)?.name}
            </h3>
            
            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your API key"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Model Settings
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm text-gray-600">Temperature</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={modelSettings[activeProvider].temperature}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm text-gray-600">Max Tokens</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option value="1024">1024 tokens</option>
                      <option value="2048">2048 tokens</option>
                      <option value="4096">4096 tokens</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setIsConfiguring(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiIntegrationsPage;
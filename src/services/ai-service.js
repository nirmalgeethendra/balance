// AI Service configuration
const API_URL = 'http://localhost:3001/api';

// AI Provider types
const AI_PROVIDERS = {
  OPENAI: 'openai',
  AZURE: 'azure',
  ANTHROPIC: 'anthropic'
};

// Default configuration for AI responses
const defaultConfig = {
  maxTokens: 2048,
  temperature: 0.7,
  topP: 0.9,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0
};

export const aiService = {
  // Generate AI response for RFP questions
  generateResponse: async (prompt, config = {}) => {
    const response = await fetch(`${API_URL}/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        ...defaultConfig,
        ...config
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI response');
    }

    return response.json();
  },

  // Get suggestions for improving responses
  getSuggestions: async (text, context = {}) => {
    const response = await fetch(`${API_URL}/ai/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        context,
        ...defaultConfig
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get suggestions');
    }

    return response.json();
  },

  // Check and improve response quality
  analyzeResponse: async (text) => {
    const response = await fetch(`${API_URL}/ai/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        checks: ['grammar', 'clarity', 'completeness', 'tone']
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze response');
    }

    return response.json();
  },

  // Configure AI provider settings
  updateAiConfig: async (provider, config) => {
    const response = await fetch(`${API_URL}/ai/config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider,
        config
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update AI configuration');
    }

    return response.json();
  },

  // Get available AI models for a provider
  getAvailableModels: async (provider) => {
    const response = await fetch(`${API_URL}/ai/models?provider=${provider}`);

    if (!response.ok) {
      throw new Error('Failed to fetch available models');
    }

    return response.json();
  },

  // Helper function to format prompts
  formatPrompt: (question, context = {}) => {
    const { companyInfo, requirements, previousResponses } = context;
    
    let prompt = `Question: ${question}\n\n`;
    
    if (companyInfo) {
      prompt += `Company Context: ${companyInfo}\n\n`;
    }
    
    if (requirements) {
      prompt += `Requirements: ${requirements}\n\n`;
    }
    
    if (previousResponses) {
      prompt += `Previous Responses: ${previousResponses}\n\n`;
    }
    
    prompt += 'Please provide a professional and detailed response that addresses all aspects of the question.';
    
    return prompt;
  },

  // Error handling specific to AI service
  handleAiError: (error) => {
    console.error('AI Service Error:', error);
    
    // You might want to implement specific error handling based on error types
    if (error.message.includes('rate limit')) {
      return {
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: 60 // seconds
      };
    }
    
    if (error.message.includes('invalid configuration')) {
      return {
        error: 'Invalid AI configuration. Please check your settings.',
        code: 'CONFIG_ERROR'
      };
    }
    
    return {
      error: 'An unexpected error occurred with the AI service.',
      code: 'UNKNOWN_ERROR'
    };
  },

  // Constants
  AI_PROVIDERS,
  defaultConfig
};
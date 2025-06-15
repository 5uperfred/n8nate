window.LLM_CONFIG= {
  providers: {
    openai: {
      name: "OpenAI",
      displayName: "OpenAI",
      apiEndpoint: "https://api.openai.com/v1/chat/completions",
      defaultModel: "gpt-4.1",
      keyPrefix: "sk-",
      keyMinLength: 20,
      icon: "🤖",
      description: "Advanced AI by OpenAI"
    },
    anthropic: {
      name: "Anthropic",
      displayName: "Anthropic",
      apiEndpoint: "https://api.anthropic.com/v1/messages",
      defaultModel: "claude-sonnet-4-20250514",
      keyPrefix: "sk-ant-",
      keyMinLength: 20,
      icon: "🎭",
      description: "Constitutional AI by Anthropic",
      requiresBrowserHeader: true
    },
    gemini: {
      name: "Gemini",
      displayName: "Google Gemini",
      apiEndpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent",
      defaultModel: "gemini-2.5-flash-preview-05-20",
      keyPrefix: "AIza",
      keyMinLength: 20,
      icon: "💎",
      description: "Advanced AI by Google"
    }
  },
  defaultProvider: "openai",
  temperatures: {
    codeGeneration: 0.2,
    promptOptimization: 0.3,
    promptGeneration: 0.7,
    curlGeneration: 0.3,
    jsonGeneration: 0.5,
    jsonFixing: 0.3,  
    n8nHelper: 0.4,
    agentRouting: 0.1,  
    workflowAgent: 0.4,
    troubleshootingAgent: 0.3,  
    integrationAgent: 0.4,
    generalAgent: 0.5,
    default: 0.7
  },
  maxTokens: 3000,
  versions: {
    anthropic: "2023-06-01"
  }
};
window.getProviderConfig = function(providerName){
  return window.LLM_CONFIG.providers[providerName] || null;
}
window.getTemperature = function(taskType){
  return window.LLM_CONFIG.temperatures[taskType] || window.LLM_CONFIG.temperatures.default;
}
window.validateApiKey = function(apiKey, providerName){
  const provider = getProviderConfig(providerName);
  if (!provider) return false;
  return !!(apiKey &&
         apiKey.startsWith(provider.keyPrefix) &&
         apiKey.length >= provider.keyMinLength);
}
window.getProviderNames = function(){
  return Object.keys(window.LLM_CONFIG.providers);
}
window.requiresBrowserHeaders = function(providerName){
  const provider = getProviderConfig(providerName);
  return provider?.requiresBrowserHeader || false;
}
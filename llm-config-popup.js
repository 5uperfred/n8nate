let LLM_CONFIG$1 = null;
async function loadConfiguration() {
    try {
        const configModule = await Promise.resolve().then(function () { return llmConfig; });
        LLM_CONFIG$1 = configModule.LLM_CONFIG;
        window.getProviderConfig = configModule.getProviderConfig;
        window.getTemperature = configModule.getTemperature;
        window.validateApiKey = configModule.validateApiKey;
        window.getProviderNames = configModule.getProviderNames;
        window.requiresBrowserHeaders = configModule.requiresBrowserHeaders;
        console.log('Configuration loaded successfully via dynamic import');
        return true;
    }
    catch (error) {
        console.warn('Dynamic import failed, using fallback configuration:', error.message);
        LLM_CONFIG$1 = {
            providers: {},
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
            maxTokens: 2000,
            versions: { anthropic: "2023-06-01" }
        };
        console.log('Fallback configuration loaded successfully');
        return false; 
    }
}
loadConfiguration();
function getProviderConfig$1(providerName) {
    return LLM_CONFIG$1?.providers[providerName] || null;
}
function getTemperature$1(taskType) {
    return LLM_CONFIG$1?.temperatures[taskType] || LLM_CONFIG$1?.temperatures.default || 0.7;
}
function validateApiKey$1(apiKey, providerName) {
    const provider = getProviderConfig$1(providerName);
    if (!provider)
        return false;
    return !!(apiKey &&
        apiKey.startsWith(provider.keyPrefix) &&
        apiKey.length >= provider.keyMinLength);
}
function getProviderNames$1() {
    return Object.keys(LLM_CONFIG$1?.providers || {});
}
function requiresBrowserHeaders$1(providerName) {
    const provider = getProviderConfig$1(providerName);
    return provider?.requiresBrowserHeader || false;
}
window.getProviderConfig = getProviderConfig$1;
window.getTemperature = getTemperature$1;
window.validateApiKey = validateApiKey$1;
window.getProviderNames = getProviderNames$1;
window.requiresBrowserHeaders = requiresBrowserHeaders$1;
const LLM_CONFIG = {
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
function getProviderConfig(providerName) {
    return LLM_CONFIG.providers[providerName] || null;
}
function getTemperature(taskType) {
    return LLM_CONFIG.temperatures[taskType] || LLM_CONFIG.temperatures.default;
}
function validateApiKey(apiKey, providerName) {
    const provider = getProviderConfig(providerName);
    if (!provider)
        return false;
    return !!(apiKey &&
        apiKey.startsWith(provider.keyPrefix) &&
        apiKey.length >= provider.keyMinLength);
}
function getProviderNames() {
    return Object.keys(LLM_CONFIG.providers);
}
function requiresBrowserHeaders(providerName) {
    const provider = getProviderConfig(providerName);
    return provider?.requiresBrowserHeader || false;
}
var llmConfig = Object.freeze({
    __proto__: null,
    LLM_CONFIG: LLM_CONFIG,
    getProviderConfig: getProviderConfig,
    getTemperature: getTemperature,
    validateApiKey: validateApiKey,
    getProviderNames: getProviderNames,
    requiresBrowserHeaders: requiresBrowserHeaders,
    'default': LLM_CONFIG
});
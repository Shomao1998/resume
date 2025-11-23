const DEFAULT_AZURE_OPENAI = {
  endpoint: "https://personalsite-backend-openaiapi.cognitiveservices.azure.com",
  deployment: "gpt-4o-mini",
  apiVersion: "2025-01-01-preview"
};

module.exports = async function (context, req) {
  try {
    const userMessage = req.body?.message?.trim();

    if (!userMessage) {
      context.res = {
        status: 400,
        body: { error: "No message provided" }
      };
      return;
    }

    const mockReply = process.env.MOCK_CHAT_RESPONSE;
    if (mockReply) {
      context.res = {
        status: 200,
        body: { reply: mockReply }
      };
      return;
    }

    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT || DEFAULT_AZURE_OPENAI.endpoint;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || DEFAULT_AZURE_OPENAI.deployment;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION || DEFAULT_AZURE_OPENAI.apiVersion;

    if (!apiKey || !endpoint || !deployment) {
      context.res = {
        status: 500,
        body: { error: "Azure OpenAI configuration is missing" }
      };
      return;
    }

    const normalizedEndpoint = endpoint.endsWith("/") ? endpoint : `${endpoint}/`;
    const { OpenAI } = require("openai");
    const client = new OpenAI({
      apiKey,
      baseURL: `${normalizedEndpoint}openai/deployments/${deployment}`,
      defaultHeaders: {
        "api-key": apiKey,
      },
      defaultQuery: { "api-version": apiVersion }
    });

    const response = await client.chat.completions.create({
      model: deployment,
      messages: [
        { role: "system", content: "You are a helpful assistant on my personal website." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    context.res = {
      status: 200,
      body: {
        reply: response.choices[0].message.content
      }
    };

  } catch (error) {
    context.log("ERROR:", error);

    context.res = {
      status: 500,
      body: {
        error: error.message
      }
    };
  }
};

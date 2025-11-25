const OpenAI = require("openai");

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-07-18";

module.exports = async function (context, req) {
  try {
    const userMessage = req.body?.message;

    if (!userMessage) {
      context.res = {
        status: 400,
        body: { error: "No message provided" }
      };
      return;
    }

    if (!endpoint || !apiKey || !deployment) {
      context.res = {
        status: 500,
        body: {
          error: "Azure OpenAI env missing",
          endpoint: !!endpoint,
          apiKey: !!apiKey,
          deployment: !!deployment
        }
      };
      return;
    }

    const client = new OpenAI({
      apiKey: apiKey,
      baseURL: `${endpoint.replace(/\/+$/, "")}/openai/deployments/${deployment}`,
      defaultHeaders: {
        "api-key": apiKey
      },
      defaultQuery: {
        "api-version": apiVersion
      }
    });

    const completion = await client.chat.completions.create({
      model: deployment,
      messages: [
        {
          role: "system",
          content:
            "You are Xinrou's friendly assistant. Answer concisely, warmly, and invite collaboration."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.6,
      max_tokens: 300
    });

    const reply = completion.choices?.[0]?.message?.content || "";

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: { reply }
    };

  } catch (error) {
    context.res = {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        error: error.message || "Azure OpenAI call failed"
      }
    };
  }
};

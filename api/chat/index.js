const OpenAI = require("openai");

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

    const client = new OpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
      defaultHeaders: {
        "api-key": process.env.AZURE_OPENAI_API_KEY,
      },
      defaultQuery: { "api-version": "2024-12-01-preview" }
    });

    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
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

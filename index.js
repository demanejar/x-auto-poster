// By VishwaGauravIn (https://itsvg.in)

const apiKey = process.env.API_KEY_GOOGLE_AI_STUDIO;
const clientId = process.env.X_CLIENT_ID;
const clientSecret = process.env.X_CLIENT_SECRET;
const accessToken = process.env.X_ACCESS_TOKEN;
const accessSecret = process.env.X_ACCESS_SECRET;

console.log("API Key:", apiKey);
console.log("Client ID:", clientId);
console.log("Client Secret:", clientSecret);

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");

const twitterClient = new TwitterApi({
  appKey: clientId,
  appSecret: clientSecret,
  accessToken: accessToken,
  accessSecret: accessSecret,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(apiKey);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "generate a bigdata content or crawler, tips and tricks or something new or some rant or some advice as a tweet, it should not be vague and should be unique; under 280 characters and should be plain text, you can use emojis";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}

// By VishwaGauravIn (https://itsvg.in)

const apiKey = process.env.API_KEY_GOOGLE_AI_STUDIO;
const clientId = process.env.X_CLIENT_ID;
const clientSecret = process.env.X_CLIENT_SECRET;
const accessToken = process.env.X_ACCESS_TOKEN;
const accessSecret = process.env.X_ACCESS_SECRET;
const teleBotToken = process.env.TELE_BOT_TOKEN;
const teleChatId = process.env.TELE_CHAT_ID;

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
    "create bigdata content like Spark, Hadoop, other opensource or crawler such as: scrapy, selenium, choose one topic and write, under 280 characters and must be plain text, you can use emojis, insert website link https://demanejar.github.io/ and tag #demanejar into the post, occasionally attach a link to an article in demanejar into the post.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  let message = "";
  try {
    await twitterClient.v2.tweet(tweetText);

    message = "☕☕☕ Tweet sent successfully post in Demanejar X! Check in https://x.com/Demanejar";
    console.log("Tweet sent successfully post in Demanejar!");
  } catch (error) {
    message = "☕☕☕ Tweet sent error, check your github action!!";
    console.error("Error sending tweet:", error);
  }

  const url = `https://api.telegram.org/bot${teleBotToken}/sendMessage?chat_id=${teleChatId}&text=${encodeURIComponent(message)}`;
  fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

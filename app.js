const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const getBestKeyword = require("./functions/getBestKeyword");
const getTargetAudience = require("./functions/getTargetAudience");
const generateArticle = require("./functions/generateArticle");
const publishArticle = require("./functions/publishArticle");
const cors = require('cors');


app.use(cors({ origin: 'http://localhost:3001' }));
// Body parser middleware
app.use(bodyParser.json());


app.post("/generate-and-publish-article", async (req, res) => {
  const { topic, category, website } = req.body;
  console.log(topic, category, website);
  const bestKeyword = await getBestKeyword(topic);
  const targetAudience = await getTargetAudience(topic);
  const article = await generateArticle(bestKeyword, topic, targetAudience);
  const coverUrl = await createCoverPhoto(topic);
  const published = await publishArticle(
    article.title,
    article.content,
    category,
    coverUrl
  );
  if (published) {
    res.send("Article successfully published!");
  } else {
    res.send("Error publishing article");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

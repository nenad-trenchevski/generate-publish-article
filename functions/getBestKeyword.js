const axios = require("axios");

async function getBestKeyword(topic) {
  const keywords = await getKeywords(topic);
  const scores = calculateKeywordScore(keywords);
  return scores[0].keyword;
}

async function getKeywords(topic) {
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.ahrefs.com/keywords/search?request_query=topic%3A${topic}&output=json&target=organic&mode=exact&sort_by=volume_desc&limit=50&access_token=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const keywords = data.keywords;

    // Get additional data for each keyword
    for (let keyword of keywords) {
      keyword.keyword_difficulty = await getKeywordDifficulty(keyword);
      keyword.top_pages = await getTopPages(keyword);
      keyword.content_explorer = await getContentExplorer(keyword);
      keyword.organic_search = await getOrganicSearch(keyword);
    }
    return keywords;
  } catch (error) {
    console.log(error);
  }
}

// In this example, I've added the top_pages, content_explorer, and organic_search data, and multiplied the length of those arrays by 0.1, so that the keywords with more top pages, content explorer and organic search results will have a higher score.

function calculateKeywordScore(keywords) {
  const scores = [];
  for (const keyword of keywords) {
    let score = 0;
    score += (1 - keyword.keyword_difficulty) * 0.2;
    score += keyword.backlinks * 0.2;
    score += keyword.organic_traffic * 0.1;
    score += keyword.social_shares * 0.1;
    score += (1 - keyword.ads) * 0.1;
    score += keyword.search_volume_trend * 0.1;
    score += keyword.relevance * 0.1;
    score += keyword.intent * 0.1;
    score += (1 - keyword.competition) * 0.1;
    score += keyword.LTV * 0.1;
    score += keyword.CTR * 0.1;
    score += keyword.top_pages.length * 0.1;
    score += keyword.content_explorer.length * 0.1;
    score += keyword.organic_search.length * 0.1;
    // Add the score to the scores array
    scores.push({ keyword, score });
  }
  // Sort the scores array in descending order
  scores.sort((a, b) => b.score - a.score);
  // Return the sorted scores array
  return scores;
}

// helper requests

async function getKeywordDifficulty(keyword) {
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.ahrefs.com/keywords/difficulty?request_query=${keyword}&output=json&access_token=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.difficulty;
  } catch (error) {
    console.log(error);
  }
}

async function getTopPages(keyword) {
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.ahrefs.com/top_pages/by_keyword?request_query=${keyword}&output=json&access_token=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.pages;
  } catch (error) {
    console.log(error);
  }
}

async function getContentExplorer(keyword) {
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.ahrefs.com/content_explorer/search?request_query=${keyword}&output=json&access_token=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    return data.posts;
  } catch (error) {
    console.log(error);
  }
}

async function getOrganicSearch(keyword) {
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.ahrefs.com/organic_search/overview?request_query=${keyword}&output=json&access_token=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.organic_search;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBestKeyword,
};

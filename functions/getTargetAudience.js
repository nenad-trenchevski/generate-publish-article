const axios = require("axios");

async function getTargetAudience(topic) {
  // Your Ahrefs API key
  const apiKey = "YOUR_API_KEY";
  // The base URL for the Ahrefs API
  const baseUrl = "https://ahrefs.com/api/v5";
  // The parameters to send with the request
  const params = {
    target: `phrase`,
    output: `json`,
    phrase: topic,
    limit: `10`,
    mode: `exact`,
    from: `organic_search`,
    sort_by: `search_volume`,
  };
  // The headers to send with the request
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  try {
    // Send the request using Axios
    const response = await axios.get(baseUrl + "/keywords/search", {
      params,
      headers,
    });
    // Extract the target audience data
    const targetAudience = response.data.data.audience;
    return targetAudience;
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  getTargetAudience,
};

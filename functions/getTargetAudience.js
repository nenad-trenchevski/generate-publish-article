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
    // Encode the parameters as a query string
    const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");
    // The complete URL for the request
    const url = `${baseUrl}/keywords/search?${queryString}`;
    // The headers to send with the request
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` };
    // Send the request
    const response = await fetch(url, { headers });
    const json = await response.json();
    // Extract the target audience data
    const targetAudience = json.data.audience;
    return targetAudience;
}

module.exports = {
    getTargetAudience
}
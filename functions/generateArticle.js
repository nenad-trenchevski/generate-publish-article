const openai = require("openai");

// more accurate
async function generateArticle(bestKeyword, topic, targetAudience) {
    openai.apiKey = "PUT_YOUR_API_KEY_HERE";
    let prompt = `Write an informative and engaging article about ${bestKeyword} for ${topic} targeted to ${targetAudience}. Use synonyms and make the language accessible to the target audience. Format the article for readability and engagement of the target audience.`;
    let completions = await openai.Completion.create({
        engine: "davinci-codex",
        prompt: prompt,
        max_tokens: 1500
    });
    let articleContent = completions.choices[0].text;
    // Add the keyword, topic and target audience to the article content
    articleContent = `<h1>${bestKeyword}</h1>\n${articleContent}`;
    articleContent = `<p>Targeted to ${targetAudience}</p>\n${articleContent}`;
    // Add the meta keywords and description for SEO
    articleContent = `<meta name="keywords" content="${bestKeyword}, ${topic}, ${targetAudience}">\n${articleContent}`;
    articleContent = `<meta name="description" content="Informative article about ${bestKeyword} for ${topic} targeted to ${targetAudience}">\n${articleContent}`;
    // Return the article content
    return articleContent;
}

module.exports = {
    generateArticle
}


// export async function generateArticle(bestKeyword, topic) {
//     openai.apiKey = "PUT_YOUR_API_KEY_HERE";
//     let prompt = `Write an informative and engaging article about ${bestKeyword} for ${topic}. Use synonyms and make the language accessible to the target audience. Format the article for readability and engagement of the target audience.`;
//     let completions = await openai.Completion.create({
//         engine: "davinci-codex",
//         prompt: prompt,
//         max_tokens: 1500
//     });
//     let articleContent = completions.choices[0].text;
//     // Add the keyword and topic to the article content
//     articleContent = `<h1>${bestKeyword}</h1>\n${articleContent}`;
//     // Add the meta keywords and description for SEO
//     articleContent = `<meta name="keywords" content="${bestKeyword}, ${topic}">\n${articleContent}`;
//     articleContent = `<meta name="description" content="Informative article about ${bestKeyword} for ${topic}">\n${articleContent}`;
//     // Return the article content
//     return articleContent;
// }


// async function generateArticle(topic, category) {
//     // Calculate the keyword score
//     const bestKeyword = await getBestKeyword(topic);

//     // Get target audience data
//     const targetAudience = await getTargetAudience(topic);
//     // Set up the POST request to the OpenAI API
//     const url = "https://api.openai.com/v1/engines/davinci-codex/completions";
//     const apiKey = "YOUR_API_KEY";
//     const prompt = `Write a search engine optimized article on ${bestKeyword} for the topic of ${topic}. Target audience is ${targetAudience}. Tone should be informative and engaging, easy to read, and with a structure and formatting similar to other successful posts in the industry. Include synonyms and try to make the language accessible for the target audience. Length should be around 1500 words.`;
//     const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` };
//     const body = JSON.stringify({ prompt });
//     // Send the request
//     const response = await fetch(url, { method: "POST", headers, body });
//     const json = await response.json();
//     // Extract the generated text from the response
//     const generatedText = json.choices[0].text;
//     // Publish the article on the WordPress website
//     await publishArticle(bestKeyword, generatedText, category);
//     // Return the generated text
//     return generatedText;
// }
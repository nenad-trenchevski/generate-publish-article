

async function createCoverPhoto(prompt) {
    const DALL_E_URL = 'https://api.openai.com/v1/images/generations';

    // Your OpenAI API key
    const apiKey = 'YOUR_API_KEY';

    // The headers to send with the request
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` };

    // The data to send with the request
    const data = {
        prompt: prompt,
        model: 'image-alpha-001',
        // size: '256x256',
        // response_format: 'url'
    };

    try {
        // Send the request
        const response = await axios.post(DALL_E_URL, data, { headers });
        // const imageUrl = response.data.data.url;
        const imageUrl = response.data.data[0].url;
        return imageUrl;
    } catch (error) {
        console.log(error);
    }
}
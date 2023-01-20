// const WPAPI = require("wpapi");
    // "wpapi": "2.2.0",


// export async function publishArticle(title, content, category) {
//     // Create a new instance of the WPAPI client
//     let wp = new WPAPI({
//         endpoint: "PUT_YOUR_WORDPRESS_API_ENDPOINT_HERE",
//         username: "PUT_YOUR_WORDPRESS_USERNAME_HERE",
//         password: "PUT_YOUR_WORDPRESS_PASSWORD_HERE"
//     });

//     // Create the post object
//     let post = {
//         title: title,
//         content: content,
//         categories: [category],
//         status: "publish"
//     };

//     // Use the WPAPI client to create a new post
//     let response = await wp.posts().create(post);
//     console.log(`Successfully published article with ID ${response.id}`);
// }

async function publishArticle(title, content, category) {
    const url = "https://example.com/wp-json/wp/v2/posts";
    const data = {
        title: title,
        content: content,
        categories: [category],
        status: "publish"
    };
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_JWT_TOKEN"
    };
    const response = await axios.post(url, data, { headers });
    if (response.data.id) {
        console.log(`Post successfully published with ID: ${response.data.id}`);
    } else {
        console.log(`An error occurred: ${response.data.message}`);
    }
}

module.exports = {
    publishArticle
}
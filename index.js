const axios  = require('axios');
// const got  = require('got'); // For fetching the HTML
// const cheerio = require('cheerio');
const cheerio = require('cheerio');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { Readability } = require('@mozilla/readability');


const TurndownService = require('turndown');
const turndownService = new TurndownService();
const firstArgument = process.argv[2];

// Convert HTML to Markdown
// const html = `<h1>Hello, World!</h1><p>This is an example.</p>`;
async function downloadHTML(url) {
    try {

        const dom = await JSDOM.fromURL(url);
        const reader = new Readability(dom.window.document);
        const article = reader.parse();
        // console.log("mark 1")
        if (article) {
            // console.log(article.title);
            // console.log(article.content); // Cleaned HTML content
            // Other properties: article.textContent, article.excerpt, article.byline, article.dir, article.length
        } else {
            console.log('Article parsing failed.');
        }
        // const bodyContent = $('body').html(); // Or .text() for just the text
        const markdown = turndownService.turndown(article.content);
        console.log(markdown);

        // const response = await axios.get(url);
        // console.log(response.data); // This is the HTML content
        return article;
    } catch (error) {
        console.error(`Error downloading HTML from ${url}:`, error);
        return null; // Or throw the error, depending on your error handling strategy.
    }
}


// async function extractBody(url) {
//     try {
//         const response = await got(url);
//         const $ = cheerio.load(response.body);
//         const bodyContent = $('body').html(); // Or .text() for just the text
//         return bodyContent;
//     } catch (error) {
//         console.error("Error:", error);
//         return null; // Or handle the error as you see fit
//     }
// }


const html = firstArgument
// const markdown = turndownService.turndown(html);

// console.log(markdown);

// extractBody('https://www.example.com')
//     .then(body => {
//         if (body) {
//             console.log(body);
//             const markdown = turndownService.turndown(body);

//             console.log(markdown);

//         }
//     });
downloadHTML(firstArgument)

// downloadHTML('https://github.com/toukubo/html2md')
//     .then(html => {
//         if (html) {
//             // console.log(html)
//             const $ = cheerio.load(html);
//             // const dom = new JSDOM(html);

//             const bodyContent = $('body').html(); // Or .text() for just the text
//             const markdown = turndownService.turndown(bodyContent);
//             console.log(markdown);

//             // return bodyContent;

//         }
//     });

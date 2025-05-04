// Provide users with a number of covers they can pick from to select for their review
// Search for covers with OpenLibrary API, Google Books API
// Scrape cover from amazon using axios and cheerio?


function makeStringSearchable(string) {
    const replacedString = string.replaceAll(" ", "+");
    return replacedString;
}

// Use open library api to search for book information
async function searchBookByTitle(title, author = null, language = null) {
    // Make sure the arguments are strings

    title = makeStringSearchable(title);

    let url = `https://openlibrary.org/search.json?title=${title}}`
    if (author) {
        author = makeStringSearchable(author);
        url += `&author=${author}`;   
    }
    if (language) {
        // make this only select by a drop down
        url += `&lang=${language}`;
    }
    // Sort by editions so the most popular book should appear first
    url+= "&sort=editions";
    
    const headers = new Headers({"User-Agent": "Review Maker"});
    const response = await fetch(url, headers);

    // Need to build in something for no response

    const json = await response.json();
    // console.log(json);
    // console.log(json.docs[0].cover_i);
    const cover_i = json.docs[0].cover_i;
    return cover_i;
}

function getOLCoverURL(keyType, keyValue) {
    console.log(`https://covers.openlibrary.org/b/${keyType}/${keyValue}-L.jpg`);
}



// searchBookByTitle("Empire of Silence");
const bookID = await searchBookByTitle("Empire of Silence", "Christopher Ruocchio", "en");
getOLCoverURL("id", bookID);
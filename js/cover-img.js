// Provide users with a number of covers they can pick from to select for their review
// Search for covers with OpenLibrary API, Google Books API
// Scrape cover from amazon using axios and cheerio?
const  OLHEADERS = new Headers({"User-Agent": "Review Maker"});

function makeStringSearchable(string) {
    const replacedString = string.replaceAll(" ", "+");
    return replacedString;
}

// Split the element key to only get the OLID
function getOLIDFromKey(key) {
    const splitString = key.split("/");
    // get the last element of the string (OLID)
    return splitString.at(-1);
}

// Use open library api to search for book information
async function getOLID(title, author = null, language = null) {
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
    
    const response = await fetch(url, OLHEADERS);

    // Need to build in something for no response from fetch

    const json = await response.json();
    const topResult = json.docs[0];

    return getOLIDFromKey(topResult.key);
}

async function getFilteredEditions(olid) {
    const maxEditions = 10;
    let url = `https://openlibrary.org/works/${olid}/editions.json`;
    url += `?limit=${maxEditions}`
    const response = await fetch(url, OLHEADERS);
    const data = await response.json();
    const editions = data.entries;
    let editionsWithCovers = new Array;

    editions.forEach(element => {
        if (element.covers) {
            const editionOLID = getOLIDFromKey(element.key);
            editionsWithCovers.push(editionOLID);
        }
            
    });

    // console.log(editionsWithCovers);
    return editionsWithCovers;
}


function getOLCoverURL(keyType, keyValue) {
    console.log(`https://covers.openlibrary.org/b/${keyType}/${keyValue}-L.jpg`);
}



// searchBookByTitle("Empire of Silence");
const bookID = await getOLID("Howling Dark", "Christopher Ruocchio", "en");
await getFilteredEditions(bookID);
// getOLCoverURL("id", bookID);
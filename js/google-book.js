const API_KEY = "AIzaSyCZnV_PuwBkBryAz7DyUaRK4rzCKzCcDrY";
const stringKey = `:keyes&key=${API_KEY}`;
console.log(stringKey);

let baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
// const queryArray = [baseUrl];
let queryObj = {
    title: "The Final Empire",
    author: "Brandon Sanderson"
};
// turn this into an array which can be used to build the search string


// the title needs to be all lower and have + instead of spaces
const fixedTitle = queryObj.title.toLocaleLowerCase().split(" ").join("+");
queryObj.title = fixedTitle;


baseUrl = baseUrl + queryObj.title + stringKey;
console.log(baseUrl); 

const response = await fetch(baseUrl);
const data = await response.json();
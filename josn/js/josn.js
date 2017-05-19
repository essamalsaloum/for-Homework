/*global console*/
/*
1- Go to http://www.omdbapi.com/?s=dog and change the word dog in the url to a different common word. You will get as a result, a list of movies with this word in the title. Make sure you get at least 5 results.
2- You can copy the JSON and put it in a string at the top of your js file. Print the title of the 3rd movie in the array to the console.
3- Make a ul with a li for each title (just like you did with the books in the previous assignment
4- Use CSS to divide the page in two columns. The left column will have a list of the titles for each movie. The right column will have all the information listed for each movie.
5- Replace the "Poster" property with the actual image of the poster. If you do this correctly, in the right column there will be a picture for each movie.
6- Use the imdbID to create an URL to the IMDB page for that movie (hint: IMDB urls always look like this http://www.imdb.com/title/[imdbId] where [imdbId] would be replaced by the actual Id. If you do this correctly, each movie will have a link to its own IMDB page. Make sure the link opens in a new tab
7- Make a Github Repository for your javascript homework. Store your solutions in this repo. Put the repo link in trello. NO MORE ZIP FILES :octocat:
*/
// I love it that you ordered the data with newlines! Indentation is still a bit off (first bracket should have
// 1 tab, next accolade 2 tabs). You could also have put every field on a newline for perfect readability
var objects = {"Search":
			  [
			{"Title": "The Big Bang Theory", "Year": "2007–", "imdbID": "tt0898266", "Type": "series", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUyNDMxNjQyN15BMl5BanBnXkFtZTgwNzA4NDQwMDI@._V1_SX300.jpg"},

			{"Title": "The Theory of Everything", "Year": "2014", "imdbID": "tt2980516", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAwMTU4MDA3NDNeQTJeQWpwZ15BbWU4MDk4NTMxNTIx._V1_SX300.jpg"},

			{"Title": "Conspiracy Theory", "Year": "1997", "imdbID": "tt0118883", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BODc2NjI2MDQxOF5BMl5BanBnXkFtZTcwNTEyNTgyMQ@@._V1_SX300.jpg"},

			{"Title": "Chaos Theory", "Year": "2008", "imdbID": "tt0460745", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAzMjA1NTExNzVeQTJeQWpwZ15BbWU3MDI4OTI1NjE@._V1_SX300.jpg"},

			{"Title": "Kill Theory", "Year": "2009", "imdbID": "tt0893532", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ0MTQ1MDM2MF5BMl5BanBnXkFtZTcwMTI1MjQxMw@@._V1_SX300.jpg"},

			{"Title": "The Jerk Theory", "Year": "2009", "imdbID": "tt1145157", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcyMzg3NDI1MF5BMl5BanBnXkFtZTcwMTQ2NTk3Nw@@._V1_SX300.jpg"},

			{"Title": "The Frankenstein Theory", "Year": "2013", "imdbID": "tt2646378", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU3NzcwMjIyOF5BMl5BanBnXkFtZTcwOTk0MDQwOQ@@._V1_SX300.jpg"},

			{"Title": "The Theory of Flight", "Year": "1998", "imdbID": "tt0120861", "Type": "movie", "Poster": "http://ia.media-imdb.com/images/M/MV5BMTk5MDk2OTMyM15BMl5BanBnXkFtZTcwMjg4MTkzMQ@@._V1_SX300.jpg"},

			{"Title": "The Suicide Theory", "Year": "2014", "imdbID": "tt2517300", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAyODUyMTc4MDleQTJeQWpwZ15BbWU4MDI0OTQ3MDYx._V1_SX300.jpg"},

			{"Title": "Splinter Cell Chaos Theory", "Year": "2005", "imdbID": "tt0427889", "Type": "game", "Poster": "http://ia.media-imdb.com/images/M/MV5BMTI3ODY5MjkzMV5BMl5BanBnXkFtZTcwNjI5NTUzMQ@@._V1_SX300.jpg"}
		],
			  "totalResults": "273", "Response": "True"
			 };

console.log(objects.Search[2].Title);

// Why do you wrap the functions to make them anonymous? Just so you can call them right away? I'd
// just make named functions and call them normally afterwards
(function addElement() {
	"use strict";
	// Also, why do you use a function for this? If this is static content, just put it in the HTML skeleton
	var newDiv = document.createElement("div");
	document.body.appendChild(newDiv);
	var h1 = document.createElement('h1');
	newDiv.appendChild(h1);
	h1.textContent = "Movies and series";
	newDiv.setAttribute("id", "myDiv");
	var myUl = document.createElement('Ul');
	document.getElementById('myDiv').appendChild(myUl);
	myUl.setAttribute("id", "myList");
}());

// Essam, you asked me about this function slack that it does nothing. I answered that it was just an
// an example and you should put the actual logic in yourself. Now you just plainly copied the code?
// You even pass it a parameter which you do not use.
function createListEle(titl) {
	"use strict";
    var listEle = document.createElement('li');

	// The idea was that in here you take your information from the movie object and append the title, year etc.
	// to the li element before returning it.

    return listEle;
}

// Again, why an anonymous function?
(function createMovList() {
	"use strict";
	// This is not the way to declare a variable. Why not put the var i in the for loop?
	// You would easily miss this!
    var mainList = document.getElementById('myList'), i;

    for (i = 0; i < objects.Search.length; i = i + 1) {
		// I see that you used the pattern from the books example where we used the ID to connect an array
		// and object. It does nothing here (I see why you passed it to the function now).
		var myMovId = objects.Search[i].Title;

		var movEle = createListEle(myMovId);
		mainList.appendChild(movEle);

		// Why do you pick h1 as a variable name (and that even for a h2)
		var h1 = document.createElement('h2');
		movEle.appendChild(h1);
		h1.textContent =  objects.Search[i].Title;

		// Better to put every seperate property in a different element instead of dividing by line breaks
		// in a paragraph
		var p = document.createElement('p');
		movEle.appendChild(p);
		p.innerHTML = "Year :  " +  objects.Search[i].Year + "<br>" + "imdbID :  " + objects.Search[i].imdbID
			+ "<br>" + "Type :  " + objects.Search[i].Type + "<br>";

		var movUrl = document.createElement('a');
		movEle.appendChild(movUrl);
		movUrl.textContent = "Click here for more";
		movUrl.setAttribute("href", "http://www.imdb.com/title/" + objects.Search[i].imdbID);
		movUrl.setAttribute("target", "_blank");

		var movImg = document.createElement('img');
		movImg.innerHTML = objects.Search[i].Poster;
		movImg.setAttribute("src", objects.Search[i].Poster);
		movEle.appendChild(movImg);
    }

}());

// During class when I gave you feedback I talked about seperating functionality in functions.
// You still do everything in one big function ;). We're going to work on this but remember it.
// In general, very nicely done, especially your seperate stylesheet (and the styling of the site itself)
// General feedback:
// 1. Do not copy code if you don't understand what it does!
// 2. Seperate your code into functions

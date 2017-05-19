/*global console*/
"use strict";
document.getElementById('searchfield').focus();
var mainTitel = document.createElement('h1');
document.getElementById('myDiv').appendChild(mainTitel);
mainTitel.textContent = "Movies and series";
var listOfMovies = document.createElement('Ul');
document.getElementById('myDiv').appendChild(listOfMovies);
listOfMovies.setAttribute("id", "mainList");

var myFiled = document.getElementById("searchfield");
var myButton = document.getElementById("searchbutton");
var myspn = document.getElementById("msg");
var xx = document.getElementById('searchfield').value;
//this event to Execut Another function Which Makeing a request to the API
myButton.onclick = function () {
    var xx = document.getElementById('searchfield').value;
	doXhrReq(xx);
};
//this event to get the value of the search field when the user click a Enter button 
myFiled.onkeydown = function (event) {
    var xx = document.getElementById('searchfield').value;
	if (event.key === "Enter") {
		doXhrReq(xx);
	}
};
//function Which Makeing a request to the API and Execut Another function to create Eache Movie
function doXhrReq(keySearch) {
	var xhr = new XMLHttpRequest();
	var requestURL = 'http://www.omdbapi.com/?s=' + keySearch;
	xhr.open('GET', requestURL);

	function processRequest() {
		console.log(xhr.readyState);
		if (xhr.readyState === 4) {
			console.log("xhr request DONE SON");
			console.log(xhr.response);
			listOfMovies.innerHTML = "";
			j = 0;
			createEacheMovie(xhr);
		}
	}
	console.log("retrieving movie data request");
	xhr.onreadystatechange = processRequest;
	xhr.send();
}
//function to create Eache Movie list, With a condition if the Response Not found
function createEacheMovie(data) {
	var finalData = JSON.parse(data.response);
	//console.log(finalData);
	
	if (finalData.Response === "True") {
		myspn.innerHTML = "Enter Word To Search :";
		myspn.style.color = "black";
		
		var listOfMovies = document.getElementById('mainList');
		for (var i = 0; i < finalData.Search.length; i = i + 1) {
			var eacheMovie = finalData.Search[i];
    		var elementsOfMovie = createElementsOfMovie(eacheMovie);
    		listOfMovies.appendChild(elementsOfMovie);
		}	
		//To move between movies and show other information and image when hovering on the titel 
		listOfMovies.onmouseover = function (e) {

			for (var i =1; i <= finalData.Search.length; i++) {
				//console.log(finalData.Search.length);
				if (e.target.id === "hh2"+i) {
					document.getElementById("img"+i).style.display = "block";
					document.getElementById("p"+i).style.display = "block";			
						
					// console.log(document.getElementById("img"+i));
				} else {
					document.getElementById("img"+i).style.display = "none";
					document.getElementById("p"+i).style.display = "none";
				}
			}
		};
	}
	else {
		myspn.innerHTML = "No movies";
		myspn.style.color = "red";
	}
};

var j = 0;
//function to Create all the elements for each movie
function createElementsOfMovie(Movies) {
	var holderInfo = document.createElement('li');
	holderInfo.setAttribute("id", "li_"+j );
	var titleMov = document.createElement('h2');
	holderInfo.appendChild(titleMov);
	titleMov.textContent =(j += 1) +  "- " + Movies.Title;
	titleMov.setAttribute("id", "hh2"+j );
	var infoMov = document.createElement('p');
	holderInfo.appendChild(infoMov);
	infoMov.innerHTML = "Year :  " + Movies.Year + "<br>" + "Type :  " + Movies.Type + "<br>";
	infoMov.setAttribute("id", "p"+j );
	infoMov.classList.add("hidd");
	var linkMov = document.createElement('a');
	holderInfo.appendChild(linkMov);
	linkMov.textContent = "Click here for more";
	linkMov.setAttribute("href", "http://www.imdb.com/title/" + Movies.imdbID );
	linkMov.setAttribute("target", "_blank");
	linkMov.setAttribute("id", "a"+ j  );
	var movImg = document.createElement('img');
		if (Movies.Poster == "N/A") {
		movImg.innerHTML = "";
		} else{
			movImg.innerHTML = Movies.Poster;
			movImg.setAttribute("src", Movies.Poster);
			movImg.setAttribute("id", "img"+j  );
			holderInfo.appendChild(movImg);
			movImg.classList.add("hidd");
			
			}
return holderInfo;
};

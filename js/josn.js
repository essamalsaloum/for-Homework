/*global console*/
"use strict";
window.onload = function () {
	document.getElementById('searchfield').focus();
};

var newDiv = document.createElement("div");
document.body.appendChild(newDiv);
var h1 = document.createElement('h1');
newDiv.appendChild(h1);
h1.textContent = "Movies and series";
newDiv.setAttribute("id", "myDiv");
var myUl = document.createElement('Ul');
document.getElementById('myDiv').appendChild(myUl);
myUl.setAttribute("id", "mainLs");
//-----------------------------------------------------------------------------
var myFiled = document.getElementById("searchfield");
var myButton = document.getElementById("searchbutton");

myButton.onclick = function () {
    var paraMet = document.getElementById('searchfield').value;
	myButton.classList.add("hide");
	myButton.classList.add("hide");
	myButton.style.backgroundColor = '@eee';
	myButton.style.color = 'lightgray';
	if (myFiled.value !== "") {
		doXhrReq(paraMet);
	}
};
myFiled.onfocus = function () {
    myFiled.value = "";
	myUl.innerHTML = "";
	myButton.classList.remove("hide");
	myButton.style.backgroundColor = '';
	myButton.style.color = '';
	console.clear();
};
//-----------------------------------------------------------------------------
function doXhrReq(keyWr) {
	var xhr = new XMLHttpRequest();
	var requestURL = 'http://www.omdbapi.com/?s=' + keyWr;
	xhr.open('GET', requestURL, true);

	function processRequest() {
		console.log(xhr.readyState);
		if (xhr.readyState == 4) {
			console.log("xhr request DONE SON");
			console.log(xhr.response);
			createMovList(xhr);
		}
	}
	console.log("retrieving movie data request");
	xhr.onreadystatechange = processRequest;
	xhr.send();
}
//-----------------------------------------------------------------------------
function createMovList(info) {
	var objects = JSON.parse(info.responseText);
	var myUl = document.getElementById('mainLs');

	for (var i = 0; i < objects.Search.length; i = i + 1) {
	var myMov = objects.Search[i];
		
	var movEle = document.createElement('li');
	myUl.appendChild(movEle);
		
	var h2 = document.createElement('h2');
	movEle.appendChild(h2);
	h2.textContent =  myMov.Title;
		
	var p = document.createElement('p');
	movEle.appendChild(p);
	p.innerHTML = "Year :  " + myMov.Year + "<br>" + "Type :  " + myMov.Type + "<br>";
		
	var movUrl = document.createElement('a');
	movEle.appendChild(movUrl);
	movUrl.textContent = "Click here for more";
	movUrl.setAttribute("href", "http://www.imdb.com/title/" + myMov.imdbID);
	movUrl.setAttribute("target", "_blank");
		
	var movImg = document.createElement('img');
	movImg.innerHTML = myMov.Poster;
	movImg.setAttribute("src", myMov.Poster);
	movEle.appendChild(movImg);
		
	};
}	
		//myUl.onmouseout = function(n){
			//if (n.target.nodeName == "LI") {
				//for (var i =0; i<movEle.length; i++){
				//h2[i].classList.remove("hidd");
				//movUrl[i].classList.add("hidd");
				//movImg[i].classList.add("hidd");
				//p[i].classList.add("hidd");	
				//}
			//n.target.classList.add("hidd");
			//};
		//};
	
//function doSomething(e) {
	//if (!e) var e = window.event;
	//var tg = (window.event) ? e.srcElement : e.target;
	//if (tg.nodeName != 'DIV') return;
	//var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
	//while (reltg != tg && reltg.nodeName != 'BODY')
		//reltg= reltg.parentNode
	//if (reltg== tg) return;
	// Mouseout took place when mouse actually left layer
	// Handle event

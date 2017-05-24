/*global console*/
"use strict";

var search = document.getElementById('searchfield');
search.focus();

var mainHolder = document.createElement('div');
document.getElementById('myDiv').appendChild(mainHolder);
mainHolder.setAttribute("id", "mainList");

var myFiled = document.getElementById("searchfield");
var myButton = document.getElementById("searchbutton");
var myspn = document.getElementById("msg");
var xx = document.getElementById('searchfield').value;
//this event to Execut Another function Which Makeing a request to the API
myButton.onclick = function () {
    var xx = document.getElementById('searchfield').value;
	doXhrReq(xx);
}
doXhrReq(xx);
//this event to get the value of the search field when the user click a Enter button 
myFiled.onkeydown = function (event) {
    var xx = document.getElementById('searchfield').value;
	if (event.key === "Enter") {
		doXhrReq(xx);
	}
}
//function Which Makeing a request to the API and Execut Another function to get Elem
function doXhrReq(keySearch) {
	
	var requestURL = '';
	if (keySearch === "") {
		requestURL = 'https://api.github.com/users/' + "essamalsaloum";
	}else {
		requestURL = 'https://api.github.com/users/' + keySearch;
	}
	var httpRequest;
	
	makeRequest();

	// create and send an XHR request
	function makeRequest() {
		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = responseMethod;
		httpRequest.open('GET', requestURL);
		//httpRequest.onerror = (e) => e.preventDefault()
		//console.log(httpRequest)
		//console.log(httpRequest.status);
		httpRequest.send();
	}
	// handle XHR response
	function responseMethod() {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				updateUISuccess(httpRequest.responseText);
				//console.log("httpRequest request DONE SON");
				//console.log(httpRequest.responseText);
				//createEacheOne(httpRequest.responseText);
			} else {
				updateUIError();
			}
		}
	}
	// handle XHR success
	function updateUISuccess(responseText) {
		var response = JSON.parse(httpRequest.responseText);
		mainHolder.innerHTML = "";
		myspn.innerHTML = "Enter Word To Search :";
		myspn.style.color = "black";
		createEacheOne(response);
	}
	// handle XHR error
	function updateUIError() {
		myspn.innerHTML = "Not found";
		myspn.style.color = "red";
	}
}
//function to create Eache data list, 
function createEacheOne(data) {
	
	//console.log(data);
	var mainHolder = document.getElementById('mainList');
	var allElementsOflist = createElemFromData(data);
	mainHolder.appendChild(allElementsOflist); 
}
//function to Create all the elements 
function createElemFromData(db) {
	nnm = db;
	
	var holderInfo = document.createElement('div');
	holderInfo.setAttribute("id", "holder" );
	
	
	var user = document.createElement('h2');
	user.innerHTML = '<a href="#">'+  db.login +   '</a>';
	user.setAttribute("id", "hh2");
	holderInfo.appendChild(user);
	user.addEventListener('click',nameClick);

	var numOfPublic = document.createElement('h3');
	numOfPublic.innerHTML = '<a href="#">' + "The Number of public repos :  "+  db.public_repos +   '</a>';
	numOfPublic.setAttribute("id", "hh3");
	holderInfo.appendChild(numOfPublic);

	var avatarImg = document.createElement('img');

	var profLink = document.createElement("a");
	profLink.setAttribute("href", db.html_url);
	profLink.setAttribute("target", "_blank");

	avatarImg.innerHTML = "<a 'href'= " + db.html_url + ">" + "</a>";
	avatarImg.setAttribute("src", db.avatar_url);
	avatarImg.setAttribute("id", "img"  );

	profLink.appendChild(avatarImg);
	holderInfo.appendChild(profLink);	
return holderInfo;
};
//for info when click on the name
var nnm;
function nameClick(e){
	e.preventDefault();
	if (document.getElementById("pp") == null) {
		
		var infoUser = document.createElement('p');
		infoUser.setAttribute("id", "pp");
		var holderInfo = document.getElementById("holder");
		infoUser.innerHTML ="name : " + nnm.name + "<br>" +"Created at : " + nnm.created_at + "<br>"+  "updated at : " + nnm.updated_at + "<br>" +  "ID :  " + nnm.id + "<br>";
	
		holderInfo.appendChild(infoUser);
	}	
};

/*global console*/
"use strict";
var nnm;
document.getElementById('searchfield').focus();
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
};
doXhrReq(xx);
//this event to get the value of the search field when the user click a Enter button 
myFiled.onkeydown = function (event) {
    var xx = document.getElementById('searchfield').value;
	if (event.key === "Enter") {
		doXhrReq(xx);
	}
};
//function Which Makeing a request to the API and Execut Another function to get Elem
function doXhrReq(keySearch) {
	var xhr = new XMLHttpRequest();
	var requestURL = '';
	if (keySearch === "" ){
		requestURL = 'https://api.github.com/users/' + "essamalsaloum";
	}else {
		requestURL = 'https://api.github.com/users/' + keySearch;
	}
		xhr.open('GET', requestURL);

	function processRequest() {
		console.log(xhr.readyState);
		if (xhr.readyState === 4) {
			console.log("xhr request DONE SON");
			console.log(xhr.response);
			mainHolder.innerHTML = "";
			createEacheOne(xhr);
		}
	}
	console.log("retrieving movie data request");
	xhr.onreadystatechange = processRequest;
	xhr.send();
}
//function to create Eache Movie list, With a condition if the Response Not found
function createEacheOne(data) {
	var finalData = JSON.parse(data.response);
	console.log(finalData);
	
	if (finalData.login !== null && finalData.message !=="Not Found" ) {
		myspn.innerHTML = "Enter Word To Search :";
		myspn.style.color = "black";
		var mainHolder = document.getElementById('mainList');
		var allElementsOflist = createElemFromData(finalData);
		mainHolder.appendChild(allElementsOflist);
	}
	if (finalData.message =="Not Found"){
		myspn.innerHTML = "No movihhhes";
		myspn.style.color = "red";
	};	 
};

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
}
//for info when click on the name
function nameClick(){ 
	if (document.getElementById("pp") == null) {
		var infoUser = document.createElement('p');
		infoUser.setAttribute("id", "pp");
		var holderInfo = document.getElementById("holder");
		infoUser.innerHTML ="name : " + nnm.name + "<br>" +"Created at : " + nnm.created_at + "<br>"+  "updated at : " + nnm.updated_at + "<br>" +  "ID :  " + nnm.id + "<br>";
	
		holderInfo.appendChild(infoUser);
	}	
}
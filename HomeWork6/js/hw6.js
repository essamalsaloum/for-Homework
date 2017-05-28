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
var kay1 = document.getElementById('searchfield').value;
var requestURL;



	



//this event to Execut Another function Which Makeing a request to the API
myButton.onclick = function () {
    var kay1 = document.getElementById('searchfield').value;
	doXhrReq(kay1);
	respondata = [];
};



//this event to get the value of the search field when the user click a Enter button 
myFiled.onkeydown = function (event) {
   // var kay1 = document.getElementById('searchfield').value;
	if (event.key === "Enter") {
		doXhrReq(kay1);
		mainHolder.innerHTML = "";
		respondata = [];
	}
};
makeRequest('https://api.github.com/users/' + "essamalsaloum",createEacheOne1);

//-------------------------------------------------------------------------------

//function Which Makeing a request to the API and Execut Another function to get Elem
function doXhrReq(keySearch) {
	if (keySearch === "") {
		requestURL = 'https://api.github.com/users/' + "essamalsaloum";
	} else {
		requestURL = 'https://api.github.com/users/' + keySearch;
	}
	console.log(requestURL);
	makeRequest(requestURL,createEacheOne1);
}

//function Which Makeing a request to the API and Execut Another function to get Elem
/////////function doXhrReq2(keySearch2) {
	
	////////requestURL2 = "https://api.github.com/users/" + keySearch2+ "/repos";
	
	//////console.log(requestURL2);
	
	
/////}




///-------------------------------------------------------------------------------------------------
	// create and send an XHR request
var httpRequest;
function makeRequest(requestURL,newCreater) {
	
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
// handle XHR error
function updateUIError() {
	myspn.innerHTML = "Not found";
	myspn.style.color = "red";
}

var respondata = [];

// handle XHR success
function updateUISuccess(info) {
	var allData = JSON.parse(info);
	respondata = respondata.slice(0,2);
	respondata.push(allData);
	console.log(respondata);
	mainHolder.innerHTML = "";
	myspn.innerHTML = "Enter Word To Search :";
	myspn.style.color = "black";
	createEacheOne1(allData);
	createEacheOne2(allData);
	//createEacheOne3(allData);
}
	
//function to create Eache part of data, 
function createEacheOne1(Data1) {
	var mainHolder = document.getElementById('mainList');
	var allElementsOflist1 = createElemFromData1(Data1);
	mainHolder.appendChild(allElementsOflist1);
}

function createEacheOne2(Data2) {
	var mainHolder = document.getElementById('mainList');
	var allElementsOflist2 = createElemFromData2(Data2);
}

function createEacheOne3(Data3) {
	var mainHolder = document.getElementById('mainList');
	var allElementsOflist3 = createElemFromData3(Data3);
}

var mediator;
//function to Create all the elements 
function createElemFromData1(myData1) {
	mediator = myData1;
	//console.log(myData);
	var holderInfo = document.createElement('div');
	holderInfo.setAttribute("id", "holder");
	var user = document.createElement('h2');
	user.innerHTML = '<a href="#">' +  respondata[0].login + '</a>';
	user.setAttribute("id", "hh2");
	holderInfo.appendChild(user);
	user.addEventListener('click', nameClick);
	var numOfPublic = document.createElement('h3');
	numOfPublic.innerHTML = '<a href="#">' + "The Number of public repos :  " +  respondata[0].public_repos +   '</a>';
	numOfPublic.setAttribute("id", "hh3");
	holderInfo.appendChild(numOfPublic);
	numOfPublic.addEventListener('click', numberOfPublicClick);
	var avatarImg = document.createElement('img');
	var profLink = document.createElement("a");
	profLink.setAttribute("href", respondata[0].html_url);
	profLink.setAttribute("target", "_blank");
	avatarImg.innerHTML = "<a 'href'= " + respondata[0].html_url + ">" + "</a>";
	avatarImg.setAttribute("src", respondata[0].avatar_url);
	avatarImg.setAttribute("id", "img");
	profLink.appendChild(avatarImg);
	holderInfo.appendChild(profLink);
	
	return holderInfo;
}
//for info when click on the name
function nameClick(e) {
	e.preventDefault();
	if (document.getElementById("pp") === null) {
		
		var infoUser = document.createElement('p');
		infoUser.setAttribute("id", "pp");
		var holderInfo = document.getElementById("holder");
		infoUser.innerHTML ="name : " + respondata[0].name + "<br>" + "Created at : " + respondata[0].created_at + "<br>"+  "updated at : " + respondata[0].updated_at + "<br>" +  "ID :  " + respondata[0].id + "<br>";
	
		holderInfo.appendChild(infoUser);
	}
}
	
function numberOfPublicClick(event) {

	makeRequest("https://api.github.com/users/" + respondata[0].login + "/repos",createEacheOne2);
	
}

function createElemFromData2(myData2){
	
	console.log(myData2);
	var listOfRep = document.createElement("ul");
	var holderInfo = document.getElementById("holder");
 	holderInfo.appendChild(listOfRep);
	var listOfRepEleme = [];
	var asideOfList = [];
	var pOfRepEleme1 = [];
		var pOfRepEleme2 = [];
	//var listOfRepEleme3 = [];
 	for (var i = 0; i < myData2.length; i++) {
		listOfRepEleme[i] = document.createElement("li");
		listOfRep.appendChild(listOfRepEleme[i]);
		listOfRepEleme[i].setAttribute("id", "li" + i);
		listOfRepEleme[i].innerHTML = myData2[i].name;
						
		asideOfList[i]= document.createElement("aside");
		listOfRepEleme[i].appendChild(asideOfList[i]);
		asideOfList[i].setAttribute("id", "aside" + i);
		asideOfList[i].innerHTML ="created at  :" + myData2[i].created_at + "<br>" + " number  of open issues  :" + myData2[i].open_issues;
		asideOfList[i].classList.add("hidd");
		
	}
	
	listOfRep.onmouseover = function (e) {

			for (var i =0; i < respondata[1].length; i++) {
				
				if (e.target.id === "li"+i) {
					document.getElementById("aside"+i).style.display = "block";
					
				} else {
					document.getElementById("aside"+i).style.display = "none";
					
				}
			}
		
		//makeRequest('https://api.github.com/repos/' + myData2[listOfRepEleme.indexOf(event.target)].owner.login + '/' + myData2[listOfRepEleme.indexOf(event.target)].name  +'/events',createEacheOne3);
		
		}
		
}





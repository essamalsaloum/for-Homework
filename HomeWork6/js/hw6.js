/*global console*/
"use strict";

var search = document.getElementById('searchfield');
search.focus();

var mainHolder = document.createElement('section');

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
};

//this event to get the value of the search field when the user click a Enter button 
myFiled.onkeydown = function (event) {
	if (event.key === "Enter") {
		doXhrReq(kay1);
		mainHolder.innerHTML = "";
	}
}
makeRequest('https://api.github.com/users/' + "essamalsaloum",updateUISuccess);

//function Which Makeing a request to the API and Execut Another function to get Elem
function doXhrReq(keySearch) {
	if (keySearch === "") {
		requestURL = 'https://api.github.com/users/' + "essamalsaloum";
	} else {
		requestURL = 'https://api.github.com/users/' + keySearch;
	}
	console.log(requestURL);
	makeRequest(requestURL,updateUISuccess);
}
// create and send an XHR request
function makeRequest(requestURL,newCreater) {
	
	var httpRequest = new XMLHttpRequest();
	// handle XHR response
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				newCreater(httpRequest.responseText);
			    //console.log("httpRequest request DONE SON");
			    //console.log(httpRequest.responseText);
			} else {
				updateUIError();	
			}
		}
	}
	httpRequest.open('GET', requestURL);
		//httpRequest.onerror = (e) => e.preventDefault()
		//console.log(httpRequest)
		//console.log(httpRequest.status);
	httpRequest.send();
}
	
// handle XHR error
function updateUIError() {
	myspn.innerHTML = "Not found";
	myspn.style.color = "red";
}

var respondata = [];
//To store all the data and useing a filter or MAP or reduce later Or to use the data without a request
// handle XHR success
function updateUISuccess(info) {
	var allData = JSON.parse(info);
	respondata = respondata.slice(0,2);
	respondata.push(allData);
	//console.log(respondata);
	mainHolder.innerHTML = "";
	myspn.innerHTML = "Enter Word To Search :";
	myspn.style.color = "black";
	createEacheOne1(info);	
}
var finalData1;	
//function to create Eache part of data, 
function createEacheOne1(Data1) {
	finalData1 = JSON.parse(Data1);
	var mainHolder = document.getElementById('mainList');
	var allElementsOflist1 = createElemFromData1(finalData1);
	mainHolder.appendChild(allElementsOflist1);
}

//function to create Eache part of data with new call api
var finalData2;
function createEacheOne2(Data2) {
	finalData2= JSON.parse(Data2);
	respondata = respondata.slice(0,2);
	respondata.push(finalData2);
	
	var mainHolder = document.getElementById('mainList');
	
	var allElementsOflist2 = createElemFromData2(Data2);
}

var finalData3;
//function to create Eache part of data with new call api
function createEacheOne3(Data3) {
	
	finalData3= JSON.parse(Data3);
	respondata = respondata.slice(0,2);
	respondata.push(finalData3);
	console.log(respondata);
	var mainHolder = document.getElementById('mainList');
	var allElementsOflist3 = createElemFromData3(Data3);
}

//function to Create all the elements profile 
function createElemFromData1(myData1) {
	//console.log(finalData1);
	var holderInfo = document.createElement('section');
	holderInfo.setAttribute("id", "holder");
	var user = document.createElement('h2');
	user.innerHTML = '<a href="#">' +  finalData1.login + '</a>';
	user.setAttribute("id", "hh2");
	holderInfo.appendChild(user);
	user.addEventListener('click', nameClick);
	var numOfPublic = document.createElement('h3');
	numOfPublic.innerHTML = '<a href="#">' + "The Number of public repos :  " +  finalData1.public_repos +   '</a>';
	numOfPublic.setAttribute("id", "hh3");
	holderInfo.appendChild(numOfPublic);
	numOfPublic.addEventListener('click', numberOfPublicClick);
	var avatarImg = document.createElement('img');
	var profLink = document.createElement("a");
	profLink.setAttribute("href", finalData1.html_url);
	profLink.setAttribute("target", "_blank");
	profLink.setAttribute("id", "aimg");
	avatarImg.innerHTML = "<a 'href'= " + finalData1.html_url + ">" + "</a>";
	avatarImg.setAttribute("src", finalData1.avatar_url);
	avatarImg.setAttribute("id", "img");
	profLink.appendChild(avatarImg);
	holderInfo.appendChild(profLink);
	
	var infoUser = document.createElement('p');
	infoUser.setAttribute("id", "pp");
	infoUser.innerHTML ="name : " + finalData1.name + "<br>" 
		+ "Created at : " + finalData1.created_at + "<br>"
		+  "updated at : " + finalData1.updated_at + "<br>" 
		+  "ID :  " + finalData1.id + "<br>";
	holderInfo.appendChild(infoUser);
	infoUser.classList.add("hidd");
	
	return holderInfo;
}

//for info when click on the name
function nameClick(e) {
	e.preventDefault();
	
	document.getElementById("pp").classList.remove("hidd");
}
function numberOfPublicClick(event) {
	event.preventDefault();
	if (document.getElementById("mianUl") === null){
		makeRequest("https://api.github.com/users/" + finalData1.login + "/repos",createEacheOne2);
	}
}
//function to Create all the elements of rep
function createElemFromData2(myData2){
	if(myData2[0] !== undefined){
		//console.log(finalData2);
		var listOfRep = document.createElement("ul");
		listOfRep.setAttribute("id", "mianUl");
		var holderInfo = document.getElementById("holder");
		holderInfo.appendChild(listOfRep);
		//listOfRep.addEventListener('mouseover',function(e){ });
		for (var i = 0; i < finalData2.length; i++) {
			var listOfRepEleme= document.createElement("li")
			listOfRep.appendChild(listOfRepEleme);
			listOfRepEleme.setAttribute("id", i + "li");
			listOfRepEleme.setAttribute("title", finalData2[i].name);
			listOfRepEleme.innerHTML = finalData2[i].name;
			listOfRepEleme.addEventListener('mouseover',function(e){ repoonMouseover(e);});
			var asideOfList= document.createElement("aside");
			listOfRepEleme.appendChild(asideOfList);
			asideOfList.setAttribute("id", "aside" + i);
			asideOfList.innerHTML ="created at  :" + finalData2[i].created_at + "<br>" + " number  of open issues  :" + finalData2[i].open_issues;
			asideOfList.style.visibility = "hidden";
			asideOfList.setAttribute("class", "asideOfList");
			
		}
	}	
}
var mOver;
//for showing all the repos info by the aside when Mouseover on list Of Repos
function repoonMouseover (e) {
	mOver = e;
	for (var i =0; i < finalData2.length; i++) {
		
		//console.log(ggn.target.id );
		if (mOver.target.id === i + "li") {
			document.getElementById(i+"li").style.backgroundColor = "#f2aa62";
			document.getElementById("aside"+i).style.visibility ="visible";
			
		} else {
			document.getElementById(i+"li").style.backgroundColor = "#c9c6c3";
			document.getElementById("aside"+i).style.visibility = "hidden";
		}
	}
	testCondition();
	
}
//Important to test the condition before running in order to avoid duplicating elements or undefined element
function testCondition(){
	
	var listOfRepEleme = document.getElementById(mOver.target.id);
	//console.log(listOfRepEleme.childNodes[1].childNodes[3]);
	if(finalData2[parseInt(mOver.target.id)] !== undefined && listOfRepEleme.childNodes[1].childNodes[3] === undefined ) {	
		makeRequest('https://api.github.com/repos/' + finalData1.login +
					'/' + finalData2[parseInt(mOver.target.id)].name +'/events',createEacheOne3);
	}		
}
//to Create elements (type,commit)  of repos
function createElemFromData3(myData3){
	
	var listOfRepEleme = document.getElementById(mOver.target.id);
	//console.log(listOfRepEleme.childNodes[1].childNodes[3]);
		for (var i = 0; i < finalData3.length; i++) {
				var listOfRepEleme = document.getElementById(mOver.target.id);
				var asOfType = document.createElement("aside");
				asOfType.setAttribute("class", "mainasid" );
				asOfType.setAttribute("id", "asi-a"+i );
			
				listOfRepEleme.childNodes[1].appendChild(asOfType);
				asOfType.innerHTML = "type : "+finalData3[i].type;
				var asOfMessage= document.createElement("aside");
				asOfMessage.setAttribute("id", "asi-b"+i );
				asOfMessage.setAttribute("class", "asi-b" );
			
				listOfRepEleme.childNodes[1].appendChild(asOfMessage);
				if (finalData3[i].type == "PushEvent") {
					asOfMessage.innerHTML = "message : "+finalData3[i].payload.commits[0].message;
					
				}				
				
	}
	

}

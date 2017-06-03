/*global console*/
"use strict";
var loaderEl = document.getElementById("resultLoader");
var github = 'https://api.github.com/';
var search = document.getElementById('searchfield');
var loaderEl = document.getElementById("resultLoader");
var kay1 = document.getElementById('searchfield').value;
var mainHolder = document.createElement('section');
document.getElementById('myDiv').appendChild(mainHolder);
mainHolder.setAttribute("id", "mainList");

var myFiled = document.getElementById("searchfield");
var myButton = document.getElementById("searchbutton");
var myspn = document.getElementById("msg");
var requestURL;

//this event to Execut Another function Which Makeing a request to the API
myButton.onclick = function () {
    var kay1 = document.getElementById('searchfield').value;
	doXhrReq(kay1);
	respondata1 = []
}

//this event to get the value of the search field when the user click a Enter button 
myFiled.onkeydown = function (event) {
	if (event.key === "Enter") {
	var kay1 = document.getElementById('searchfield').value;
		doXhrReq(kay1);
		respondata1 = []
	}
}

//function Which Makeing a request to the API and Execut Another function to get Elem
function doXhrReq(keySearch) {
	if (keySearch === "") {
		requestURL = github + 'users/' + "essamalsaloum";
	} else {
		requestURL = github + 'users/' + keySearch;
	}
	var Promise = makeRequest(requestURL);
	Promise.then(updateUISuccess).catch(updateUIError);
}
doXhrReq("essamalsaloum");

// create and send an XHR request
function makeRequest(requestURL) {
	 loaderEl.classList.remove("invisible");
	return new Promise(function(resolve,reject){
		var httpRequest = new XMLHttpRequest();
	// handle XHR response
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				resolve(httpRequest.responseText);
			   
			} else {
				reject(httpRequest.statusText);
			}
		}
	};
	httpRequest.onerror= function(){
		reject(httpRequest.statusText);
	};	
	httpRequest.open('GET', requestURL);
		
	httpRequest.send();
		
	});
	
}
	
// handle XHR error
function updateUIError(error) {
	//console.log(error);
	myspn.innerHTML = error;
	myspn.style.color = "red";
}

var respondata1 = [];
var respondata2 = [];

//To store all the data and useing a filter or MAP or reduce later Or to use the data without a request
// handle XHR success
function updateUISuccess(info) {
	var allData = JSON.parse(info);
	
	mainHolder.innerHTML = "";
	myspn.innerHTML = "Enter Word To Search :";
	myspn.style.color = "black";
	createEacheOne1(info);	
}
	
//function to create Eache part of data, 
function createEacheOne1(Data1) {
	loaderEl.classList.add("invisible");
	var finalData1 = JSON.parse(Data1);

	respondata1.push(finalData1);
	var dataStructure = respondata1.map(
        function(datarRepo) {
          return {
            id: datarRepo.id,    
            login: datarRepo.login,
            public_repos: datarRepo.public_repos,
            html_url:datarRepo.html_url,
            avatar_url:datarRepo.avatar_url,
            name: datarRepo.name,
            created_at: datarRepo.created_at,
            updated_at: datarRepo.updated_at,
			  
          };
        }
      );
	
	respondata1.shift();
	respondata1.push(dataStructure);
	var obj1 = respondata1.reduce(function(acc, cur, i) {
		acc[i] = cur;
		return acc;
	
	}, {});
	
	var mainHolder = document.getElementById('mainList');
	var allElementsOflist1 = createElemFromData1(dataStructure);
	mainHolder.appendChild(allElementsOflist1);
	
}
//function to create Eache part of data with new call api

function createEacheOne2(Data2) {
	loaderEl.classList.add("invisible");
	var finalData2= JSON.parse(Data2);
	
	respondata2.push(finalData2);
	var dataStructure = respondata2.map(
        function(datarRepo) {
          return {
            name: datarRepo.name,    
            created_at: datarRepo.created_at,
            open_issues: datarRepo.open_issues,	  
          };
        }
      );
	
	respondata2.shift();
	respondata2.push(dataStructure);
	
	var obj2 = respondata2.reduce(function(acc, cur, i) {
		acc[i] = cur;
		return acc;
	
	}, {});
	
	var mainHolder = document.getElementById('mainList');
	var allElementsOflist2 = createElemFromData2(finalData2);
}

//function to create Eache part of data with new call api
function createEacheOne3(Data3) {
	loaderEl.classList.add("invisible");
	var finalData3= JSON.parse(Data3);
	var mainHolder = document.getElementById('mainList');
	var allElementsOflist3 = createElemFromData3(finalData3);
}

//function to Create all the elements profile 
function createElemFromData1(myData1) {
	var holderInfo = document.createElement('section');
	holderInfo.setAttribute("id", "holder");
	var user = document.createElement('h2');
	user.innerHTML = '<a href="#">' +  myData1[0].login + '</a>';
	user.setAttribute("id", "hh2");
	holderInfo.appendChild(user);
	user.addEventListener('click', nameClick);
	var numOfPublic = document.createElement('h3');
	numOfPublic.innerHTML = '<a href="#">' + "The Number of public repos :  " +  myData1[0].public_repos +   '</a>';
	numOfPublic.setAttribute("id", "hh3");
	holderInfo.appendChild(numOfPublic);
	numOfPublic.addEventListener('click', function(e){numberOfPublicClick(e,myData1);});
	var avatarImg = document.createElement('img');
	var profLink = document.createElement("a");
	profLink.setAttribute("href", myData1[0].html_url);
	profLink.setAttribute("target", "_blank");
	profLink.setAttribute("id", "aimg");
	avatarImg.innerHTML = "<a 'href'= " + myData1[0].html_url + ">" + "</a>";
	avatarImg.setAttribute("src", myData1[0].avatar_url);
	avatarImg.setAttribute("id", "img");
	profLink.appendChild(avatarImg);
	holderInfo.appendChild(profLink);
	var infoUser = document.createElement('p');
	infoUser.setAttribute("id", "pp");
	infoUser.innerHTML ="name : " + myData1[0].name +"<br>" 
		+ "Created at : " + myData1[0].created_at + "<br>"
		+  "updated at : " + myData1[0].updated_at + "<br>" 
		+  "ID :  " + myData1[0].id + "<br>";
	holderInfo.appendChild(infoUser);
	infoUser.classList.add("hidd");
	
	return holderInfo;
}

//for info when click on the name
function nameClick(e) {
	e.preventDefault();
	
	document.getElementById("pp").classList.remove("hidd");
}
function numberOfPublicClick(e,myData1) {
	e.preventDefault();
	if (document.getElementById("mianUl") === null){
		//makeRequest(github + "users/" + finalData1.login + "/repos",createEacheOne2);
		var Promise = makeRequest(github + "users/" + myData1[0].login + "/repos");
		Promise.then(createEacheOne2).catch(updateUIError);
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
		for (var i = 0; i < myData2.length; i++) {
			var listOfRepEleme= document.createElement("li")
			listOfRep.appendChild(listOfRepEleme);
			listOfRepEleme.setAttribute("id", i + "li");
			listOfRepEleme.setAttribute("title", myData2[i].name);
			listOfRepEleme.innerHTML = myData2[i].name;
			listOfRepEleme.addEventListener('mouseover',function(e){ repoonMouseover(e,myData2);});
			var asideOfList= document.createElement("aside");
			listOfRepEleme.appendChild(asideOfList);
			asideOfList.setAttribute("id", "aside" + i);
			asideOfList.innerHTML ="created at  :" + myData2[i].created_at + "<br>"
				+ " number  of open issues  :" 
				+ myData2[i].open_issues;
			asideOfList.style.visibility = "hidden";
			asideOfList.setAttribute("class", "asideOfList");
			
		}
	}	
}

//for showing all the repos info by the aside when Mouseover on list Of Repos
function repoonMouseover (e,myData2) {
	
	for (var i =0; i < myData2.length; i++) {
		
		if (e.target.id === i + "li") {
			document.getElementById(i+"li").style.backgroundColor = "#f2aa62";
			document.getElementById("aside"+i).style.visibility ="visible";
			
		} else {
			document.getElementById(i+"li").style.backgroundColor = "#c9c6c3";
			document.getElementById("aside"+i).style.visibility = "hidden";
		}
	}
	testCondition(e,myData2);
	
}
var listOfRepEleme;
//Important to test the condition before running in order to avoid duplicating elements or undefined element
function testCondition(e,myData2){
	
	listOfRepEleme = document.getElementById(e.target.id);
	//console.log(listOfRepEleme.childNodes[1].childNodes[3]);
	if(myData2[parseInt(e.target.id)] !== undefined && listOfRepEleme.childNodes[1].childNodes[3] === undefined ) {
		
		var newUrl = github + 'repos/' + respondata1["0"]["0"].login
					+ '/' + myData2[parseInt(e.target.id)].name +'/events';
		
		var Promise = makeRequest(newUrl);
		Promise.then(createEacheOne3).catch(updateUIError);
					
	}		
}
//to Create elements (type,commit)  of repos
function createElemFromData3(myData3){
	
		for (var i = 0; i < myData3.length; i++) {
			//**	var listOfRepEleme = document.getElementById(mOver.target.id);
				var asOfType = document.createElement("aside");
				asOfType.setAttribute("class", "mainasid" );
				asOfType.setAttribute("id", "asi-a"+i );
			
				listOfRepEleme.childNodes[1].appendChild(asOfType);
				asOfType.innerHTML = "type : "+myData3[i].type;
				var asOfMessage= document.createElement("aside");
				asOfMessage.setAttribute("id", "asi-b"+i );
				asOfMessage.setAttribute("class", "asi-b" );
			
				listOfRepEleme.childNodes[1].appendChild(asOfMessage);
				if (myData3[i].type == "PushEvent") {
					asOfMessage.innerHTML = "message : "+myData3[i].payload.commits[0].message;
				}					
	}
}

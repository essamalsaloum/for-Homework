/*global console*/

var namesBook = ['oracle_pl_sql', 'access_vba', 'micro_visual_c', 'photoshop_cc', 'corel_draw', 'visual_basic', 'learn_html', 'learn_javascript', 'learn_python', 'my_sql'];
var ownerBook = ['Steven Feuerstein', 'Andrew Couch', 'John Sharp', 'Adobe', 'Gary David', 'Bryan Newsome', 'Mark Myers', 'Mark Myers', 'Zed Shaw', 'Saied Tabagbogbi'],
	titleBook = ['Oracle Pl SQl', 'Access VBA programming', 'Microsoft Visual C# ', 'Adobe photoshop CC', 'Corel Draw X6', 'Visual Basic 2015', 'Asmarter way to learn HTML & CSS', 'Asmarter way to learn javascript', 'Learn Python The Hard Way ', 'Learning My SQL'];
var i;
console.log(namesBook);
var myOl = document.createElement('ol');
document.getElementById('myList').appendChild(myOl);
 
namesBook.forEach(function (name) {
	"use strict";
	var myNewLi = document.createElement('li');
	myOl.appendChild(myNewLi);
	myNewLi.setAttribute("id", "li" + i);
	//myNewLi.innerHTML += name;
	//myNewLi.className = "from_js";
});

//-------------Here's another way-------------

/*
var	n,
    createLis,
    zero,
    myOl = document.createElement('ol');
document.getElementById('myList').appendChild(myOl);
for (i = 0; i < namesBook.length; i = i + 1) {
    var myNewLi = document.createElement('li');
    myNewLi.setAttribute("id", "li" + i);
	n = i + 1;
    if (n < 10) {
        zero = "0";
    } else {
        zero = "";
    }
	//createLis.textContent = "Book " + zero + n + "- " + namesBook[i];
	myOl.appendChild(myNewLi);
}
*/

var myId = namesBook,
	auth = ownerBook,
	tit = titleBook,
    ob = {
		idBook: myId,
		title : tit,
		author: auth,
		language: "English"
	};

console.log(ob);

for (i = 0; i < ownerBook.length; i = i + 1) {
	var myH = document.createElement('h2');
	var myNewLi = document.getElementsByTagName('li');
	myNewLi[i].appendChild(myH);
	myH.textContent = titleBook[i];
	
	var myOtherH = document.createElement('h3');
	var myNewLi = document.getElementsByTagName('li');
	myNewLi[i].appendChild(myOtherH);
	myOtherH.textContent = "By : " + ownerBook[i];
	
	var myp = document.createElement('p');
	var myNewLi = document.getElementsByTagName('li');
	myNewLi[i].appendChild(myp);
	myp.textContent = "the language : " + ob.language;
	
	var myImg = document.createElement('img');
	var myNewLi = document.getElementsByTagName('li');
	myNewLi[i].appendChild(myImg);
	myImg.setAttribute('src', 'img/' + namesBook[i] + '.jpg');
	myImg.setAttribute('alt', 'Here is the picture');
}
//I was about to solve the Exercise number 7 but in fact the time was not enough







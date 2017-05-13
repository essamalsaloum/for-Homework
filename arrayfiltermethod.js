
var myArray = ['a', 'b', 'c', 'd', 'a', 'e', 'f', 'c'];

var result = myArray.filter(function(value, index, array){return array.indexOf(value) == index});
console.log("--------------------------------------------------------Essam----");
console.log(result);


//-------------------------------------/-more-/----------------------------------------//
var finalArray = removeduplicates(myArray);
function removeduplicates(arr){
	var tempObj = {};
	var j = 0; // or any number
	for(i=0;i<arr.length;i++){
		tempObj[arr[i]]=j;
		j++;	
	}
	var final = [];
	for(var key in tempObj)
		final.push(key);
		return final;
}
console.log("--------------------------------------------------------Essam----");
console.log(finalArray);




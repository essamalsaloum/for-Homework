/*global console*/

/** Feedback from Thomas (TM)
 *
 * Hi Essam,
 *
 *  Great work! It seems like you got the hang of it :).
 *  I will comment on each individual function, but here are some general remarks:
 *
 *  - I really like strict mode of node. You can also put it at the top of this file and
 *  then everything is force into strict mode!
 *  Read https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
 *  for a bit if you're interested to get to know what strict mode does.
 *
 *
 */

//1//---------------------------1---------------------------------------------
var greet = "hello";


console.log(greet);
//2//---------------------------2----------------------------------------------
function colorCar(theColor) {
	// TM: For variables don't use articles ('the', 'a'). Just 'color' would've been good!
    "use strict";

    console.log("a " + theColor + " car");
}

// TM: Don't go too quick and make typos ;)
colorCar("erd");
//3//--------------------------3-----------------------------------------------
function vehicleType(theColor, theType) {
	// TM: Again, 'the' would not be needed
    "use strict";

	// TM: Maybe a bit too many new lines (enters). But very readable!
    if (theType === 1) {

		console.log("a " + theColor + " car");

	} else if (theType === 2) {

		console.log("a " + theColor + " motorbike");

	} else {

		// TM: I love that you did error handling. Bonus points!
		console.log("Choose 1 or 2");
	}
}
vehicleType("blue", 2);
//4-5-6-7//-------------------4-5-6-7----------------------------------------------------
var moreType = ["car", "motorbike", "bike", "caravan" ];
function vehicle(theColor, theType, theAge) {
    "use strict";

	// TM: So what is a car that is not 1 or 5 years old? ;)
	// 	   In this case it would have made sense to use the 'greater than' operator: >
	// 	   so that: if (age > 5) { used } else { new }.
	// 	   Check this out for more (or all) operators: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Comparison_operators
    if (theAge === 5) {

		console.log("a " + theColor + " used " +  moreType[theType]);

	} else if (theAge === 1) {

        console.log("a new " + theColor + " " + moreType[theType]);

    } else {

		console.log("Choose 1 or 5 for age");
	}
}
vehicle("blue", 0, 5);
console.log(moreType[2]);
vehicle("green", 3, 1);
//8-9//----------------------------8-9----------------------------------------------------
var i = 0;
// TM: This was actually quite hard to read! And even though you executed the assignment nearly
// perfect this could have been a lot better.
//
// Start by not writing this kind of for loop. You did a lot of the assignment outside of the statement:
// 1. You could write 'var i = 0' in the first part -> 'for (var i = 0;;)'
// 2. The break statement could be in the second place -> 'for (var = 0; i < moreType.length;)'
// 3. The last sub statement is for the incrementing! Use 'i = i + 1', 'i += 1' or even 'i++'
// This results in 'for (var i = 0; i < moreType.length; i++)'
//
// Try googling "javascript for loop" and see what the common syntax is :)
for (;;) {
    if (i >= moreType.length) {
        break;
    }
	// TM: In general it is not a good idea to modify the array you are working on.
	// What if you would want to use the array for a different function? (For example try
	// calling 'verhicle('blue', 0, 5)' after this). It is also hard to read. You could have
	// chosen to store the text in a seperate string for example.
	if (i === moreType.length - 1) {
		moreType[i] = "and " + moreType[i] + "s.";
	} else {
	    moreType[i] = moreType[i] + "s ";
	}
    i = i + 1;
}
console.log("Amazing Essam's Garage, we service " + moreType);

// TM: In general, very well done!

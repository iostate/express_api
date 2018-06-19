var express = require('express');
var app = express();

var things = require('./things');

app.get('/hello', function(req, res){
	res.send("Hello world!");
});

app.post('/hello', function(req, res) {
	res.send("You just called the post method at '/hello'!");
});

// RegExp is an object that describes a pattern of characters
// Use the RegExp function with changing parameters
// for the different URLs
// var re = new RegExp('ab+c');


/**
 * Returns true if the value contains only numbers.
 * @param {*} value 
 */
function checkIfNumber(value) {
	return /^\d+$/.test(value);
}

// ID AND NAME

app.get('/:id/:name', function(req, res) {

	// the id parameter
	var id = req.params.id;

	// the name parameter
	var name = req.params.name;

	// Pattern for detecting the numbers [0,9]
	// 0 and 9 being inclusive
	var numberPattern = /[0-9]/g;

	// Pattern match the id variable with numberPattern
	var numberPatternResult = id.match(numberPattern);
	var errors = {};
	var errorFlag = false;

	// Use the RegExp test method in order to see if a string contains
	// only alphabetical letters
	var stringPattern = /^[a-zA-Z]+$/;

	// If the id url parameter contains anything but numbers,
	// then add an id error message property to the errors object.
	// to check whether the id url parameter contains any data besides
	// numbers, i simply checked the length of the number pattern matching 
	// array to the length of the id. if they are the same, then that means
	// the id is a valid number
	if (id.length  !== numberPatternResult.length) {
		errors.idErrorMsg = req.params.id + ' must contain only numbers!\n';
		errorFlag = true;
		console.log('id contains something other than numbers!!');
	} 

	// If the URL parameter contains characters other than letters,
	// then add a name error message property to the errors object
	if (stringPattern.test(name) == false) {
		errors.nameErrorMsg = req.params.name + ' must contain only letters not numbers!\n';
		errorFlag = true;
		console.log('name contains something other than alphabetical letters!');
	} 
	
	// If there were errors found, then determine which errors
	// were found and send it through the response
	if (errorFlag == true) {
		// Store the final error message to be displayed in this variable
		var errorMessage = '';

		// Check whether the id error message is populated, 
		// which signifies that there was an error with the id 
		// provided to the API
		if (errors.idErrorMsg !== undefined) {
			errorMessage += errors.idErrorMsg += '\n';
		}
		// Check whether the name error message is populated,
		// which signifies that there was an error with the name
		// provided to the api
		if (errors.nameErrorMsg !== undefined) {
			errorMessage += errors.nameErrorMsg += '\n';
		}

		// Finally, send the error message back through the API
		res.send(errorMessage);
	} else if (errorFlag == false) {
		// If there were no errors, simply print out the 
		// the id and name provided to the API
		res.send('The id you specified is ' + req.params.id + 
		' and the name you specified is ' + req.params.name);
		console.log('successful API request!');
	} 
});

// ID 
app.get('/:id', function(req, res) {

		console.log(typeof(req.params.id));
		res.send("The id you specified is " + req.params.id);
	// if(typeof req.params.id !== 'number') {
	// 	res.send( req.params.id + ' is not a number!');
	// } else {
	// 	res.send("The id you specified is " + req.params.id);
	// }
});

// all function is typically used for defining middleware
app.all('/test', function(req, res) {
	res.send("HTTP method doesn't have any effect on this route!\n");
});

// THINGS

app.use('/things/:name/:id', function(req, res) {
	res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

// How to use routes defined elsewhere 
app.use('/things', things);


app.listen(3000);
// modifier list:
// i - case insensitive matching
// g perform global matching
// m perform multiline matching

var str = " There has to be a common theme";
var hPattern = /[h]/g;

var result = str.match(hPattern);

console.log(result); // --> ['h', 'h', 'h']

var stringOfNums = 'usahduhasiudh*';
var numPattern = /[0-9]/g;

console.log(!stringOfNums.match(numPattern));

var errors = {};
errors.idErrorMsg = "ID Error message";
errors.nameErrorMsg = "Name error message";

console.log(errors.undefinedErrorMsg);
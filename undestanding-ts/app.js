function add(num1, num2) {
    return num1 + num2;
}
function printResult(num) {
    console.log('Result is :' + num);
}
function addAndHandle(num1, num2, cb) {
    var result = num1 + num2;
    cb(result);
}
printResult(add(23, 2));
var someValue;
var combineValue;
combineValue = add;
console.log(combineValue(12, 3));
addAndHandle(1, 2, function (result) {
    console.log(result);
});

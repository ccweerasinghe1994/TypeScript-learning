function add(num1, num2) {
    return num1 + num2;
}
function printResult(num) {
    console.log('Result is :' + num);
}
printResult(add(23, 2));
var someValue;
var combineValue;
combineValue = add;
console.log(combineValue(12, 3));

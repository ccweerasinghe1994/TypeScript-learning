function add(num1, num2, showResult, resultPhase) {
    var result = num1 + num2;
    if (showResult)
        console.log(resultPhase + result);
    return num1 + num2;
}
var number1 = 12;
var number2 = 56;
var printResult = true;
var resultPhrase = 'Result is ';
var result = add(number1, number2, printResult, resultPhrase);

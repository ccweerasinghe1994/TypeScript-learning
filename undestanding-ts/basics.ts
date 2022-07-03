function add(num1:number,num2:number,showResult:boolean,resultPhase:string){
    const result = num1+num2;
    if (showResult) console.log(resultPhase + result);
    return num1+num2;
}

const number1 = 12;
const number2 = 56;
const printResult = true;
const resultPhrase = 'Result is '

const result = add(number1,number2,printResult,resultPhrase);


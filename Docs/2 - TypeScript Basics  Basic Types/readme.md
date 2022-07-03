## Core Types
![](../img/7.png)

let's see how typescript can help during development
```ts
function add(num1:number,num2:number){
    return num1+num2;
}

const number1 = 12;
const number2 = 56;

const result = add(number1,number2);
console.log(result);

```
here is we pass a 'string' or boolean we will get an error during the development.
this will give us time to fix the code during development.

javascript is dynamically types,so we get the errors at run time.
typescript is static types so we the errors during development.

in javascript all numbers are floats by defaults.
```ts
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


```
here we are creating a method which accepts 4 arguments.
which are type number,boolean,string.
from this example we can see how to use types with functions.
we create the result variable because the return statement of the log has a string 
in the start. if we provide the number after the string it will concatinate the two numbers into string so 
it can add those converted strings to the first number.
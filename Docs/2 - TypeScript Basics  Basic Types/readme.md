## Core Types

![](../img/7.png)

let's see how typescript can help during development

```ts
function add(num1: number, num2: number) {
    return num1 + num2;
}

const number1 = 12;
const number2 = 56;

const result = add(number1, number2);
console.log(result);

```

here is we pass a 'string' or boolean we will get an error during the development.
this will give us time to fix the code during development.

javascript is dynamically types,so we get the errors at run time.
typescript is static types so we the errors during development.

in javascript all numbers are floats by defaults.

```ts
function add(num1: number, num2: number, showResult: boolean, resultPhase: string) {
    const result = num1 + num2;
    if (showResult) console.log(resultPhase + result);
    return num1 + num2;
}

const number1 = 12;
const number2 = 56;
const printResult = true;
const resultPhrase = 'Result is '

const result = add(number1, number2, printResult, resultPhrase);


```

here we are creating a method which accepts 4 arguments.
which are type number,boolean,string.
from this example we can see how to use types with functions.
we create the result variable because the return statement of the log has a string
in the start. if we provide the number after the string it will concatinate the two numbers into string so
it can add those converted strings to the first number.

## Objects in typescript

```ts

const person: {
    name: string;
    age: number;
} = {
    name: 'chamara',
    age: 12,
}

console.log(person.age);
console.log(person.name);
```

in typescript, we can explicitly define the object or typescript can infer the object types.

**🔥Note🔥**

In TypeScript, you work with types like string or number all the times.

Important: It is string and number (etc.), NOT String, Number etc.

The core primitive types in TypeScript are all lowercase!

**nested objects**
Of course object types can also be created for nested objects.

Let's say you have this JavaScript object:

```js
const product = {
    id: 'abc1',
    price: 12.99,
    tags: ['great-offer', 'hot-and-new'],
    details: {
        title: 'Red Carpet',
        description: 'A great carpet - almost brand-new!'
    }
}
```

This would be the type of such an object:

```ts
{
    id: string;
    price: number;
    tags: string[];
    details: {
        title: string;
        description: string;
    }
}
```
So you 

## Arrays in typescript

```ts
const person= {
    name :'chamara',
    age:12,
    hobbies:['sports','cooking']
}

let favouriteSports:string[];
favouriteSports=['Sports']

console.log(person.age);
console.log(person.name);

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase())
}

```
here we are adding a hobbies array to the person object.
in the favourite sports section we can see how to set explicit types for an Array.
inside the for loop we can see that the hobby is identified as a string because of the 
type inference.
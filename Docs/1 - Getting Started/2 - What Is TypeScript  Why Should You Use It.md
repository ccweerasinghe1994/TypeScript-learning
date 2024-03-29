## What  is TypeScript
![](../img/1.png)
typescript is a superset of javascript. Which adds new features.
## why typescript
![](../img/2.png)

## let's see a example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Understanding TypeScript</title>
    <script src="js-only.js" defer></script>
  </head>
  <body>
    <input type="number" id="num1" placeholder="Number 1" />
    <input type="number" id="num2" placeholder="Number 2" />
    <button>Add!</button>
  </body>
</html>

```
```js
const button = document.querySelector("button");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

function add(num1, num2) {
  return num1 + num2;
}

button.addEventListener("click", function() {
  console.log(add(input1.value, input2.value));
});

```
## output
![](../img/3.png)

we can do this 
![](../img/4.png)

but we can make it so that we can't pass other inputs except numbers.

## Let's use typescript
let's install typescript globally
```shell
npm install -globally typescript
```
let's create a ts file

```ts
const button = document.querySelector("button");
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1:number, num2:number) {
    return num1 + num2;
}

button.addEventListener("click", function() {
    console.log(add(+input1.value, +input2.value));
});

```
**Note**
```
! mark denotes the values are not null
+ converts to numbers
```
let's compile the code back to js
```js
var button = document.querySelector("button");
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener("click", function () {
    console.log(add(+input1.value, +input2.value));
});

```
**output**

![](../img/5.png)

## TypeScript Advantages - Overview
- we can reduce errors by using types
- we can get better autocomplete by using typescript
- next gen js can be used
- interfaces and generics
- Decorators
- very configurable

## course outline
![](../img/6.png)

## Course Setup
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="app.js"></script>
    <title>Document</title>
</head>
<body>

</body>
</html>
```
```
🙅‍♂ Note ️🙅‍♀️
🔥 defer
This Boolean attribute is set to indicate to a browser that the script 
is meant to be executed after the document has been parsed, but before firing
```
```ts
console.log('Your code goes here...')
```
```js
console.log('Your code goes here...');

```
let's create a node package here
```shell

npm init -y

```
which will generate the package.json file.

then let's install **lite-server**. and add the start script as below.
```json
{
  "start": "lite-server"
}
```
this has hot reloading
but we have to compile the ts file every time we make a change to the ts file.
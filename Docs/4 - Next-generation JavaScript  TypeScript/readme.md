### 1 - Module Introduction

next-gen js features

### 2 - let and const

```ts
const userName = 'abc';

let age = 12;

age = 34;
```

```ts
function add(num1: number, num2: number) {
  let result;
  result = num1 + num2;
  return result;
}
```

let is block scoped
var is global scoped

![](../img/9.png)

```js
if (10 > 3) {
  var x = true;
}

console.log(x);
```

this will work in javascript.

### 3 - Arrow Functions

this is the shorter syntax

```ts
const addArrow = (a: number, b: number): number => a + b;
```

![](../img/10.png)

examples

```ts
const addArrow = (a: number, b: number): number => a + b;

const printValue: (a: string | number) => void = (value) => console.log(value);

const button = document.querySelector('button');

button?.addEventListener('click', () => {
  console.log('clicked');
});
```

### 4 - Default Function Parameters

has to be in order

either last or all the values need the default value

```ts
const addArrow = (a: number, b: number = 2): number => a + b;

addArrow(1);
```

but this wont

```ts
const addArrow = (a: number = 2, b: number): number => a + b;

addArrow(1);
```

### 5 - The Spread Operator ()

### 6 - Rest Parameters

### 7 - Array Object Destructuring

### 8 - How Code Gets Compiled Wrap Up

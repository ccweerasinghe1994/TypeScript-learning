function add(num1: number, num2: number) {
  return num1 + num2;
}

function printResult(num: number): void {
  console.log('Result is :' + num);
}

printResult(add(23, 2));

let someValue: undefined;

let combineValue: (a: number, b: number) => number;

combineValue = add;

console.log(combineValue(12, 3));

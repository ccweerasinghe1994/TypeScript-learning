function add(num1: number, num2: number) {
  return num1 + num2;
}

function printResult(num: number): void {
  console.log('Result is :' + num);
}

function addAndHandle(num1: number, num2: number, cb: (num: number) => void) {
  const result = num1 + num2;
  cb(result);
}

printResult(add(23, 2));

let someValue: undefined;

let combineValue: (a: number, b: number) => number;

combineValue = add;

console.log(combineValue(12, 3));

addAndHandle(1, 2, (result) => {
  console.log(result);
});

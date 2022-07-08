// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}
let add: AddFn;

add = (a: number, b: number) => {
  return a + b;
};
interface Named {
  readonly name?: string;
}
interface Getable extends Named {
  greet(phrase: string): void;
}

class Person implements Getable {
  name?: string;
  age: number = 30;
  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }
  greet(phrase: string): void {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi');
    }
  }
}

let user1: Getable;

user1 = new Person();
user1.greet('HI there my name is ');

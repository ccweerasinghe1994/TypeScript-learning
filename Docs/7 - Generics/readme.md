## 1 - Module Introduction

![](../img/16.png)

## 2 - Built-in Generics What are Generics

```ts
const array: Array<string> = ["test", "test2"];

const promise: Promise<string> = new Promise((resolve, reject) => {
  try {
    resolve("this is resolved");
  } catch (error) {
    reject(error);
  }
});

// console.log(promise);

async function promiseCall() {
  const response = await promise;
  console.log(response);
}

promiseCall();
```

## 3 - Creating a Generic Function

```ts
function merge<T, U>(objectA: T, objectB: U) {
  return Object.assign({}, objectA, objectB);
}

const response = merge({ name: "test", isObject: true }, { id: 12 });

response.name;
response.id;
response.isObject;
```

## 4 - Working with Constraints

```ts
function merge<T extends object, U extends object>(objectA: T, objectB: U) {
  return Object.assign(objectA, objectB);
}

const response = merge({ name: "test", isObject: true }, { id: 12 });

response.name;
response.id;
response.isObject;
```

## 5 - Another Generic Function

```ts
interface Lengthy {
  length: number;
}

function describe<T extends Lengthy>(element: T) {
  let description = "Got No Value";

  if (element.length === 1) {
    description = "GOT 1 ELEMENT";
  } else if (element.length > 1) {
    description = "Elemt got " + element.length + " elements";
  }

  return [element, description];
}

console.log(describe("12"));
```

## 6 - The keyof Constraint

```ts
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

console.log(extractAndConvert({ a: 12 }, "a"));
```

## 7 - Generic Classes

```ts
class DataStorage<T extends string | boolean | number> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  remove(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const dataStorage = new DataStorage<string | boolean | number>();

dataStorage.addItem("songs");
dataStorage.addItem(1);
dataStorage.addItem(true);

console.log(dataStorage.getItems());
dataStorage.remove(true);
console.log(dataStorage.getItems());
```

## 9 - Generic Utility Types

```ts
interface Goal {
  id: number;
  weight: string;
  name: string;
}

function createObject(id: number, weight: string): Goal {
  const newObject: Partial<Goal> = {};
  newObject.id = id;
  newObject.weight = weight;
  newObject.name = "andrew";

  return newObject as Goal;
}

const tesat: Readonly<string[]> = ["ABC", "EFG"];
console.log(tesat);
```

## 10 - Generic Types vs Union Types

use union when u want to use multiple type
use Generic when u want to use lock to a specific type

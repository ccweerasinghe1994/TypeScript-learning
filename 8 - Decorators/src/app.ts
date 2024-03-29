// function Logger(loggingString: string) {
//   return function (constructor: Function) {
//     console.log(loggingString);
//     console.log(constructor);
//   };
// }

// function WithTemplate(template: string, hookId: string) {
//   return function <T extends { new (...args: any[]): { name: string } }>(
//     originalConstructor: T
//   ) {
//     // here we can return a new originalConstructor function
//     return class extends originalConstructor {
//       constructor(..._args: any[]) {
//         super();
//         console.log("Running the Template Dec");
//         const hookEl = document.getElementById(hookId);
//         if (hookEl) {
//           hookEl.innerHTML = template;
//           hookEl.querySelector("h1")!.textContent = this.name;
//         }
//       }
//     };
//   };
// }

// @WithTemplate("<h1>hello there</h1>", "hook")
// class Person {
//     name = "max";
//   constructor() {
//     console.log("creating the Person Object");
//   }
// }

// const max = new Person();

// function Log(target: any, propertyName: string | Symbol) {
//   console.log("Proprety Decorator");
//   console.log("target", target);
//   console.log("pname", propertyName);
// }

// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("Accessor Decorator");
//   console.log("target", target);
//   console.log("name", name);
//   console.log("descriptor", descriptor);
// }
// function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("Method Decorator");
//   console.log("target", target);
//   console.log("name", name);
//   console.log("descriptor", descriptor);
// }
// function Log4(target: any, name: string, posistion: number) {
//   console.log("Parameter Decorator");
//   console.log("target", target);
//   console.log("name", name);
//   console.log("posistion", posistion);
// }

// class Person {
//   @Log
//   name: string;
//   private price: number;

//   @Log2
//   public set setPrice(v: number) {
//     this.price = v;
//   }

//   constructor(t: string, p: number) {
//     this.name = t;
//     this.price = p;
//   }
//   @Log3
//   priceWithTax(@Log4 tax: number) {
//     return this.price * tax;
//   }
// }

// function AutoBind(_target: any, _name: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;

//   const _modifiedDescriptor: PropertyDescriptor = {
//     configurable: true,
//     enumerable: false,
//     get() {
//       const bindFunction = originalMethod.bind(this);
//       return bindFunction;
//     },
//   };

//   return _modifiedDescriptor as TypedPropertyDescriptor<() => void>;
// }

// class Printer {
//   name = "this works";

//   @AutoBind
//   onmessage() {
//     console.log("name ->" + this.name);
//   }
// }

// const printer = new Printer();

// const button = document.querySelector("button");

// button?.addEventListener("click", printer.onmessage);

interface ValidatorConfig {
  [property: string]: {
    [validatableProps: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

// target prototype of the object this property sits on
// if it is a static property the constructor function

function Required(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: ["required"],
  };
}
function PositiveNumber(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: ["positive"],
  };
}
function validate(obj: any) {
  const objectValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objectValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objectValidatorConfig) {
    for (const validator of objectValidatorConfig[prop]!) {
      console.log(validator);

      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  courseName: string;
  @PositiveNumber
  price: number;
  constructor(courseName: string, price: number) {
    this.courseName = courseName;
    this.price = price;
  }
}

const form = document.querySelector("form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleElement = document.getElementById("name") as HTMLInputElement;
  const priceElement = document.getElementById("price") as HTMLInputElement;

  const title = titleElement.value;
  const price = +priceElement.value;

  const newCourse = new Course(title, price);
  if (!validate(newCourse)) {
    alert("Invalid Input, Please Try Again");
    return;
  }
  console.log(newCourse);
});

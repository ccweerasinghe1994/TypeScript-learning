type Admin = {
  name: string;
  privilages: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "ADAM",
  privilages: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Mix = Combinable & Numeric;

// const mix: Mix = "122";
// function add(n1: string, n2: number): string;
// function add(n1: number, n2: number): number;
// function add(n1: number, n2: string): string;
// function add(n1: string, n2: string): string;
function add(n1: Mix, n2: Mix) {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}

type UnokwnEmployee = Admin | Employee;

function printEmployeeInformation(employee: UnokwnEmployee) {
  console.log(`EMPLOYEE NAME -> ${employee.name}`);
  if ("privilages" in employee) {
    console.log(`PRIVILAGES -> ${employee.privilages}`);
  }
  if ("startDate" in employee) {
    console.log(`START DATE -> ${employee.startDate}`);
  }
}

printEmployeeInformation({
  name: `chamara`,
  privilages: ["SERVER"],
  startDate: new Date(),
});

class Car {
  drive() {
    console.log("car is driving ...");
  }
}

class Truck {
  drive() {
    console.log("truck is driving");
  }

  loading() {
    console.log("loading ...");
  }
}

type Vehicle = Car | Truck;

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loading();
  }
}

const car1 = new Car();
const truck = new Truck();

useVehicle(car1);
useVehicle(truck);

// -------------------

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function getAnimalSpeed(animal: Animal) {
  let speed: number;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
    default:
      speed = -1;
      break;
  }
  if (speed > 0) {
    console.log("animal Speed -> 👽🏠🧪 ->" + speed);
  }
}

getAnimalSpeed({
  type: "bird",
  flyingSpeed: 30,
});

// const htmlElement = document.getElementById("user-input") as HTMLInputElement;
// const htmlElement = <HTMLInputElement>document.getElementById("user-input");
const htmlElement = document.getElementById("user-input");

(htmlElement as HTMLInputElement).value = "Hi There";

interface ErrorContainer {
  [id: string]: string;
}

const error: ErrorContainer = {
  email: "not a valid email",
  username: "invalid User name",
};

const a = {
  b: {
    x: {
      y: 12,
    },
  },
};

console.log(a?.b?.x?.y);

const userinput = "";

const testValue = userinput ?? "DEFAULT";

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

type Combinable = string | boolean;
type Numeric = string | number;

type Mix = Combinable & Numeric;

// const mix: Mix = "122";

function add(n1: Mix, n2: Mix) {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}

add("1", "2");

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

// Code goes here!

class Department {
  firstName: string = 'Default';
  private employees: string[] = [];
  constructor(n: string) {
    this.firstName = n;
  }

  describe(this: Department) {
    console.log('department : ' + this.firstName);
  }
  addEmployees(employee: string) {
    this.employees.push(employee);
  }
}

const accounting = new Department('Accounting');

accounting.addEmployees('dasun');

console.log(accounting);

class Department {
  private employees: string[] = [];
  constructor(public firstName: string, private readonly id: string) {}

  describe(this: Department) {
    console.log(`department ${this.id} : ` + this.firstName);
  }

  addEmployees(employee: string) {
    this.employees.push(employee);
  }
}

const accounting = new Department('Accounting', 'D1');

accounting.addEmployees('dasun');

accounting.describe();

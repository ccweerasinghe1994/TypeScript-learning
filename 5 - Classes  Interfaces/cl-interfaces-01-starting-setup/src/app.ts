class Department {
  protected employees: string[] = [];
  constructor(public firstName: string, private readonly id: string) {}

  describe(this: Department) {
    console.log(`department ${this.id} : ` + this.firstName);
  }

  addEmployees(employee: string) {
    this.employees.push(employee);
  }
}

class ItDepartment extends Department {
  constructor(id: string, public reports: string[]) {
    super('IT', id);
  }

  addReport(report: string) {
    this.reports.push(report);
  }

  printReport() {
    console.log(this.reports);
  }

  addEmployees(employee: string): void {
    this.employees.push(employee);
  }
}

const it = new ItDepartment('D1', ['something went wrong']);

it.addEmployees('dasun');

it.describe();

it.addReport('report 2');

it.printReport();
it.addEmployees('chamara');
console.log(it);

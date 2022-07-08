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
  private lastReport: string;

  get mostResentReport() {
    if (!this.lastReport) {
      throw new Error('There is no report');
    }
    return this.lastReport;
  }

  set mostResentReport(value: string) {
    if (!value) {
      throw new Error('please input a correct value');
    }
    this.addReport(value);
  }

  constructor(id: string, public reports: string[]) {
    super('IT', id);
    this.lastReport = reports[0];
  }

  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }

  printReport() {
    console.log(this.reports);
  }

  addEmployees(employee: string): void {
    this.employees.push(employee);
  }
}

const it = new ItDepartment('D1', ['report']);

console.log((it.mostResentReport = 'this is a test'));
console.log(it.mostResentReport);

abstract class Department {
  static physicalYear = '1212';
  protected employees: string[] = [];
  constructor(public firstName: string, protected readonly id: string) {}

  abstract describe(this: Department): void;

  addEmployees(employee: string) {
    this.employees.push(employee);
  }

  static createEmployee(name: string) {
    return {
      name: name,
      year: this.physicalYear,
    };
  }
}

class ItDepartment extends Department {
  private lastReport: string;
  private static instance: ItDepartment;
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

  private constructor(id: string, public reports: string[]) {
    super('IT', id);
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ItDepartment('CD', ['a']);
    return this.instance;
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
  describe() {
    console.log(`Accounting department ${this.id} : ` + this.firstName);
  }
}

const it = ItDepartment.getInstance();
const it2 = ItDepartment.getInstance();

console.log(it);
console.log(it2);

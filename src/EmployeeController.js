const Employee = require("./Employee");
const EmployeeRole = require("./EmployeeRole");
const EmployeeSeniority = require("./EmployeeSeniority");

module.exports = class EmployeeController {
  constructor() {
    this.cache = null;
  }

  async readEmployees(dataSource) {
    if (this.cache === null) {
      const employeesData = await dataSource.getAllEmployees(dataSource);

      this.cache = employeesData.map(
        (employeeData) =>
          new Employee(
            employeeData.FIRST_NAME,
            employeeData.LAST_NAME,
            EmployeeRole[employeeData.ROLE],
            EmployeeSeniority[employeeData.SENIORITY]
          )
      );
    }

    return this.cache;
  }
};

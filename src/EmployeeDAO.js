const Employee = require("./Employee");
const EmployeeRole = require("./EmployeeRole");
const EmployeeSeniority = require("./EmployeeSeniority");

module.exports = class EmployeeDAO {

  async readEmployees(dataSource) {
    const employeesData = await dataSource.getAllEmployees(dataSource);

    return employeesData.map(
      (employeeData) =>
        new Employee(
          employeeData.FIRST_NAME,
          employeeData.LAST_NAME,
          EmployeeRole[employeeData.ROLE],
          EmployeeSeniority[employeeData.SENIORITY]
        )
    );
  }
};

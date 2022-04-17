const EmployeeController = require("./EmployeeController");


module.exports = class EmployeeFormat {

  constructor() {
    this.employees = new EmployeeController();
  }



  async employeesAsHtml(dataSource) {
    const employeesData = await this.employees.readEmployees(dataSource);

    const header = "<tr><th>Employee</th><th>Position</th></tr>";
    const tableStart = `<table>${header}`;
    const tableEnd = "</table>";

    return (
      employeesData.reduce(
        (table, employee) =>
          table +
          "<tr>" +
          `<td>${employee.firstName} ${employee.lastName}</td>` +
          `<td>${employee.seniority} ${employee.role}</td>` +
          "</tr>",
        tableStart
      ) + tableEnd
    );
  }

  async employeesAsJson(dataSource) {
    const employeesData = await this.employees.readEmployees(dataSource);

    const result = employeesData.reduce(
      (collection, employee) =>
        Object.assign(collection, {
          [employee.name]: employee,
        }),
      {}
    );

    return JSON.stringify(result);
  }
};

module.exports = class EmployeeFormat {

  async employeesAsHtml(employeesData) {

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

  async employeesAsJson(employeesData) {
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

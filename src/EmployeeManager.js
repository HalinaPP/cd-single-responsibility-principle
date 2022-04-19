const EmployeeFormat = require("./EmployeeFormat");

module.exports = class EmployeeManager {
  constructor(emailService) {
    this.emailService = emailService;
    this.employeeFormat = new EmployeeFormat();
  }

  async createReportAsHtml(employeesData) {
    return await this.employeeFormat.employeesAsHtml(employeesData);
  }

  async sendEmployeesReport(employeesData) {
    const subject = "Employees report";

    const reportData = await this.createReportAsHtml(employeesData);

    return await this.emailService.send(subject, reportData);
  }
};

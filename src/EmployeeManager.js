const EmailService = require("./EmailService");
const Report = require("./Report");
const EmployeeFormat = require("./EmployeeFormat");

module.exports = class EmployeeManager {
  constructor(mailer) {
    this.emailService = new EmailService(mailer);
    this.employeeFormat = new EmployeeFormat();
  }

  async createReportAsHtml(dataSource) {
     return await this.employeeFormat.employeesAsHtml(dataSource);
  }

  async sendEmployeesReport(dataSource) {
    const subject = "Employees report";

    const reportData = await this.createReportAsHtml(dataSource);

    return await this.emailService.send(subject, reportData);
  }
};

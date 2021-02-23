const Employee = require('./Employee');
const EmployeeRole = require('./EmployeeRole');
const EmployeeSeniority = require('./EmployeeSeniority');

module.exports = class EmployeeManager {
    constructor(mailer) {
        this.cache = null;
        this.mailer = mailer;
    }

    async sendEmployeesReport(dataSource) {
        const to = 'abcd@gmail.com';
        const from = 'web@gmail.com';
        const host = 'localhost';

        return this.mailer.setFrom(from)
            .addRecipient(to)
            .setSubject('Employees report')
            .setContent(await this.getAllEmployeesAsHtml(dataSource), 'text/html; charset=utf-8')
            .send(host);
    }

    async getAllEmployeesAsHtml(dataSource) {
        const employees = await this.readEmployees(dataSource);
        const header = '<tr><th>Employee</th><th>Position</th></tr>';
        const tableStart = `<table>${header}`;
        const tableEnd = '</table>';

        return employees.reduce(
            (table, employee) => table + '<tr>' +
                `<td>${employee.firstName} ${employee.lastName}</td>` +
                `<td>${employee.seniority} ${employee.role}</td>` +
            '</tr>',
            tableStart
        ) + tableEnd;
    }

    async employeesAsJson(dataSource) {
        const employees = await this.readEmployees(dataSource);
        const result = employees.reduce(
            (collection, employee) => Object.assign(
                collection, {
                    [employee.name]: employee
                }
            ), {}
        );
        
        return JSON.stringify(result);
    }

    async readEmployees(dataSource) {
        if (this.cache === null) {
            const employeesData = await dataSource.getAllEmployees(dataSource);

            this.cache = employeesData.map(employeeData => new Employee(
                employeeData.FIRST_NAME,
                employeeData.LAST_NAME,
                EmployeeRole[employeeData.ROLE],
                EmployeeSeniority[employeeData.SENIORITY]
            ));
        }

        return this.cache;
    }
}

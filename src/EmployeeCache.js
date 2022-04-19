module.exports = class EmployeeCache {
  constructor(employeesData) {
    this.cache = null;
    this.employeesData = employeesData;
  }

  async readEmployees(dataSource) {
    if (this.cache === null) {
      this.cache =  await this.employeesData.readEmployees(dataSource);
    }
    return this.cache;
  }
};

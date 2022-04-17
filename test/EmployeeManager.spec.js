const assert = require("assert");
const EmployeeManager = require("../src/EmployeeManager");
const MailerMock = require("./MailerMock");

describe("EmployeeManager", () => {
  let dataSourceMock;
  const dataSourceErrorMock = {
    getAllEmployees: () => Promise.reject(),
  };
  const mailerMock = new MailerMock();

  const setDataSourceMock = (employees) => {
    dataSourceMock = {
      getAllEmployees: () => Promise.resolve(employees),
    };
  };

  const testSendMail = async (expected) => {
    const manager = new EmployeeManager(mailerMock);
    await manager.sendEmployeesReport(dataSourceMock);
    assert.strictEqual(mailerMock.getLastSentItem().content, expected);

    //check caching
    mailerMock.resetHistory();
    await manager.sendEmployeesReport(dataSourceErrorMock);
    assert.strictEqual(mailerMock.getLastSentItem().content, expected);
  };

  it("send single employee report", () => {
    setDataSourceMock([
      {
        FIRST_NAME: "Wayne",
        LAST_NAME: "Rooney",
        ROLE: "RESOURCE_MANAGER",
        SENIORITY: "SENIOR",
      },
    ]);
    return testSendMail(
      "<table>" +
        "<tr><th>Employee</th><th>Position</th></tr>" +
        "<tr><td>Wayne Rooney</td><td>SENIOR RESOURCE_MANAGER</td></tr>" +
        "</table>"
    );
  });

  it("send single employee report", () => {
    setDataSourceMock([
      {
        FIRST_NAME: "Wayne",
        LAST_NAME: "Rooney",
        ROLE: "SOFTWARE_ENGINEER",
        SENIORITY: "LEAD",
      },
      {
        FIRST_NAME: "Harry",
        LAST_NAME: "Kane",
        ROLE: "SOFTWARE_TEST_ENGINEER",
        SENIORITY: "JUNIOR",
      },
    ]);
    return testSendMail(
      "<table>" +
        "<tr><th>Employee</th><th>Position</th></tr>" +
        "<tr><td>Wayne Rooney</td><td>LEAD SOFTWARE_ENGINEER</td></tr>" +
        "<tr><td>Harry Kane</td><td>JUNIOR SOFTWARE_TEST_ENGINEER</td></tr>" +
        "</table>"
    );
  });
});

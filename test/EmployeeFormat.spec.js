const assert = require("assert");
const EmployeeFormat = require("../src/EmployeeFormat");

describe("EmployeeFormat", () => {
  let dataSourceMock;
  const dataSourceErrorMock = {
    getAllEmployees: () => Promise.reject(),
  };

  const setDataSourceMock = (employees) => {
    dataSourceMock = {
      getAllEmployees: () => Promise.resolve(employees),
    };
  };

  const testJsonConvert = async (json) => {
    const employeeFormat = new EmployeeFormat();
    let serialized = await employeeFormat.employeesAsJson(dataSourceMock);

    assert.strictEqual(serialized, json);

    //check caching
    serialized = await employeeFormat.employeesAsJson(dataSourceErrorMock);
    assert.strictEqual(serialized, json);
  };

  it("empty json", () => {
    setDataSourceMock([]);
    return testJsonConvert("{}");
  });

  it("single employee json", () => {
    setDataSourceMock([
      {
        FIRST_NAME: "Wayne",
        LAST_NAME: "Rooney",
        ROLE: "PROJECT_MANAGER",
        SENIORITY: "REGULAR",
      },
    ]);
    return testJsonConvert(
      '{"Wayne Rooney":{"firstName":"Wayne","lastName":"Rooney","role":"PROJECT_MANAGER","seniority":"REGULAR"}}'
    );
  });

  it("multiple employees json", () => {
    setDataSourceMock([
      {
        FIRST_NAME: "Wayne",
        LAST_NAME: "Rooney",
        ROLE: "SOFTWARE_ENGINEER",
        SENIORITY: "CHIEF",
      },
      {
        FIRST_NAME: "Harry",
        LAST_NAME: "Kane",
        ROLE: "SOFTWARE_TEST_AUTOMATION_ENGINEER",
        SENIORITY: "JUNIOR",
      },
    ]);
    return testJsonConvert(
      '{"Wayne Rooney":{"firstName":"Wayne","lastName":"Rooney","role":"SOFTWARE_ENGINEER","seniority":"CHIEF"},' +
        '"Harry Kane":{"firstName":"Harry","lastName":"Kane","role":"SOFTWARE_TEST_AUTOMATION_ENGINEER","seniority":"JUNIOR"}}'
    );
  });
});

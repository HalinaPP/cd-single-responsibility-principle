module.exports = class Employee {
    constructor(firstName, lastName, role, seniority) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.seniority = seniority;
    }

    get name() {
        return `${this.firstName} ${this.lastName}`;
    }
}

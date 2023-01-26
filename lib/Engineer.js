import Employee from './Employee.js';

class Engineer extends Employee {
    constructor(name,id,email,github) {
        super();
        this.github = github;
    }
    getGithub = () => this.github;
    getRole = () => 'Engineer';
}

export default Engineer;

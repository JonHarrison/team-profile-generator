class Questions {
    constructor(prompts = []) {
        this.prompts = prompts;
    }
    addQuestion(name, message, validate) {
        this.prompts.push({ type: 'input', name: name, message: message, validate: validate });
        return this.this(); // this
    }
    addMenu(choices) {
        this.prompts.push({ type: 'list', name: 'menu', message: 'Menu', choices: choices });
        return this.this(); // this
    }
    this() { return this; }
    value() { return this.prompts; }
}

export default Questions;

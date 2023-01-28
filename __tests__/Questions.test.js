import Questions from "../lib/Questions";

// constructor
test("Questions constructor", () => {
    const questions = new Questions( [ { prompt: 'test constructor' } ] );
    expect(questions).not.toBe(undefined);
    expect('addQuestion' in questions).toEqual(true);
    expect('addMenu' in questions).toEqual(true);
    expect('this' in questions).toEqual(true);
    expect('value' in questions).toEqual(true);
});

// addQuestion
test("Validate addQuestion", () => {
    const questions = new Questions();
    const testQuestion = [ { 'type': 'input', 'name': 'test name', 'message': 'test message', 'validate': 'test validate' } ];
    questions.addQuestion('test name','test message','test validate');
    expect(questions.value()).toEqual(testQuestion);
});

// addMenu
test("Validate addMenu", () => {
    const questions = new Questions();
    const testMenu = [ { type: 'list', name: 'menu', message: 'Menu', choices: ['option1','option2','option3'] } ];
    questions.addMenu(['option1','option2','option3']);
    expect(questions.value()).toEqual(testMenu);
});

// this
test("Questions this", () => {
    const questions = new Questions( [ { 'test': 'test this' } ] );
    expect(questions.this()).toEqual(questions);
});

// value
test("Questions value", () => {
    const testValue = [ { 'test': 'test value' } ];
    const questions = new Questions( testValue);
    expect(questions.prompts).toEqual(testValue);
    expect(questions.value()).toEqual(testValue);
});

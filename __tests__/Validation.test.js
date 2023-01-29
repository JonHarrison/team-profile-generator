import Validation from "../lib/Validation";

// constructor
test("Validate constructor", () => {
    const validation = new Validation();
    expect(validation).not.toBe(undefined);
    expect('alphanumeric' in validation).toEqual(true);
    expect('numeric' in validation).toEqual(true);
    expect('email' in validation).toEqual(true);
});

// alphanumeric
test("Validate valid alphanumeric entry", () => {
    const validation = new Validation();
    const testString = 'A0 9Z';
    expect(validation.alphanumeric(testString)).toBe(true);
});
test("Validate invalid alphanumeric entry", () => {
    const validation = new Validation();
    const testString = '# ';
    expect(validation.alphanumeric(testString)).toBe("Please enter an alphanumeric string");
});

// numeric
test("Validate valid numeric entry", () => {
    const validation = new Validation();
    const testString = '091';
    expect(validation.numeric(testString)).toBe(true);
});
test("Validate invalid numeric entry", () => {
    const validation = new Validation();
    const testString = 'a';
    expect(validation.numeric(testString)).toBe("Please enter a number");
});

// email
test("Validate valid email entry", () => {
    const validation = new Validation();
    const testString = 'a@b.com';
    expect(validation.email(testString)).toBe(true);
});
test("Validate invalid email entry", () => {
    const validation = new Validation();
    const testString = '@';
    expect(validation.email(testString)).toBe("Please enter a valid email address");
});

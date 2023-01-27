// external modules
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// internal modules
import Manager from './lib/Manager.js';
import Engineer from './lib/Engineer.js';
import Intern from './lib/Intern.js';
import { render } from './src/page-template.js';
import Questions from './lib/Questions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

function makeQuestions(role = 'Manager') {

    // common questions
    let prompts = new Questions()
        // name - validate as a string
        .addQuestion('name', `What is the ${role}'s name?`, name => /[a-zA-Z]/gi.test(name))
        // id - validate as a number
        .addQuestion('id', 'What is their employee ID?', id => /[0-9]/gi.test(id))
        // email - validate as an email address
        .addQuestion('email', 'What is their email address?', email => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email))
        .this();

    // role specific questions
    switch (role) {
        case 'Manager':
            prompts
                // office - validate as a string
                .addQuestion('office', 'What is their office number?', val => /[a-zA-Z0-9]/gi.test(val))
                .this();
            break;
        case 'Engineer':
            prompts
                // github - validate as a string
                .addQuestion('github', 'What is their GitHub username?', val => /[a-zA-Z0-9]/gi.test(val))
                .this();
            break;
        case 'Intern':
            prompts
                // school - validate as a string
                .addQuestion('school', 'What is their school?', val => /[a-zA-Z0-9]/gi.test(val))
                .this();
            break;
        default:
            throw new error('Unknown employee role');
    }

    // menu options
    prompts
        .addMenu(['Add an engineer', 'Add an intern', 'Finish building the team'])
        .this();

    return prompts.value();
}

// array of employee information, used for rendering HTML
let employees = [];

async function addEmployee(role = 'Manager') {
    let questions = makeQuestions(role);

    const answers = await inquirer
        .prompt(questions)
        .then(data => {
            const { name, id, email, office, github, school, menu } = data;
            // push a new class to the employees array based on their role
            switch (role) {
                case 'Manager':
                    employees.push(new Manager(name, id, email, office));
                    break;
                case 'Engineer':
                    employees.push(new Engineer(name, id, email, github));
                    break;
                case 'Intern':
                    employees.push(new Intern(name, id, email, school));
                    break;
                default:
                    throw new error('Unknown employee role');
            }
            return menu;
        })
        .then(async menu => {
            // check menu option, either recurse to add an new employee or return
            switch (menu) {
                case 'Finish building the team':
                    return employees;
                    break;
                case 'Add an engineer':
                    await addEmployee('Engineer');
                    break;
                case 'Add an intern':
                    await addEmployee('Intern');
                    break;
            }
        });
}

// function to write team.html file
function writeToFile(data) {
    (async () => {
        await fs.writeFile(outputPath, data, (err) => {
            if (err) console.error(err);
        })
    })();
}

// function to initialize program
(async function init() {
    addEmployee()
        .then((response) => {
            return render(employees);
        })
        .then((html) => {
            writeToFile(html);
        })
        .then(() => console.log(`Successfully written to ${outputPath}`))
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
                console.log(error);
            }
        });

}
)();

import Manager from './lib/Manager.js';
import Engineer from './lib/Engineer.js';
import Intern from './lib/Intern.js';

import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

import { render } from './src/page-template.js';

let employees = [];

//const makeInputQuestion = (name, message) => { return { type: 'input', name: name, message: message }; }

function makeQuestions(role = 'Manager') {
    let prompts = [
        {
            type: 'input',
            name: 'name',
            message: `What is the ${role}'s name?`
        },
        {
            type: 'input',
            name: 'id',
            message: "What is their employee ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is their email address?"
        }
    ];
    switch (role) {
        case 'Manager':
            prompts.push({
                type: 'input',
                name: 'office',
                message: "What is their office number?"
            });
            break;
        case 'Engineer':
            prompts.push({
                type: 'input',
                name: 'github',
                message: "What is their GitHub username?"
            });
            break;
        case 'Intern':
            prompts.push({
                type: 'input',
                name: 'school',
                message: "What is their school?"
            });
            break;
    }
    prompts.push({
        type: 'list',
        name: 'menu',
        message: 'menu',
        choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
    });
    return prompts;
}

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
            const output = render(employees);
            writeToFile(output);
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

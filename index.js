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

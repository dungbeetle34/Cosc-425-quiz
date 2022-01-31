#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Logic Gates Survival Quiz \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgRed('HOW TO PLAY')}
        My name is Mr. Quizlet.
        I eat questions for breakfast, lunch, and dinner.
        If you get any questions wrong I will ${chalk.bgBlue('DIE')}.
        Answer them correctly, so I can eat...

        The following notation is used to represent gates:

        ${chalk.bgBlackBright('AND:')}                            ${chalk.bgBlackBright('OR:')}                             ${chalk.bgBlackBright('NOT:')} 
        
        INPUT───|&&                     INPUT───|OR                     INPUT───│>o───OUTPUT
                |&&───OUTPUT                    |OR───OUTPUT
        INPUT───|&&                     INPUT───|OR 
        
        ${chalk.bgBlackBright('NAND:')}                           ${chalk.bgBlackBright('NOR:')}                            ${chalk.bgBlackBright('XOR:')}
        
        INPUT───|&&>o                   INPUT───|OR>o                   INPUT───│XOR
                |&&>o───OUTPUT                  |OR>o───OUTPUT                  |XOR───OUTPUT
        INPUT───|&&>o                   INPUT───|OR>o                   INPUT───|XOR 
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: `What is the Boolean Algebra Conversion of this circuit?

        A────│>o────│&&
                    │&&─────┐
        B────│>o────│&&     └│OR
                             │OR─────OUTPUT
        B───────────│&&     ┌│OR
                    │&&─────┘
        C───────────│&&    \n\n`,
        choices: [
            'A\'B\'+BC',
            'A(B\'+B)C',
            'AB\'BC\'',
            'A\'B\'BC',
        ],
    });

    return handleAnswer(answers.question_1 == 'A\'B\'+BC');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: `What is the Sigma Notation of this Karnaugh Map?

        _________________
        │___│_1_│___│___│
        │___│_1_│_1_│_1_│
        │_1_│_1_│_1_│___│
        │___│_1_│___│___│ \n\n`,
        choices: [
            'Σ(1,3,6,8,10,12,14,15)',
            'Σ(1,5,6,8,9,10,11,13)',
            'Σ(2,6,7,8,10,13,14,15)',
            'Σ(1,5,6,7,9,12,13,15)',
        ],
    });

    return handleAnswer(answers.question_2 == 'Σ(1,5,6,7,9,12,13,15)');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `What is the Karnaugh Map of the π notation of Σ(1,5,6,7,9,12,13,15)?\n\n`,
        choices: [
            `
            
            
            │___│_1_│___│___│
            │___│_1_│_1_│_1_│
            │___│_1_│_1_│___│
            │___│_1_│_1_│___│`,
            `
            
            
            │___│_1_│___│___│
            │___│_1_│_1_│_1_│
            │_1_│_1_│_1_│___│
            │___│_1_│___│___│`,
            `
            
            
            │___│___│_1_│___│
            │___│_1_│_1_│___│
            │_1_│_1_│_1_│_1_│
            │___│_1_│_1_│___│`,
            `
            
            
            │___│_1_│___│___│
            │___│_1_│_1_│_1_│
            │_1_│_1_│___│_1_│
            │___│_1_│___│___│`,
        ],
    });

    return handleAnswer(answers.question_3 == 
            `
            
            
            │___│___│_1_│___│
            │___│_1_│_1_│___│
            │_1_│_1_│_1_│_1_│
            │___│_1_│_1_│___│`);
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: `What is the order of precedence for these operators (highest->lowest)?\n`,
        choices: [
           'Complement, AND, XOR, OR',

           'AND, OR, XOR, Complement',

           'OR, XOR, AND, Complement',

           'XOR, OR, Complement, AND',
        ],
    });

    return handleAnswer(answers.question_4 == 'Complement, AND, XOR, OR');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'What is the equivalent AND-OR expression to (AB+A\'B\')\'?',
        choices: [
            'A\'B\'+AB',
            'AB+A\'B\'',
            'ABB\'+A\'',
            'AB\'+A\'B',
        ],
    });

    return handleAnswer(answers.question_5 == 'AB\'+A\'B');
}

async function question6() {
    const answers = await inquirer.prompt({
        name: 'question_6',
        type: 'list',
        message: 'What is the minimum AND-OR expression for Σ(3,4,5,10) + d(2,11,13,15)',
        choices: [
            'A\'B\'CD+AC\'',
            'B\'C+A\'BC\'',
            'A\'B\'CD+ABC\'D\'',
            'BC\'D+AD\'',
        ],
    });

    return handleAnswer(answers.question_6 == 'B\'C+A\'BC\'');
}

async function question7() {
    const answers = await inquirer.prompt({
        name: 'question_7',
        type: 'list',
        message: 'What is the equivalent OR-AND expression of (AB\'C)\'(AC)\'',
        choices: [
            'A\'B\'+BC',
            'A(B\'+B)C',
            '(A\'+B+C\')(A\'+C\')',
            '(A\'+B\')(B+C)',
        ],
    });

    return handleAnswer(answers.question_7 == '(A\'+B+C\')(A\'+C\')');
}

async function question8() {
    const answers = await inquirer.prompt({
        name: 'question_8',
        type: 'list',
        message: 'What is a minterm?',
        choices: [
            'An OR of minterms in which no two identical minterms appear',
            'An AND-OR expression in which all input variables occur exactly once',
            'It is directly related to a truth table because each term in the expression represents a 1 in the truth table',
        ],
    });

    return handleAnswer(answers.question_8 == 'An AND-OR expression in which all input variables occur exactly once');
}

async function question9() {
    const answers = await inquirer.prompt({
        name: 'question_9',
        type: 'list',
        message: 'Which of the following is true about Karnaugh Maps?',
        choices: [
            'The distance between two minterms is the number of places in which they differ',
            'Two minterms are adjacent if the distance between them is one',
            'A Karnaugh map is a truth table arranged so that adjacent cells represent adjacent minterms',
            'All of the above',
        ],
    });

    return handleAnswer(answers.question_9 == 'All of the above');
}

async function question10() {
    const answers = await inquirer.prompt({
        name: 'question_10',
        type: 'list',
        message: 'An enable line to a combination device turns the device on or off. Which of the following is true about enable lines?',
        choices: [
            'If enable = 0 the device performs its function with the output depending on the other inputs',
            'If enable = 1 the device performs its function with the input depending on the other outputs',
            'If enable = 0 the output is 0 regardless of any other inputs',
            'If enable = 1 the output is 0 regardless of any other inputs',
        ],
    });

    return handleAnswer(answers.question_10 == 'If enable = 0 the output is 0 regardless of any other inputs');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({text: `\nCorrect!\n`});
    } else {
        spinner.error({text: `\n😑😑😑 I'm starving and you killed me ${playerName.toUpperCase()}!`});
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Congrats , ${playerName} ! \n Reward : $ 1 , 000 , 000`;

    figlet(msg, (err, data) =>  {
        console.log(gradient.pastel.multiline(data));
    });
}


await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
await winner();
const inquirer = require('inquirer');

require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Select an option',
        choices: [
            {
                value: '1',
                name: 'Create task'
            },
            {
                value: '2',
                name: 'List tasks'
            },
            {
                value: '3',
                name: 'List completed tasks'
            },
            {
                value: '4',
                name: 'List pending tasks'
            },
            {
                value: '5',
                name: 'mark as complete'
            },
            {
                value: '6',
                name: 'Delete task'
            },
            {
                value: '0',
                name: 'Close'
            },
        ]
    }
];

const inquirerMenu = async () => {

    console.clear();
    console.log('======================'.cyan);
    console.log('  Task manager menu'.cyan);
    console.log('======================\n'.cyan);

    const { option } = await inquirer.prompt(questions);

    return option;

}

const pause = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.cyan} to continue`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);

}

const readInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Insert description please';
                }
                return true;
            }
        }
    ]

    const { description } = await inquirer.prompt(question);

    return description;

}

const deleteTaskList = async (tasks) => {

    const choices = tasks.map((task, index) => {

        const i = `${index + 1}.`.cyan;

        return {
            value: task.id,
            name: `${i} ${task.description}`
        }

    });

    choices.unshift({
        value: '0',
        name: `${'0.'.cyan} Cancel`
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ];

    const { id } = await inquirer.prompt(questions);

    return id;


}

const deleteConfirmation = async (message) => {

    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(questions);

    return ok;

}

const showChecklist = async (tasks) => {

    const choices = tasks.map((task, index) => {

        const i = `${index + 1}.`.cyan;

        return {
            value: task.id,
            name: `${i} ${task.description}`,
            checked: task.completed
        }

    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(question);

    return ids;


}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskList,
    deleteConfirmation,
    showChecklist
}

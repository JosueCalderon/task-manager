
const { stdout } = require('process');

require('colors');

const showMenu = () => {

    const promise = new Promise((resolve) => {

        console.clear();
        console.log('======================'.cyan);
        console.log('  Task manager menu'.cyan);
        console.log('======================\n'.cyan);

        console.log(`${'1.'.cyan} Create task`);
        console.log(`${'2.'.cyan} List tasks`);
        console.log(`${'3.'.cyan} List completed tasks`);
        console.log(`${'4.'.cyan} List pending tasks`);
        console.log(`${'5.'.cyan} Complete task`);
        console.log(`${'6.'.cyan} Delete task`);
        console.log(`${'0.'.cyan} Close \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: stdout
        });

        readline.question('Select an option: ', (opt) => {
            resolve(opt)
            readline.close();
        })

    })

    return promise;

}

const pause = () => {

    const promise = new Promise((resolve, reject) => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: stdout
        });

        readline.question(`\nPress ${'ENTER'.cyan} to continue\n`, (opt) => {
            resolve();
            readline.close();
        })

    })

    return promise;

}

module.exports = {
    showMenu,
    pause
}
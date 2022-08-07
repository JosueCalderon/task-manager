const { inquirerMenu, pause, readInput, deleteTaskList, deleteConfirmation, showChecklist } = require('./helpers/inquirer');
const { saveData, readData } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async () => {

    let opt = '';

    const tasks = new Tasks();

    const dbTasks = readData();

    if (dbTasks) {
        tasks.retrieveTasksArray(dbTasks);
    }

    do {

        opt = await inquirerMenu();

        switch (opt) {

            case '1':

                const description = await readInput('Description:');
                tasks.createTask(description)

                break;

            case '2':

                tasks.retrieveAll();

                break;

            case '3':

                tasks.retrieveCompletedPendingTasks(true);

                break;

            case '4':

                tasks.retrieveCompletedPendingTasks(false);

                break;

            case '5':

                const ids = await showChecklist(tasks.getList);
                tasks.toggleStates(ids)

                break;

            case '6':

                const id = await deleteTaskList(tasks.getList)

                if (id !== '0') {

                    const confirm = await deleteConfirmation('Are you sure?')

                    if (confirm) {
                        tasks.deleteTask(id)
                    }

                }

                break;
        }

        saveData(tasks.getList);

        await pause();

    } while (opt != '0');

}

main();
require('colors');

const Task = require("./task");

class Tasks {

    _list = {};

    constructor() {
        this._list = {};
    }

    get getList() {

        const list = [];

        Object.keys(this._list).forEach(key => {
            list.push(this._list[key])
        })

        return list;

    }

    retrieveTasksArray(tasks = []) {

        tasks.forEach(task => {
            this._list[task.id] = task;
        });

    }

    createTask(description = '') {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    retrieveAll() {

        const list = this.getList;

        console.log();

        list.forEach((task, index) => {

            const i = `${index + 1}.`.cyan;

            const { description, completed } = task;

            console.log(`${i} ${description} :: ${(completed) ? 'COMPLETED'.green : 'PENDING'.red}`)

        })

    }

    retrieveCompletedPendingTasks(status) {

        const list = this.getList;

        list.forEach((task) => {

            let index = 0;

            const { description, completed } = task;

            if (status) {

                if (completed) {

                    index += 1
                    console.log(`${`${index.toString()}.`.cyan} ${description} :: ${'COMPLETED'.green}`)

                }

            } else {

                if (!completed) {

                    index += 1
                    console.log(`${`${index.toString()}.`.cyan} ${description} :: ${'PENDING'.red}`)

                }

            }

        });

    }

    deleteTask(id) {

        if (this._list[id]) {

            delete this._list[id]

        }

    }

    toggleStates(ids) {

        ids.forEach(id => {

            const task = this._list[id]

            if (!task.completed) {

                task.completed = true

            }

        });

        this.getList.forEach(task => {

            if (!ids.includes(task.id)) {

                const tasks = this._list[task.id];
                tasks.completed = false;

            }

        })

    }

}

module.exports = Tasks;
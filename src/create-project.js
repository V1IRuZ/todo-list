export class Project {
    tasks = [];

    constructor(name) {
        this.name = name;
    }

    addToDo(todo) {
        this.tasks.push(todo)
    }

    removeToDo(index) {
        this.tasks.splice(index, 1);
    }
}
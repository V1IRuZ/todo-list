import { Todo } from "./create-todo";

export class Project {
constructor({name, tasks = []}) {
        this.name = name;
        this.tasks = tasks.map(task => new Todo(task))
    }

    addToDo(todo) {
        this.tasks.push(todo)
    }

    removeToDo(index) {
        this.tasks.splice(index, 1);
    }
}
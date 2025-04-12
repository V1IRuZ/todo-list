import { makeToDo } from "./new-todo";

class Project {
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

const projects = [];

const makeNewProject = (name) => {
    const project = new Project(name);
    projects.push(project);
}

const removeProject = (array, index) => {
    array.splice(index, 1);
}

export { projects }
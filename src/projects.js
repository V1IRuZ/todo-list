import { Todo } from "./new-todo";

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
let activeProject = projects[0];

const makeNewProject = (name) => {
    const project = new Project(name);
    projects.push(project);
}

const removeProject = (array, index) => {
    array.splice(index, 1);
}

const switchActiveProject = (projectName) => {
    activeProject = projects.find(project => project.name === projectName);
}

const AddToDoToCurrentProject = (title, description, dueDate, priority) => {
    const newToDo = new Todo(title, description, dueDate, priority);
    activeProject.tasks.push(newToDo);
}

makeNewProject("Workout");
makeNewProject("Everyday tasks");
makeNewProject("Restaurant App");

switchActiveProject("Workout");

AddToDoToCurrentProject(activeProject, "Legday", "Lower body 2", "13.11.2025", "Medium");
console.log(activeProject)

export { makeNewProject, projects }
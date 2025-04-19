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
let activeProject;

const getProjects = () => projects;

const getActiveProject = () => activeProject;

const makeNewProject = (name) => {
    const project = new Project(name);
    projects.push(project);
}

const removeProject = (array, index) => {
    array.splice(index, 1);
}

const switchActiveProject = (index) => {
   return activeProject = projects[index];
}

const addToDoToCurrentProject = (title, description, dueDate, priority) => {
    const newToDo = new Todo(title, description, dueDate, priority);
    activeProject.tasks.push(newToDo);
    console.log(activeProject.tasks);
}

makeNewProject("Workout");
makeNewProject("Everyday tasks");
makeNewProject("Restaurant App");


// AddToDoToCurrentProject(activeProject, "Legday", "Lower body 2", "13.11.2025", "Medium");
// console.log(activeProject)

export { makeNewProject, getActiveProject, getProjects, switchActiveProject, addToDoToCurrentProject }
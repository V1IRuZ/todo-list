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
    return project;
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

function withActiveProject(callback) {
    if (!activeProject) {
        return;
    }
    callback(activeProject);
}

const defaultProject = () => {
    const myProject = makeNewProject("Everyday tasks");
    activeProject = myProject;

    addToDoToCurrentProject("Brush teeth", "Wash thoroughly with a 2-minute timer", "2025-06-23", "High");
    addToDoToCurrentProject("Take allergy medicine", "1 allergy tablet and 2 sprays in both nostrils", "2025-06-25", "Critical");
    addToDoToCurrentProject("Visit the store", "Buy milk, bread and eggs", "2025-06-21", "Medium");
    addToDoToCurrentProject("Visit the library", "Borrow study books", "2025-06-20", "Medium");
    addToDoToCurrentProject("Dentist", "Book an appointment for a dental check-up", "2025-06-20", "High");
    addToDoToCurrentProject("Play videogames", "After a long day, relax and play some video games", "2025-06-22", "Low");
}

defaultProject();

makeNewProject("Workout");
makeNewProject("Restaurant App");




export { makeNewProject, getActiveProject, getProjects, switchActiveProject, addToDoToCurrentProject, withActiveProject, defaultProject }
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

const setActiveProject = () => {
    activeProject = projects.length > 0 ? projects[0] : null;
};

const getActiveProjectIndex = () => {
    return projects.indexOf(activeProject);
}

const makeNewProject = (name) => {
    const project = new Project(name);
    projects.push(project);
    return project;
}

const removeProject = (index) => {
    projects.splice(index, 1);
}


const switchActiveProject = (index) => {
   return activeProject = projects[index];
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

    activeProject.addToDo(new Todo("Brush teeth", "Wash thoroughly with a 2-minute timer", "2025-06-23", "High"));
    activeProject.addToDo(new Todo("Take allergy medicine", "1 allergy tablet and 2 sprays in both nostrils", "2025-06-25", "Critical"));
    activeProject.addToDo(new Todo("Visit the store", "Buy milk, bread and eggs", "2025-06-21", "Medium"));
    activeProject.addToDo(new Todo("Visit the library", "Borrow study books", "2025-06-20", "Medium"));
    activeProject.addToDo(new Todo("Dentist", "Book an appointment for a dental check-up", "2025-06-20", "High"));
    activeProject.addToDo(new Todo("Play videogames", "After a long day, relax and play some video games", "2025-06-22", "Low"));
}

defaultProject();

makeNewProject("Workout");
makeNewProject("Restaurant App");




export { makeNewProject, getActiveProject, setActiveProject, getProjects, switchActiveProject, withActiveProject, defaultProject, removeProject, getActiveProjectIndex }
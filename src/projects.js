import { Todo } from "./create-todo";
import { Project } from "./create-project";

const projects = [];

let activeProject;

const updateProjects = (data) => {
    console.log("Updating projects with:", data);
    projects.splice(0, projects.length, ...data);
}

const getProjects = () => projects;

const getActiveProject = () => activeProject;

const setActiveProject = () => {
    activeProject = projects.length > 0 ? projects[0] : null;
};

const getActiveProjectIndex = () => {
    return projects.indexOf(activeProject);
}

const createNewProject = (name) => {
    const project = new Project({name, tasks: []});

    projects.push(project);
    return project;
}

const removeProject = (index) => {
    projects.splice(index, 1);
}

const switchActiveProject = (index) => {
   return activeProject = projects[index];
}

const defaultProject = () => {
    const myProject = createNewProject("Everyday tasks");
    createNewProject("Workout");
    createNewProject("Restaurant App");

    activeProject = myProject;

    activeProject.addToDo(new Todo({ 
        title: "Brush teeth", 
        description: "Wash thoroughly with a 2-minute timer", 
        dueDate: "2025-06-23", 
        remainder: "1", 
        priority: "High"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Take allergy medicine", 
        description: "1 allergy tablet and 2 sprays in both nostrils", 
        dueDate: "2025-06-25", 
        remainder: "1", 
        priority: "Critical"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Visit the store", 
        description: "Buy milk, bread and eggs", 
        dueDate: "2025-06-21", 
        remainder: "3", 
        priority: "Medium"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Visit the library", 
        description: "Borrow study books", 
        dueDate: "2025-06-20", 
        remainder: "3", 
        priority: "Medium"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Dentist", 
        description: "Book an appointment for a dental check-up", 
        dueDate: "2025-06-20", 
        remainder: "2", 
        priority: "High"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Play videogames", 
        description: "After a long day, relax and play some video games", 
        dueDate: "2025-06-22", 
        remainder: "7", 
        priority: "Low"
    }));
}

export { 
    createNewProject, 
    getActiveProject, 
    setActiveProject, 
    getProjects, 
    switchActiveProject, 
    defaultProject, 
    removeProject, 
    getActiveProjectIndex, 
    updateProjects
}
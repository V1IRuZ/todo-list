import { Todo } from "./create-todo";
import { Project } from "./create-project";
import { showCurrentDate } from "./utils";

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
    const myProject = createNewProject("Tutorial");
    activeProject = myProject;

    createNewProject("Project 1");
    createNewProject("Project 2");
    
    const today = showCurrentDate();

    activeProject.addToDo(new Todo({ 
        title: "Create a new project", 
        description: "Create a new project by clicking the button on the left side. After that, give the project a name and submit, or if you want to cancel this click the cross in the upper right corner. Now if you created a new project, it should appear on the left in the project list.", 
        dueDate: today, 
        remainder: "none", 
        priority: "High"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Select a project", 
        description: "Select the project you want to edit by clicking on the project name in the list. This project is now active and you can start adding tasks to it, changing its name, or deleting the project.", 
        dueDate: today, 
        remainder: "none", 
        priority: "Critical"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Add a task", 
        description: 'Create a new task for the selected project by clicking the "add new task" button. Then fill out the task creation form, giving it a title, description, due date, priority, and how often the task should repeat. Submit and the task should now appear in the project.', 
        dueDate: today, 
        remainder: "none", 
        priority: "Medium"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Task completion", 
        description: "There is a checkbox on the task card that you can click to complete the task. A check mark will appear when you complete the task. The task can only be completed on the date given to it.", 
        dueDate: today, 
        remainder: "none", 
        priority: "Medium"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Task priority", 
        description: "The colored ball on the task card represents the importance of the task. Low = green, medium = yellow, high = orange and critical = red.", 
        dueDate: today, 
        remainder: "none", 
        priority: "High"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Other information about the task", 
        description: "In the Extension section, you will see a description of the task and options to edit or delete it.", 
        dueDate: today, 
        remainder: "none", 
        priority: "Low"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Task counter", 
        description: "In the project list, either a number or a check mark appears to the right of the name. The number represents the amount of uncompleted tasks for that day. On the other hand, if all tasks for that day have been completed, a check mark appears there.", 
        dueDate: today, 
        remainder: "none", 
        priority: "Low"
    }));

    activeProject.addToDo(new Todo({ 
        title: "Delete tutorial", 
        description: "When you no longer need this tutorial, delete it by clicking remove project.", 
        dueDate: today, 
        remainder: "none", 
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
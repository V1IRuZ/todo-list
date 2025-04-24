import { renderDOM } from "./render-DOM";
import { renderActiveProjectDOM } from "./main-project-DOM";
import { makeNewProject, setActiveProject, addToDoToCurrentProject, getActiveProject } from "./projects";
import { closeModal } from "./utils";

// Project modal
const addProjectBtn = document.querySelector(".add-project");
const projectModal = document.querySelector("#project-modal");
const projectForm = document.querySelector(".project-form");

// Task Modal

const taskModal = document.querySelector(".task-modal");
const taskForm = document.querySelector(".task-form");
const taskModalCloseBtn = document.querySelector(".close-task");

const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#task-description");
const taskDueDate = document.querySelector("#task-start");
const taskPriority = document.querySelector("#priority");


function getProjectModal() {
    addProjectBtn.addEventListener("click", () => {
        projectModal.showModal();
    })

    projectForm.addEventListener("submit", e => {
        const projectName = document.querySelector("#name").value;

        makeNewProject(projectName);
        setActiveProject();
        renderDOM();
        
        closeModal(e, projectModal, projectForm)
    }) 

    const closeProjectModal = document.querySelector(".close-project");

    closeProjectModal.addEventListener("click", (e) => {
        closeModal(e, projectModal, projectForm)
    });
}


function getTaskModal() {
    const addNewToDoBtn = document.querySelector(".add-task");

    addNewToDoBtn.addEventListener("click", () => {
        taskModal.showModal();
    })

    taskForm.addEventListener("submit", e => {
        addToDoToCurrentProject(taskTitle.value, taskDescription.value, taskDueDate.value, taskPriority.value);
        closeModal(e, taskModal, taskForm);
        renderActiveProjectDOM();
    })

    taskModalCloseBtn.addEventListener("click", e => {
        closeModal(e, taskModal, taskForm);
    })
}


function editTaskModal() {
    
    const activeProjectTasks = getActiveProject().tasks;
    const editTaskBtns = document.querySelectorAll(".edit-btn");

    editTaskBtns.forEach((button, index) => {
        button.addEventListener("click", e => {
            taskTitle.value = `${activeProjectTasks[index].title}`;
            console.log("clicked");

            taskModal.showModal();
        })
    })
}


export { getProjectModal, getTaskModal, editTaskModal }


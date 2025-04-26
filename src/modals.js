import { renderDOM } from "./render-DOM";
import { renderActiveProjectDOM } from "./main-project-DOM";
import { Todo } from "./create-todo";
import { makeNewProject, setActiveProject, getActiveProject } from "./projects";
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


function addTaskModal() {
    const addNewToDoBtn = document.querySelector(".add-task");

    addNewToDoBtn.addEventListener("click", () => {
        taskForm.classList.add("create");
        taskModal.showModal();
    })

    taskForm.addEventListener("submit", e => {
        if (e.target.classList.contains("create")) {
            const toDo = new Todo(taskTitle.value, taskDescription.value, taskDueDate.value, taskPriority.value)
            getActiveProject().addToDo(toDo);
            closeModal(e, taskModal, taskForm);
            renderActiveProjectDOM();
            taskForm.classList.remove("create");
        }
    })

    taskModalCloseBtn.addEventListener("click", e => {
        closeModal(e, taskModal, taskForm);
        taskForm.classList.remove("create");
    })
}


function editTaskModal() {
    
    const tasks = document.querySelector(".view-tasks");

    tasks.addEventListener("click", e => {
        if(e.target.classList.contains("edit-btn")) {
            const activeProjectTasks = getActiveProject().tasks;
            let index = e.target.getAttribute("data-index");

            taskTitle.value = `${activeProjectTasks[index].title}`;
            taskDescription.value = `${activeProjectTasks[index].description}`;
            taskDueDate.value = `${activeProjectTasks[index].dueDate}`;
            taskPriority.value = `${activeProjectTasks[index].priority}`;

            taskForm.classList.add("edit");
            taskForm.setAttribute("data-index", index);

            taskModal.showModal();
        }
    })

    taskForm.addEventListener("submit", e => {
        if (e.target.classList.contains("edit")) {
            let index = e.target.getAttribute("data-index");
            getActiveProject().tasks[index].editToDo(taskTitle.value, taskDescription.value, taskDueDate.value, taskPriority.value);
            closeModal(e, taskModal, taskForm);
            renderActiveProjectDOM();
            taskForm.classList.remove("edit");
            taskForm.removeAttribute("data-index");
        }

        taskModalCloseBtn.addEventListener("click", e => {
            closeModal(e, taskModal, taskForm);
            taskForm.classList.remove("edit");
        })
    })
}


export { getProjectModal, addTaskModal, editTaskModal }


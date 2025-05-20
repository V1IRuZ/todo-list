import { updateMainDOM, updateDOM } from "./DOM";
import { Todo } from "./create-todo";
import { makeNewProject, setActiveProject, getActiveProject, getActiveProjectIndex, removeProject, getProjects } from "./projects";
import { closeModal } from "./utils";
import { saveData } from "./local-storage";

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
const taskRemainder = document.querySelector("#remainder");
const taskPriority = document.querySelector("#priority");

// Remove project modal

const removeModal = document.querySelector(".remove-modal");
const confirmDeleteBtn = document.querySelector(".confirm-delete");
const cancelDeleteBtns = document.querySelectorAll(".cancel-delete");


function getProjectModal() {
    addProjectBtn.addEventListener("click", () => {
        projectModal.showModal();
    })

    projectForm.addEventListener("submit", e => {
        const projectName = document.querySelector("#name").value;

        makeNewProject(projectName);
        setActiveProject();
        updateDOM();
        
        closeModal(e, projectModal, projectForm)
        saveData();
    }) 

    const closeProjectModal = document.querySelector(".close-project");

    closeProjectModal.addEventListener("click", (e) => {
        closeModal(e, projectModal, projectForm)
    });
}


function addTaskModal(button) {
    const addNewToDoBtn = button

    addNewToDoBtn.addEventListener("click", () => {
        taskForm.classList.add("create");
        taskModal.showModal();
    })

    taskForm.addEventListener("submit", e => {
        if (e.target.classList.contains("create")) {

            const toDo = new Todo({
                title: taskTitle.value,
                description: taskDescription.value,
                dueDate: taskDueDate.value,
                remainder: taskRemainder.value,
                priority: taskPriority.value,
                complete: false, 
                dayCompleted: "" 
            });
            
            getActiveProject().addToDo(toDo);
            closeModal(e, taskModal, taskForm);
            updateDOM();
            taskForm.classList.remove("create");
            saveData();
        }
    })

    taskModalCloseBtn.addEventListener("click", e => {
        closeModal(e, taskModal, taskForm);
        taskForm.classList.remove("create");
    })
}


function editTaskModal (button) {
    button.addEventListener("click", () => {
        const activeProjectTasks = getActiveProject().tasks;
        let index = button.getAttribute("data-index");

        taskTitle.value = `${activeProjectTasks[index].title}`;
        taskDescription.value = `${activeProjectTasks[index].description}`;
        taskDueDate.value = `${activeProjectTasks[index].dueDate}`;
        taskRemainder.value = `${activeProjectTasks[index].remainder}`;
        taskPriority.value = `${activeProjectTasks[index].priority}`;

        taskForm.classList.add("edit");
        taskForm.setAttribute("data-index", index);
        taskModal.showModal();
    })

    taskForm.addEventListener("submit", e => {
        if (e.target.classList.contains("edit")) {
            let index = e.target.getAttribute("data-index");
            getActiveProject().tasks[index].editToDo(taskTitle.value, taskDescription.value, taskDueDate.value, taskRemainder.value, taskPriority.value);
            closeModal(e, taskModal, taskForm);
            updateDOM();
            taskForm.classList.remove("edit");
            taskForm.removeAttribute("data-index");
            saveData();
        }
    })

    taskModalCloseBtn.addEventListener("click", e => {
            closeModal(e, taskModal, taskForm);
            taskForm.classList.remove("edit");
    })
}


function deleteProject(removeButton) {

    const removeBtn = removeButton;

    removeBtn.addEventListener("click", ()=> {
        removeModal.showModal();
    })

    confirmDeleteBtn.addEventListener("click", () => {
        let index = getActiveProjectIndex();
        removeProject(index);
        setActiveProject();
        updateDOM();
        saveData();
        removeModal.close(); 
    })

    cancelDeleteBtns.forEach(button => {
        button.addEventListener("click", () => {
            removeModal.close();
        })
    })
}


export { getProjectModal, addTaskModal, editTaskModal, deleteProject }


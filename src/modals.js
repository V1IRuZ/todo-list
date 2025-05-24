import { updateMainDOM, updateDOM } from "./DOM";
import { Todo } from "./create-todo";
import { makeNewProject, setActiveProject, getActiveProject, getActiveProjectIndex, removeProject, getProjects } from "./projects";
import { closeModal } from "./utils";
import { saveData } from "./local-storage";

// Project modal
const addProjectBtn = document.querySelector(".add-project");
const projectModal = document.querySelector("#project-modal");
const projectForm = document.querySelector(".project-form");
const closeProjectModal = document.querySelector(".close-project");

const projectName = document.querySelector("#name");

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
        projectForm.classList.add("create-project");
        projectModal.showModal();
    })

    projectForm.addEventListener("submit", e => {
        if (e.target.classList.contains("create-project")) {

            makeNewProject(projectName.value);
            setActiveProject();
            updateDOM();
            
            projectForm.classList.remove("create-project");
            
            closeModal(e, projectModal, projectForm)
            saveData();
        }
    }) 

    closeProjectModal.addEventListener("click", (e) => {
        closeModal(e, projectModal, projectForm)
        projectForm.classList.remove("create-project");
    });
}

function editProjectModal(button) {
    button.addEventListener("click", () => {
        projectName.value = `${getActiveProject().name}`;
        projectForm.classList.add("edit-project");
        projectModal.showModal();
    })

    projectForm.addEventListener("submit", e => {
        if (e.target.classList.contains("edit-project")) {
            getActiveProject().editName(projectName.value);
            updateDOM();

            projectForm.classList.remove("edit-project");
            closeModal(e, projectModal, projectForm);

            saveData();
        }
    })

    closeProjectModal.addEventListener("click", (e) => {
        closeModal(e, projectModal, projectForm)
        projectForm.classList.remove("edit-project");
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

const removeTaskModal = document.querySelector(".remove-task-modal");
const confirmDeleteTaskBtn = document.querySelector(".confirm-task");
const cancelDeleteTaskBtns = document.querySelectorAll(".cancel-task");

function deleteTask(button) {
    button.addEventListener("click", (e) => {    
        let index = e.target.getAttribute("data-index");

        confirmDeleteTaskBtn.setAttribute("data-index", index); 
        removeTaskModal.showModal();
    });

    confirmDeleteTaskBtn.addEventListener("click", () => {
        let buttonIndex = confirmDeleteTaskBtn.getAttribute("data-index");

        if (buttonIndex !== null) {
            console.log(getActiveProject());
            console.log("Index:", buttonIndex);

            getActiveProject().removeToDo(buttonIndex);
            updateDOM();
            saveData();
        }

        confirmDeleteTaskBtn.removeAttribute("data-index");
        removeTaskModal.close();
    });

    cancelDeleteTaskBtns.forEach(button => {
        button.addEventListener("click", () => {
            confirmDeleteTaskBtn.removeAttribute("data-index");
            removeTaskModal.close();
        });
    });
}



export { getProjectModal, editProjectModal, addTaskModal, editTaskModal, deleteProject, deleteTask }


import { updateDOM } from "./DOM";
import { Todo } from "./create-todo";
import { createNewProject, setActiveProject, getActiveProject, getActiveProjectIndex, removeProject } from "./projects";
import { closeModal } from "./utils";
import { saveData } from "./local-storage";

// Project modal
const addProjectBtn = document.querySelector(".add-project");
const projectModal = document.querySelector("#project-modal");
const projectForm = document.querySelector(".project-form");
const closeProjectModal = document.querySelector(".close-project");
const projectName = document.querySelector("#name");

// Remove project modal
const removeProjectModal = document.querySelector(".remove-modal");
const confirmDeleteProjectBtn = document.querySelector(".confirm-delete");
const cancelDeleteProjectBtns = document.querySelectorAll(".cancel-delete");

// Task Modal
const taskModal = document.querySelector(".task-modal");
const taskForm = document.querySelector(".task-form");
const taskModalCloseBtn = document.querySelector(".close-task");
const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#task-description");
const taskDueDate = document.querySelector("#task-start");
const taskRemainder = document.querySelector("#remainder");
const taskPriority = document.querySelector("#priority");

// Remove task modal
const removeTaskModal = document.querySelector(".remove-task-modal");
const confirmDeleteTaskBtn = document.querySelector(".confirm-task");
const cancelDeleteTaskBtns = document.querySelectorAll(".cancel-task");

function showAddProjectModal() {
    addProjectBtn.addEventListener("click", () => {
        projectForm.classList.add("create-project");
        projectModal.showModal();
    });

    projectForm.addEventListener("submit", e => {
        if (e.target.classList.contains("create-project")) {

            createNewProject(projectName.value);
            setActiveProject();
            updateDOM();
            
            projectForm.classList.remove("create-project");
            
            closeModal(e, projectModal, projectForm)
            saveData();
        }
    }); 

    closeProjectModal.addEventListener("click", (e) => {
        closeModal(e, projectModal, projectForm)
        projectForm.classList.remove("create-project");
    });
};

function showEditProjectModal(button) {
    button.addEventListener("click", () => {
        projectName.value = `${getActiveProject().name}`;
        projectForm.classList.add("edit-project");
        projectModal.showModal();
    });

    projectForm.addEventListener("submit", e => {
        if (e.target.classList.contains("edit-project")) {
            getActiveProject().editName(projectName.value);
            updateDOM();

            projectForm.classList.remove("edit-project");
            closeModal(e, projectModal, projectForm);

            saveData();
        }
    });

    closeProjectModal.addEventListener("click", (e) => {
        closeModal(e, projectModal, projectForm);
        projectForm.classList.remove("edit-project");
    });
};

function showRemoveProjectModal(removeButton) {
    removeButton.addEventListener("click", ()=> {
        removeProjectModal.showModal();
    });

    confirmDeleteProjectBtn.addEventListener("click", () => {
        let index = getActiveProjectIndex();
        removeProject(index);
        setActiveProject();
        updateDOM();
        saveData();
        removeProjectModal.close(); 
    });

    cancelDeleteProjectBtns.forEach(button => {
        button.addEventListener("click", () => {
            removeProjectModal.close();
        });
    });
};

function showAddTaskModal(button) {
    button.addEventListener("click", () => {
        taskForm.classList.add("create");
        taskModal.showModal();
    });

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
    });

    taskModalCloseBtn.addEventListener("click", e => {
        closeModal(e, taskModal, taskForm);
        taskForm.classList.remove("create");
    });
};

function showEditTaskModal (button) {
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
    });

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
    });

    taskModalCloseBtn.addEventListener("click", e => {
            closeModal(e, taskModal, taskForm);
            taskForm.classList.remove("edit");
    });
};

function showRemoveTaskModal(removeButton) {
    removeButton.addEventListener("click", (e) => {    
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
        };

        confirmDeleteTaskBtn.removeAttribute("data-index");
        removeTaskModal.close();
    });

    cancelDeleteTaskBtns.forEach(button => {
        button.addEventListener("click", () => {
            confirmDeleteTaskBtn.removeAttribute("data-index");
            removeTaskModal.close();
        });
    });
};

export { showAddProjectModal, showEditProjectModal, showAddTaskModal, showEditTaskModal, showRemoveProjectModal, showRemoveTaskModal }
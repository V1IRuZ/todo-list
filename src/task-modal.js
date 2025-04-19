import { getActiveProject, addToDoToCurrentProject } from "./projects";
import { closeModal } from "./utils";

const addNewToDoBtn = document.createElement("button");
addNewToDoBtn.classList.add("add-task");
addNewToDoBtn.textContent = "Add new task";

const taskModal = document.createElement("dialog");

const taskForm = document.createElement("form");
taskForm.setAttribute("action", "");
taskForm.setAttribute("method", "dialog");
taskForm.classList.add("task-modal");

const taskFormHeader = document.createElement("h1");
taskFormHeader.textContent = "Add to do task";

const taskFormFieldset = document.createElement("fieldset");

function makeFormFieldsetDivs (labelText, labelFor, inputType) {

    const taskFormDiv = document.createElement("div")
    
    const taskFormLabel = document.createElement("label");
    taskFormLabel.textContent = labelText;
    taskFormLabel.setAttribute("for", labelFor);

    const taskFormInput = document.createElement("input");
    taskFormInput.id = labelFor;
    taskFormInput.setAttribute("type", inputType);

    taskFormDiv.appendChild(taskFormLabel);
    taskFormDiv.appendChild(taskFormInput);

    taskFormFieldset.appendChild(taskFormDiv);
}

makeFormFieldsetDivs("Title", "task-title", "text");
makeFormFieldsetDivs("Description", "task-description", "text");
makeFormFieldsetDivs("Date", "task-start", "date");


const taskModalBtnsDiv = document.createElement("div");

const taskModalSubmitBtn = document.createElement("button");
taskModalSubmitBtn.textContent = "Submit";
taskModalSubmitBtn.setAttribute("type", "submit");
taskModalSubmitBtn.classList.add("submit-task");

const taskModalCloseBtn = document.createElement("button");
taskModalCloseBtn.textContent = "Close";

taskModalBtnsDiv.appendChild(taskModalSubmitBtn);
taskModalBtnsDiv.appendChild(taskModalCloseBtn);

taskForm.appendChild(taskFormHeader);
taskForm.appendChild(taskFormFieldset);
taskForm.appendChild(taskModalBtnsDiv);

taskModal.appendChild(taskForm);

addNewToDoBtn.addEventListener("click", () => {
    taskModal.showModal();
})

taskForm.addEventListener("submit", e => {

    closeModal(e, taskModal, taskForm);
})

taskModalCloseBtn.addEventListener("click", e => {
    closeModal(e, taskModal, taskForm);
})

function addTasksDOM(container) {
    if(!getActiveProject()) {
        return
    }

    container.appendChild(addNewToDoBtn);
    container.appendChild(taskModal);
}

export { addTasksDOM }
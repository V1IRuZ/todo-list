import { renderActiveProjectDOM } from "./main-project-DOM";
import { addToDoToCurrentProject, withActiveProject } from "./projects";
import { closeModal } from "./utils";

const addNewToDoBtn = document.createElement("button");
addNewToDoBtn.classList.add("add-task");
addNewToDoBtn.textContent = "Add new task";

const taskModal = document.createElement("dialog");
taskModal.id = "task-modal"

const taskForm = document.createElement("form");
taskForm.setAttribute("action", "");
taskForm.setAttribute("method", "dialog");
taskForm.classList.add("task-form");

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

const taskFormPriorityDiv = document.createElement("div");

const taskFormPriorityLabel = document.createElement("label");
taskFormPriorityLabel.textContent = "Priority";
taskFormPriorityLabel.setAttribute("for", "priority");

const taskFormPrioritySelect = document.createElement("select");
taskFormPrioritySelect.id = "priority";

function makePriorityOption(name) {
    const priorityOption = document.createElement("option");
    priorityOption.textContent = name
    priorityOption.value = name

    taskFormPrioritySelect.appendChild(priorityOption);
}

makePriorityOption("Low");
makePriorityOption("Medium");
makePriorityOption("High");
makePriorityOption("Critical");

taskFormPriorityDiv.appendChild(taskFormPriorityLabel)
taskFormPriorityDiv.appendChild(taskFormPrioritySelect);
taskFormFieldset.appendChild(taskFormPriorityDiv)



const taskModalBtnsDiv = document.createElement("div");
taskModalBtnsDiv.classList.add("task-btns");

const taskModalSubmitBtn = document.createElement("button");
taskModalSubmitBtn.textContent = "Submit";
taskModalSubmitBtn.setAttribute("type", "submit");
taskModalSubmitBtn.classList.add("submit-task");

const taskModalCloseBtn = document.createElement("button");
taskModalCloseBtn.textContent = "Close";
taskModalCloseBtn.classList.add("close-task");

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
    const taskTitle = document.querySelector("#task-title").value;
    const taskDescription = document.querySelector("#task-description").value;
    const taskDueDate = document.querySelector("#task-start").value;
    const taskPriority = document.querySelector("#priority").value;

    addToDoToCurrentProject(taskTitle, taskDescription, taskDueDate, taskPriority);
    closeModal(e, taskModal, taskForm);
    renderActiveProjectDOM();
})

taskModalCloseBtn.addEventListener("click", e => {
    closeModal(e, taskModal, taskForm);
})

function addTasksDOM(container) {
    withActiveProject(() => {
        container.appendChild(addNewToDoBtn);
        container.appendChild(taskModal);
    })
}

export { addTasksDOM }
import { withActiveProject, getActiveProject } from "./projects";
import { resetDOM, addGlobalEventListener } from "./utils";

const main = document.createElement("main");

const activeProjectDiv = document.createElement("div");

const activeProjectHeaderDiv = document.createElement("div");
activeProjectHeaderDiv.classList.add("active-project");

const activeProjectH1 = document.createElement("h1");
activeProjectH1.textContent = "No project selected";
activeProjectHeaderDiv.appendChild(activeProjectH1)

const addTasksDiv = document.createElement("div");

const addNewToDoBtn = document.createElement("button");
addNewToDoBtn.classList.add("add-task");
addNewToDoBtn.textContent = "Add new task";
addTasksDiv.appendChild(addNewToDoBtn);

const removeProjectBtn = document.createElement("button");
removeProjectBtn.textContent = "Delete";
removeProjectBtn.classList.add("remove-project");
addTasksDiv.appendChild(removeProjectBtn);

activeProjectHeaderDiv.appendChild(addTasksDiv);

function addActiveProjectBtns(container) {
    withActiveProject(() => {
        container.appendChild(addNewToDoBtn);
        container.appendChild(removeProjectBtn);
    })
}

function updateActiveProjectH1() {
    if (!getActiveProject()) {
        resetDOM(addTasksDiv)
        activeProjectH1.textContent = "No projects";
        return
    }
        activeProjectH1.textContent = `${getActiveProject().name}`
}

const showTasksDiv = document.createElement("div");
showTasksDiv.classList.add("view-tasks");

function makeTaskCard() {
    resetDOM(showTasksDiv);

    withActiveProject((activeProject) => {
        const tasks = activeProject.tasks

        tasks.forEach((task, index) => {
            const makeCardContainer = document.createElement("div");
            makeCardContainer.classList.add("card-container");

            const makeTaskCardDiv = document.createElement("div");
            makeTaskCardDiv.classList.add("task-card");

            const makeTaskCardTitle = document.createElement("p");
            makeTaskCardTitle.textContent = `${task.title}`

            const makeTaskCardDueDate = document.createElement("p");
            makeTaskCardDueDate.textContent = `${task.dueDate}`

            const checkBoxDiv = document.createElement("div");
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.setAttribute("type", "checkbox");

            const detailsBtnDiv = document.createElement("div");
            const detailsBtn = document.createElement("button");
            detailsBtn.setAttribute("data-index", index);
            detailsBtn.classList.add("details-btn");
            detailsBtn.textContent = "details";
            detailsBtnDiv.appendChild(detailsBtn)
            
            checkBoxDiv.appendChild(label);
            checkBoxDiv.appendChild(input);

            makeTaskCardDiv.appendChild(makeTaskCardTitle);
            makeTaskCardDiv.appendChild(makeTaskCardDueDate);
            makeTaskCardDiv.appendChild(checkBoxDiv);
            makeTaskCardDiv.appendChild(detailsBtnDiv);

            const detailsDiv = document.createElement("div");
            detailsDiv.classList.add("details");
            detailsDiv.classList.add("hide");

            const detailsDescription = document.createElement("p");
            detailsDescription.textContent = `${task.description}`;
        
            const detailPriority = document.createElement("p");
            detailPriority.textContent = `Priority: ${task.priority}`;
        
            detailsDiv.appendChild(detailsDescription);
            detailsDiv.appendChild(detailPriority);
            
            const buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("edit-tasks")
            buttonsDiv.classList.add("hide");

            const removeTaskBtn = document.createElement("button");
            removeTaskBtn.classList.add("remove-task");
            removeTaskBtn.textContent = "delete";
            removeTaskBtn.setAttribute("data-index", index);

            const ediTaskBtn = document.createElement("button");
            ediTaskBtn.classList.add("edit-btn");
            ediTaskBtn.textContent = "edit";
            ediTaskBtn.setAttribute("data-index", index);

            buttonsDiv.appendChild(removeTaskBtn);
            buttonsDiv.appendChild(ediTaskBtn);
            
            makeCardContainer.appendChild(makeTaskCardDiv);
            makeCardContainer.appendChild(detailsDiv);
            makeCardContainer.appendChild(buttonsDiv);

            showTasksDiv.appendChild(makeCardContainer);
        })
    })
}

function showHideDetails(element) {
    element.classList.toggle("hide");
}

function changeButtonText(event) {
    event.target.textContent = event.target.textContent === "details" ? "hide" : "details";
}

addGlobalEventListener("click", ".details-btn", e => {
    let parentContainer = e.target.closest(".card-container");
    let details = parentContainer.querySelector(".details");
    let buttons = parentContainer.querySelector(".edit-tasks");

    showHideDetails(details);
    showHideDetails(buttons);
    changeButtonText(e);
})

const renderActiveProjectDOM = () => {
    updateActiveProjectH1();
    addActiveProjectBtns(addTasksDiv);
    activeProjectDiv.appendChild(activeProjectHeaderDiv);

    makeTaskCard();
    activeProjectDiv.appendChild(showTasksDiv);
    
    main.appendChild(activeProjectDiv)

    return main;
}

export {renderActiveProjectDOM}
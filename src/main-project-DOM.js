import { withActiveProject, getActiveProject } from "./projects";
import { addTasksDOM } from "./task-modal";
import { resetDOM, addGlobalEventListener } from "./utils";

const main = document.createElement("main");

const activeProjectDiv = document.createElement("div");

const activeProjectHeaderDiv = document.createElement("div");
activeProjectHeaderDiv.classList.add("active-project");

const activeProjectH1 = document.createElement("h1");
activeProjectH1.textContent = "No project selected";
activeProjectHeaderDiv.appendChild(activeProjectH1)

const addTasksDiv = document.createElement("div");
const removeProjectBtn = document.createElement("button");
removeProjectBtn.textContent = "Delete";
removeProjectBtn.classList.add("remove-project");
addTasksDiv.appendChild(removeProjectBtn);

activeProjectHeaderDiv.appendChild(addTasksDiv);

function addProjectDeleteBtn(container) {
    withActiveProject(() => {
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
    

            makeCardContainer.appendChild(makeTaskCardDiv);
            makeCardContainer.appendChild(detailsDiv);

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

    showHideDetails(details);
    changeButtonText(e);
})

const renderActiveProjectDOM = () => {
    updateActiveProjectH1();
    addProjectDeleteBtn(addTasksDiv);
    addTasksDOM(addTasksDiv);
    activeProjectDiv.appendChild(activeProjectHeaderDiv);

    makeTaskCard();
    activeProjectDiv.appendChild(showTasksDiv);
    
    main.appendChild(activeProjectDiv)

    return main;
}

export {renderActiveProjectDOM}
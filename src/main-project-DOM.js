import { withActiveProject } from "./projects";
import { resetDOM, updateActiveProjectHeader, addActiveProjectBtns } from "./utils";

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


const renderActiveProjectDOM = () => {
    updateActiveProjectHeader(addTasksDiv, activeProjectH1);
    addActiveProjectBtns(addTasksDiv, addNewToDoBtn, removeProjectBtn);
    activeProjectDiv.appendChild(activeProjectHeaderDiv);

    makeTaskCard();
    activeProjectDiv.appendChild(showTasksDiv);
    
    main.appendChild(activeProjectDiv)

    return main;
}

export {renderActiveProjectDOM}
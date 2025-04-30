import { withActiveProject } from "./projects";
import { resetDOM, updateActiveProjectHeader, addActiveProjectBtns, isDueDate, updateCheckMark } from "./utils";

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


const todayContainer = document.createElement("div");
todayContainer.classList.add("today-container");

const todayH1 = document.createElement("h1");
todayH1.textContent = "Today tasks";
todayContainer.appendChild(todayH1);

const todayCardsList = document.createElement("div");
todayCardsList.classList.add("today");
todayContainer.appendChild(todayCardsList)

const upcomingContainer = document.createElement("div");
upcomingContainer.classList.add("upcoming-container");

const upcomingH1 = document.createElement("h1");
upcomingH1.textContent = "Upcoming tasks"
upcomingContainer.appendChild(upcomingH1)

const upcomingCardsList = document.createElement("div");
upcomingCardsList.classList.add("upcoming");
upcomingContainer.appendChild(upcomingCardsList);

function addCardstoContainer() {
    withActiveProject((activeProject) => {
        const isTodayTasks = activeProject.tasks.some(task => isDueDate(task))

        todayContainer.remove();
        upcomingContainer.remove();

        if (activeProject.tasks.length === 0) {
            return;
        }

        showTasksDiv.appendChild(upcomingContainer);

        if (isTodayTasks) {
            showTasksDiv.prepend(todayContainer);
            console.log(activeProject.tasks);
        } 
    })
}


function makeTaskCard() {
    resetDOM(todayCardsList);
    resetDOM(upcomingCardsList);

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
            label.setAttribute("for", `completion${index}`);

            const checkbox = document.createElement("input");
            checkbox.id = `completion${index}`
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("data-index", index);

            const detailsBtnDiv = document.createElement("div");
            const detailsBtn = document.createElement("button");
            detailsBtn.setAttribute("data-index", index);
            detailsBtn.classList.add("details-btn");
            detailsBtn.textContent = "details";
            detailsBtnDiv.appendChild(detailsBtn)
            
            checkBoxDiv.appendChild(label);
            checkBoxDiv.appendChild(checkbox);

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

            updateCheckMark(task, checkbox);


            if (isDueDate(task)) {
                todayCardsList.appendChild(makeCardContainer);
            } else {
                upcomingCardsList.appendChild(makeCardContainer);
            }

        })
    })
}


const renderActiveProjectDOM = () => {
    updateActiveProjectHeader(addTasksDiv, activeProjectH1);
    addActiveProjectBtns(addTasksDiv, addNewToDoBtn, removeProjectBtn);
    activeProjectDiv.appendChild(activeProjectHeaderDiv);

    makeTaskCard();
    addCardstoContainer();
    activeProjectDiv.appendChild(showTasksDiv);
    
    main.appendChild(activeProjectDiv)

    return main;
}

export {renderActiveProjectDOM}
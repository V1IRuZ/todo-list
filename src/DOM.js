import { withActiveProject, getProjects, getActiveProject } from "./projects";
import { resetDOM, updateActiveProjectHeader, addActiveProjectBtns, isDueDate, taskIsDoneWithNoRepeat, updateStateOfCompleteBtn, enableDisableCheckBtn, setPriorityColor } from "./utils";
import { format } from "date-fns";
import starImage from "./icons/star.svg";
import arrowDownImg from "./icons/arrow-down-drop-circle-outline.svg";

// aside
const aside = document.querySelector("aside");

const myProjects = document.createElement("div");
myProjects.classList.add("my-projects");
aside.appendChild(myProjects);

const makeProjectCard = (project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    const projectCardBtn = document.createElement("button");
    projectCardBtn.classList.add("project-btn");
    projectCardBtn.textContent = `${project.name}`;
    projectCardBtn.setAttribute("data-index", index);

    const image = document.createElement("img");
    image.src = starImage;
    image.alt = "Star";
    image.style.width = "2em";
    projectCardBtn.prepend(image);

    projectCard.appendChild(projectCardBtn);
    return projectCard;
}

const updateProjectCards = () => {
    resetDOM(myProjects)
    const projects = getProjects();

    projects.forEach((project, index) => {
        const card = makeProjectCard(project, index);
        myProjects.appendChild(card);
    })
}

const updateAsideDOM = () => {
    updateProjectCards();
    return aside;
} 

// main
// Active project header
const main = document.querySelector("main");

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
main.appendChild(activeProjectHeaderDiv);

function updateSelectedProject() {
    updateActiveProjectHeader(addTasksDiv, activeProjectH1);
    addActiveProjectBtns(addTasksDiv, addNewToDoBtn, removeProjectBtn);
}

// Task Cards
const activeProjectTasks = document.createElement("div");
activeProjectTasks.classList.add("view-tasks");
main.appendChild(activeProjectTasks)

const makeContainerToTasksFactory = (className, headerText) => {
    const container = document.createElement("div");
    container.classList.add(className);

    const containerH1 = document.createElement("h1");
    containerH1.textContent = headerText;
    container.appendChild(containerH1);

    const cardsContainer = document.createElement("div");
    container.appendChild(cardsContainer);

    return {
        container,
        cardsContainer
    }
}

const today = makeContainerToTasksFactory("today-container", "Today's tasks");
const upcoming = makeContainerToTasksFactory("upcoming-container", "Upcoming tasks");
const completed = makeContainerToTasksFactory("tasks-done", "One-time tasks")

function displayContainer() {
    withActiveProject((activeProject) => {
        const isTodayTasks = activeProject.tasks.some(task => isDueDate(task) && !taskIsDoneWithNoRepeat(task))
        const isUpcomingTasks = activeProject.tasks.some(task => !isDueDate(task))
        const isCompletedTasks = activeProject.tasks.some(task => taskIsDoneWithNoRepeat(task))

        today.container.remove();
        upcoming.container.remove();
        completed.container.remove();

        if (activeProject.tasks.length === 0) {
            return;
        }

        if (isCompletedTasks) {
            activeProjectTasks.appendChild(completed.container);
        }

        if (isTodayTasks) {
            activeProjectTasks.prepend(today.container);
        } 

        if (isUpcomingTasks) {
            activeProjectTasks.appendChild(upcoming.container);
        }
    })
}

const makeMainTaskCard = (task, index) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("card-container");
    
    const mainTaskInfo = document.createElement("div");
    mainTaskInfo.classList.add("task-card");
    
    const taskCardTitle = document.createElement("p");
    taskCardTitle.textContent = `${task.title}`;
    mainTaskInfo.appendChild(taskCardTitle);
    
    const taskCardDueDate = document.createElement("p");
    const date = format(task.dueDate, "MMMM d");
    taskCardDueDate.classList.add("date-text");
    taskCardDueDate.textContent = `${date}`;
    mainTaskInfo.appendChild(taskCardDueDate);
    
    const checkButtonDiv = document.createElement("div");
    checkButtonDiv.classList.add("complete-div");

    const checkButton = document.createElement("button");
    checkButton.classList.add("complete-btn");
    checkButton.setAttribute("data-index", index);
    checkButton.style.color = "white";

    task.setToDoUncompleted();
    updateStateOfCompleteBtn(task, checkButton);
    enableDisableCheckBtn(task, checkButton);
    checkButtonDiv.appendChild(checkButton);

    mainTaskInfo.prepend(checkButtonDiv)
    
    const detailsBtnDiv = document.createElement("div");

    const detailsBtn = document.createElement("button");
    detailsBtn.setAttribute("data-index", index);
    detailsBtn.classList.add("details-btn");
    detailsBtn.innerHTML = "&#10133";

    // const arrowDown = document.createElement("img");
    // arrowDown.src = arrowDownImg;
    // arrowDown.alt = "Open";
    // arrowDown.style.width = "2em";

    // detailsBtn.appendChild(arrowDown);

    detailsBtnDiv.appendChild(detailsBtn)

    mainTaskInfo.appendChild(detailsBtnDiv)

    const priorityDiv = document.createElement("div");
    priorityDiv.classList.add("priority-div");
    
    const priorityBall = document.createElement("div");
    priorityBall.classList.add("priority-ball");
    setPriorityColor(task, priorityBall);

    priorityDiv.appendChild(priorityBall);

    mainTaskInfo.appendChild(priorityDiv);

    taskCard.appendChild(mainTaskInfo);

    return taskCard;
}


const makeCardExtension = (task, index) => {
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");
    detailsDiv.classList.add("hide");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("task-info");

    const taskDescription = document.createElement("p");
    taskDescription.textContent = `${task.description}`;
    infoDiv.appendChild(taskDescription);

    detailsDiv.appendChild(infoDiv);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("edit-tasks")

    const removeTaskBtn = document.createElement("button");
    removeTaskBtn.classList.add("remove-task");
    removeTaskBtn.textContent = "delete";
    removeTaskBtn.setAttribute("data-index", index);
    buttonsDiv.appendChild(removeTaskBtn);

    const ediTaskBtn = document.createElement("button");
    ediTaskBtn.classList.add("edit-btn");
    ediTaskBtn.textContent = "edit";
    ediTaskBtn.setAttribute("data-index", index);
    buttonsDiv.appendChild(ediTaskBtn);

    detailsDiv.appendChild(buttonsDiv);
    return detailsDiv;
}


function updateTaskCardsToContainers() {
    resetDOM(today.cardsContainer);
    resetDOM(upcoming.cardsContainer);
    resetDOM(completed.cardsContainer);

    const tasks = getActiveProject().tasks;

    tasks.forEach((task, index) => {
        const card = makeMainTaskCard(task, index);
        const cardExtendion = makeCardExtension(task, index);
        
        card.appendChild(cardExtendion);

        if (taskIsDoneWithNoRepeat(task)) {
            completed.cardsContainer.appendChild(card);
        } else if (isDueDate(task)) {
            today.cardsContainer.appendChild(card);
        } else {
            upcoming.cardsContainer.appendChild(card);
        }
    })
}

function updateTaskLists() {
    withActiveProject(() => {
        updateTaskCardsToContainers();
        displayContainer();        
    })
}


const updateMainDOM = () => {
    updateSelectedProject()
    updateTaskLists();
    return main;
}

const updateDOM = () => {
    updateAsideDOM();
    updateMainDOM();
}

export {updateMainDOM, updateDOM}
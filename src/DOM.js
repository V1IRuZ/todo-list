import { withActiveProject, getProjects, getActiveProject } from "./projects";
import { resetDOM, updateActiveProjectHeader, addActiveProjectBtns, isDueDate, taskIsDoneWithNoRepeat, updateStateOfCompleteBtn, enableDisableCheckBtn, setPriorityColor, getCounterTextContent, createIcon } from "./utils";
import { editProjectModal, addTaskModal, editTaskModal, deleteProject, deleteTask } from "./modals";
import { format } from "date-fns";
import starImage from "./icons/star.svg";
import arrowDownImg from "./icons/arrow-down-drop-circle-outline.svg";
import plusImg from "./icons/plus-box-multiple.svg";
import trashCanImg from "./icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import editImg from "./icons/edit.svg";
import calendarImg from "./icons/calendar-month.svg";

// aside
const aside = document.querySelector("aside");

const myProjects = document.createElement("div");
myProjects.classList.add("my-projects");
aside.appendChild(myProjects);

const createProjectCard = (project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    const projectCardBtn = document.createElement("button");
    projectCardBtn.classList.add("project-btn");
    projectCardBtn.textContent = `${project.name}`;
    projectCardBtn.setAttribute("data-index", index);

    const starIcon = createIcon(starImage, "Star", "", "2em");
    projectCardBtn.prepend(starIcon);

    projectCard.appendChild(projectCardBtn);

    const taskCounterDiv = document.createElement("div");
    taskCounterDiv.classList.add("task-counters");

    const taskCounter = document.createElement("p");
    taskCounter.classList.add("counter");
    getCounterTextContent(project, taskCounter);

    taskCounterDiv.appendChild(taskCounter);

    projectCard.appendChild(taskCounterDiv);

    return projectCard;
}

const updateProjectCards = () => {
    resetDOM(myProjects)
    const projects = getProjects();

    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
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
activeProjectH1.classList.add("project-header");
activeProjectH1.textContent = "No project selected";
activeProjectHeaderDiv.appendChild(activeProjectH1)

const addTasksDiv = document.createElement("div");
addTasksDiv.classList.add("project-options");

const editProjectNameBtn = document.createElement("button");
editProjectNameBtn.classList.add("edit-btn");
editProjectNameBtn.textContent = "Edit name";

const editIcon = createIcon(editImg, "Edit project name", "", "2em");
editProjectNameBtn.prepend(editIcon);

editProjectModal(editProjectNameBtn);
addTasksDiv.appendChild(editProjectNameBtn);

const addNewToDoBtn = document.createElement("button");
addNewToDoBtn.classList.add("add-task");
addNewToDoBtn.textContent = "Add new task";

const plusBoxIcon = createIcon(plusImg, "Add new task", "add-icon", "2em");
addNewToDoBtn.prepend(plusBoxIcon);

addTaskModal(addNewToDoBtn);
addTasksDiv.appendChild(addNewToDoBtn);

const removeProjectBtn = document.createElement("button");
removeProjectBtn.textContent = "Remove project";
removeProjectBtn.classList.add("remove-project");

const trashCanIcon = createIcon(trashCanImg, "Remove project", "remove-icon", "2em");

removeProjectBtn.prepend(trashCanIcon);
deleteProject(removeProjectBtn);
addTasksDiv.appendChild(removeProjectBtn);

activeProjectHeaderDiv.appendChild(addTasksDiv);
main.appendChild(activeProjectHeaderDiv);

function updateSelectedProject() {
    updateActiveProjectHeader(addTasksDiv, activeProjectH1);
    addActiveProjectBtns(addTasksDiv, editProjectNameBtn, addNewToDoBtn, removeProjectBtn);
}

// Task Cards
const activeProjectTasks = document.createElement("div");
activeProjectTasks.classList.add("view-tasks");
main.appendChild(activeProjectTasks)

const createContainerToTasks = (className, headerText) => {
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

const today = createContainerToTasks("today-container", "Today's tasks");
const upcoming = createContainerToTasks("upcoming-container", "Upcoming tasks");
const completed = createContainerToTasks("tasks-done", "One-time tasks")

function displayContainer() {
    today.container.remove();
    upcoming.container.remove();
    completed.container.remove();
   
    withActiveProject((activeProject) => {
        const isTodayTasks = activeProject.tasks.some(task => isDueDate(task) && !taskIsDoneWithNoRepeat(task))
        const isUpcomingTasks = activeProject.tasks.some(task => !isDueDate(task))
        const isCompletedTasks = activeProject.tasks.some(task => taskIsDoneWithNoRepeat(task))

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

const createTaskCard = (task, index) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("card-container");
    
    const mainTaskInfo = document.createElement("div");
    mainTaskInfo.classList.add("task-card");
    
    const taskCardTitle = document.createElement("p");
    taskCardTitle.textContent = `${task.title}`;
    mainTaskInfo.appendChild(taskCardTitle);
    
    const taskCardDueDateDiv = document.createElement("div");
    taskCardDueDateDiv.classList.add("task-date")
    
    const calendarIcon = createIcon(calendarImg, "Task due date");
    taskCardDueDateDiv.prepend(calendarIcon);

    const taskCardDueDatePara = document.createElement("p");
    const date = format(task.dueDate, "MMMM d");
    taskCardDueDatePara.classList.add("date-text");
    taskCardDueDatePara.textContent = `${date}`;

    taskCardDueDateDiv.appendChild(taskCardDueDatePara);
    mainTaskInfo.appendChild(taskCardDueDateDiv)
    
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

    const priorityDiv = document.createElement("div");
    priorityDiv.classList.add("priority-div");
    
    const priorityBall = document.createElement("div");
    priorityBall.classList.add("priority-ball");
    setPriorityColor(task, priorityBall);

    priorityDiv.appendChild(priorityBall);

    mainTaskInfo.appendChild(priorityDiv);

    const detailsBtnDiv = document.createElement("div");

    const arrowIcon = createIcon(arrowDownImg, "Toggle details", "details-btn", "1.75em");
    detailsBtnDiv.appendChild(arrowIcon)

    mainTaskInfo.appendChild(detailsBtnDiv)

    taskCard.appendChild(mainTaskInfo);

    return taskCard;
}


const createTaskCardExtension = (task, index) => {
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

    const ediTaskBtn = document.createElement("button");
    ediTaskBtn.classList.add("edit-btn");
    ediTaskBtn.textContent = "Edit task";
    ediTaskBtn.setAttribute("data-index", index);

    const editIcon = createIcon(editImg, "Edit task", "", "2em");
    ediTaskBtn.prepend(editIcon);

    editTaskModal(ediTaskBtn);

    buttonsDiv.appendChild(ediTaskBtn);

    const removeTaskBtn = document.createElement("button");
    removeTaskBtn.classList.add("remove-task");
    removeTaskBtn.textContent = "Remove Task";
    removeTaskBtn.setAttribute("data-index", index);

    const trashCanIcon = createIcon(trashCanImg, "Remove task", "remove-icon", "2em");
    removeTaskBtn.prepend(trashCanIcon);

    deleteTask(removeTaskBtn);

    buttonsDiv.appendChild(removeTaskBtn);

    // here


    detailsDiv.appendChild(buttonsDiv);
    return detailsDiv;
}


function updateTaskCardsToContainers() {
    resetDOM(today.cardsContainer);
    resetDOM(upcoming.cardsContainer);
    resetDOM(completed.cardsContainer);

    const tasks = getActiveProject().tasks;

    tasks.forEach((task, index) => {
        const card = createTaskCard(task, index);
        const cardExtendion = createTaskCardExtension(task, index);
        
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
    if (!getActiveProject()) {
        resetDOM(activeProjectTasks);
        return
    }

    updateTaskCardsToContainers();
    displayContainer();        
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
import { withActiveProject, getProjects, getActiveProject } from "./projects";
import { resetDOM, isDueDate, taskIsDoneWithNoRepeat, updateStateOfCompleteBtn, enableDisableCheckBtn, setPriorityColor, getCounterTextContent, createButton, createIcon } from "./utils";
import { editProjectModal, addTaskModal, editTaskModal, deleteProject, deleteTask } from "./modals";
import { format } from "date-fns";
import starImage from "./icons/star.svg";
import arrowDownImg from "./icons/arrow-down-drop-circle-outline.svg";
import plusImg from "./icons/plus-box-multiple.svg";
import trashCanImg from "./icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import editImg from "./icons/edit.svg";
import calendarImg from "./icons/calendar-month.svg";

// Aside DOM
const aside = document.querySelector("aside");

// Main container for project cards
const projectsContainer = document.createElement("div");
projectsContainer.classList.add("my-projects");
aside.appendChild(projectsContainer);

const createProjectCard = (project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    const projectBtn = createButton("project-btn", `${project.name}`, index);
    const starIcon = createIcon(starImage, "Star", "", "2em");
    projectBtn.prepend(starIcon);
    projectCard.appendChild(projectBtn);

    const taskCounterWrapper = document.createElement("div");
    taskCounterWrapper.classList.add("task-counters");

    const taskCounter = document.createElement("p");
    taskCounter.classList.add("counter");
    getCounterTextContent(project, taskCounter);
    taskCounterWrapper.appendChild(taskCounter);

    projectCard.appendChild(taskCounterWrapper);

    return projectCard;
}

const updateProjectCards = () => {
    resetDOM(projectsContainer)
    const projects = getProjects();

    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        projectsContainer.appendChild(card);
    })
}


// Main DOM
const main = document.querySelector("main");

// Active project
const activeProjectContainer = document.createElement("div");
activeProjectContainer.classList.add("active-project");
main.appendChild(activeProjectContainer);

const activeProject = document.createElement("h1");
activeProject.classList.add("project-header");
activeProject.textContent = "No project selected";
activeProjectContainer.appendChild(activeProject)

const activeProjectBtnsWrapper = document.createElement("div");
activeProjectBtnsWrapper.classList.add("project-options");

const editProjectNameBtn = createButton("edit-btn", "Edit name");
const editIcon = createIcon(editImg, "Edit project name", "", "2em");
editProjectNameBtn.prepend(editIcon);
editProjectModal(editProjectNameBtn);
activeProjectBtnsWrapper.appendChild(editProjectNameBtn);

const addNewToDoBtn = createButton("add-task", "Add new task")
const plusBoxIcon = createIcon(plusImg, "Add new task", "add-icon", "2em");
addNewToDoBtn.prepend(plusBoxIcon);
addTaskModal(addNewToDoBtn);
activeProjectBtnsWrapper.appendChild(addNewToDoBtn);

const removeProjectBtn = createButton("remove-project", "Remove project");
const trashCanIcon = createIcon(trashCanImg, "Remove project", "remove-icon", "2em");
removeProjectBtn.prepend(trashCanIcon);
deleteProject(removeProjectBtn);
activeProjectBtnsWrapper.appendChild(removeProjectBtn);

activeProjectContainer.appendChild(activeProjectBtnsWrapper);

const updateActiveProjectContainer = (...buttons) => {
    if (!getActiveProject()) {
        resetDOM(activeProjectBtnsWrapper)
        activeProject.textContent = "No projects";
        return
    }
    
    activeProject.textContent = `${getActiveProject().name}`;
    buttons.forEach(button => {
        activeProjectBtnsWrapper.appendChild(button);    
    })
}

// Task Cards
const tasksContainer = document.createElement("div");
tasksContainer.classList.add("view-tasks");
main.appendChild(tasksContainer)

const createContainerToTaskCards = (className, headerText) => {
    const container = document.createElement("div");
    container.classList.add(className);

    const containerTitle = document.createElement("h1");
    containerTitle.textContent = headerText;
    container.appendChild(containerTitle);

    const cardsWrapper = document.createElement("div");
    container.appendChild(cardsWrapper);

    return {
        container,
        cardsWrapper
    }
}

const todayTasks = createContainerToTaskCards("today-container", "Today's tasks");
const upcomingTasks = createContainerToTaskCards("upcoming-container", "Upcoming tasks");
const OneTimeTasks = createContainerToTaskCards("tasks-done", "One-time tasks")

function displayContainer() {
    const activeProject = getActiveProject();

    // Make sure there is tasks in active project
     if (activeProject.tasks.length === 0) {
        return;
    }

    // If there is even one task in the container, append it to DOM
    const isTodayTasks = activeProject.tasks.some(task => isDueDate(task) && !taskIsDoneWithNoRepeat(task))
    const isUpcomingTasks = activeProject.tasks.some(task => !isDueDate(task))
    const isOneTimeTasks = activeProject.tasks.some(task => taskIsDoneWithNoRepeat(task))

    // Remove old containers before adding them back
    todayTasks.container.remove();
    upcomingTasks.container.remove();
    OneTimeTasks.container.remove();

    if (isOneTimeTasks) {
        tasksContainer.appendChild(OneTimeTasks.container);
    }

    if (isTodayTasks) {
        tasksContainer.prepend(todayTasks.container);
    } 

    if (isUpcomingTasks) {
        tasksContainer.appendChild(upcomingTasks.container);
    }
    
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
    resetDOM(todayTasks.cardsWrapper);
    resetDOM(upcomingTasks.cardsWrapper);
    resetDOM(OneTimeTasks.cardsWrapper);

    const tasks = getActiveProject().tasks;

    tasks.forEach((task, index) => {
        const card = createTaskCard(task, index);
        const cardExtendion = createTaskCardExtension(task, index);
        
        card.appendChild(cardExtendion);

        if (taskIsDoneWithNoRepeat(task)) {
            OneTimeTasks.cardsWrapper.appendChild(card);
        } else if (isDueDate(task)) {
            todayTasks.cardsWrapper.appendChild(card);
        } else {
            upcomingTasks.cardsWrapper.appendChild(card);
        }
    })
}

function updateTaskLists() {
    if (!getActiveProject()) {
        resetDOM(tasksContainer);
        return
    }

    updateTaskCardsToContainers();
    displayContainer();        
}


const updateMainDOM = () => {
    updateActiveProjectContainer(editProjectNameBtn, addNewToDoBtn, removeProjectBtn)
    updateTaskLists();
    return main;
}

const updateDOM = () => {
    updateProjectCards();
    updateMainDOM();
}

export {updateMainDOM, updateDOM}
import { getProjects, getActiveProject } from "./projects";
import { resetDOM, isDueDate, oneTimeTasksAreCompleted, updateStateOfCompleteBtn, enableDisableCheckBtn, setPriorityColor, getCounterTextContent, createButton, createIcon } from "./utils";
import { showEditProjectModal, showAddTaskModal, showEditTaskModal, showRemoveProjectModal, showRemoveTaskModal } from "./modals";
import { format } from "date-fns";
import starImage from "./icons/star.svg";
import arrowDownImg from "./icons/arrow-down-drop-circle-outline.svg";
import plusImg from "./icons/plus-box-multiple.svg";
import trashCanImg from "./icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import editImg from "./icons/edit.svg";
import calendarImg from "./icons/calendar-month.svg";
import calendarClockImg from "./icons/calendar-clock-svgrepo-com.svg";
import checkSignImg from "./icons/sign-check-svgrepo-com.svg";
import starAltImg from "./icons/star-alt-svgrepo-com.svg";

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
};

const updateProjectCards = () => {
    resetDOM(projectsContainer);
    const projects = getProjects();

    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        projectsContainer.appendChild(card);
    });
};

// Main DOM
const main = document.querySelector("main");

// ACTIVE PROJECT
const activeProjectContainer = document.createElement("div");
activeProjectContainer.classList.add("active-project");
main.appendChild(activeProjectContainer);

// title
const activeProject = document.createElement("h1");
activeProject.classList.add("project-header");
activeProject.textContent = "No project selected";
activeProjectContainer.appendChild(activeProject);

// buttons
const activeProjectBtnsWrapper = document.createElement("div");
activeProjectBtnsWrapper.classList.add("project-options");

const editProjectNameBtn = createButton("edit-btn", "Edit name");
const editIcon = createIcon(editImg, "Edit project name", "", "2em");
editProjectNameBtn.prepend(editIcon);
showEditProjectModal(editProjectNameBtn);
activeProjectBtnsWrapper.appendChild(editProjectNameBtn);

const addNewToDoBtn = createButton("add-task", "Add new task");
const plusBoxIcon = createIcon(plusImg, "Add new task", "add-icon", "2em");
addNewToDoBtn.prepend(plusBoxIcon);
showAddTaskModal(addNewToDoBtn);
activeProjectBtnsWrapper.appendChild(addNewToDoBtn);

const removeProjectBtn = createButton("remove-project", "Remove project");
const trashCanIcon = createIcon(trashCanImg, "Remove project", "remove-icon", "2em");
removeProjectBtn.prepend(trashCanIcon);
showRemoveProjectModal(removeProjectBtn);
activeProjectBtnsWrapper.appendChild(removeProjectBtn);

activeProjectContainer.appendChild(activeProjectBtnsWrapper);

const updateActiveProjectContainer = (...buttons) => {
    if (!getActiveProject()) {
        resetDOM(activeProjectBtnsWrapper)
        activeProject.textContent = "No projects";
        return
    }
    
    activeProject.textContent = `${getActiveProject().name}`;
    buttons.forEach(button => activeProjectBtnsWrapper.appendChild(button));
};

// TASK CARDS
// Main wrapper container
const tasksContainer = document.createElement("div");
tasksContainer.classList.add("tasks-container");
main.appendChild(tasksContainer);

const createContainerToTaskCards = (className, headerText, icon) => {
    const container = document.createElement("div");
    container.classList.add(className);

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("container-title");
    container.appendChild(titleWrapper);

    const containerIcon = createIcon(icon, headerText, "", "3em");
    titleWrapper.appendChild(containerIcon);

    const containerTitle = document.createElement("h1");
    containerTitle.textContent = headerText;
    titleWrapper.appendChild(containerTitle);

    const cardsWrapper = document.createElement("div");
    container.appendChild(cardsWrapper);

    return {
        container,
        cardsWrapper
    }
};

// Containers for each task, based on their status
const todayTasks = createContainerToTaskCards("today-container", "Today's tasks", starAltImg);
const upcomingTasks = createContainerToTaskCards("upcoming-container", "Upcoming tasks", calendarClockImg);
const OneTimeTasks = createContainerToTaskCards("tasks-done", "Completed tasks (no repetition)", checkSignImg);

function updateContentToContainers() {
    const activeProject = getActiveProject();

    // Remove old containers before adding them back
    todayTasks.container.remove();
    upcomingTasks.container.remove();
    OneTimeTasks.container.remove();

    // Make sure there is tasks in active project
    if (activeProject.tasks.length === 0) {
        return;
    }
    
    // If there is even one task in the container, append it to DOM
    const isTodayTasks = activeProject.tasks.some(task => isDueDate(task) && !oneTimeTasksAreCompleted(task));
    const isUpcomingTasks = activeProject.tasks.some(task => !isDueDate(task));
    const isOneTimeTasks = activeProject.tasks.some(task => oneTimeTasksAreCompleted(task));

    if (isOneTimeTasks) {
        tasksContainer.appendChild(OneTimeTasks.container);
    }

    if (isTodayTasks) {
        tasksContainer.prepend(todayTasks.container);
    }

    if (isUpcomingTasks) {
        tasksContainer.appendChild(upcomingTasks.container);
    }
    
};

const createTaskCard = (task, index) => {
    // Card container
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    
    // Allways visible container of card
    const mainTaskCardWrapper = document.createElement("div");
    mainTaskCardWrapper.classList.add("task-card");
    cardContainer.appendChild(mainTaskCardWrapper);

    // Check button for completeing task
    const checkButtonWrapper = document.createElement("div");
    checkButtonWrapper.classList.add("completion-box");

    const checkButton = createButton("complete-btn", "", index);
    updateStateOfCompleteBtn(task, checkButton);
    enableDisableCheckBtn(task, checkButton);
    checkButtonWrapper.appendChild(checkButton);

    mainTaskCardWrapper.prepend(checkButtonWrapper);
    
    // Task title
    const title = document.createElement("p");
    title.textContent = `${task.title}`;
    mainTaskCardWrapper.appendChild(title);
    
    // Task due date
    const dueDateWrapper = document.createElement("div");
    dueDateWrapper.classList.add("task-date");
    mainTaskCardWrapper.appendChild(dueDateWrapper);

    const calendarIcon = createIcon(calendarImg, "Task due date");
    dueDateWrapper.prepend(calendarIcon);

    const dueDate = document.createElement("p");
    dueDate.classList.add("date-text");
    const formattedDate = format(task.dueDate, "MMMM d");
    dueDate.textContent = `${formattedDate}`;
    dueDateWrapper.appendChild(dueDate);
    
    // Task priority
    const priorityWrapper = document.createElement("div");
    priorityWrapper.classList.add("priority-div");
    
    const priority = document.createElement("div");
    priority.classList.add("priority-ball");
    setPriorityColor(task, priority);
    priorityWrapper.appendChild(priority);
    mainTaskCardWrapper.appendChild(priorityWrapper);

    // Card extension toggle button 
    const toggleExtensionWrapper = document.createElement("div");

    const arrowIcon = createIcon(arrowDownImg, "Toggle details", "extension-btn", "1.75em");
    toggleExtensionWrapper.appendChild(arrowIcon);
    mainTaskCardWrapper.appendChild(toggleExtensionWrapper);

    // Hidden extension container
    const cardExtensionContainer = document.createElement("div");
    cardExtensionContainer.classList.add("extension");
    cardExtensionContainer.classList.add("hide");
    cardContainer.appendChild(cardExtensionContainer);
    
    // Description
    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.classList.add("extension-description");
    cardExtensionContainer.appendChild(descriptionWrapper);
    
    const description = document.createElement("p");
    description.textContent = `${task.description}`;
    descriptionWrapper.appendChild(description);
    
    // Extension edit and remove buttons
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("extension-btns");
    cardExtensionContainer.appendChild(buttonsWrapper);
    
    const ediTaskBtn = createButton("edit-btn", "Edit task", index);
    const editIcon = createIcon(editImg, "Edit task", "", "2em");
    ediTaskBtn.prepend(editIcon);
    showEditTaskModal(ediTaskBtn);
    buttonsWrapper.appendChild(ediTaskBtn);
    
    const removeTaskBtn = createButton("remove-task", "Remove Task", index);
    const trashCanIcon = createIcon(trashCanImg, "Remove task", "remove-icon", "2em");
    removeTaskBtn.prepend(trashCanIcon);
    showRemoveTaskModal(removeTaskBtn);
    buttonsWrapper.appendChild(removeTaskBtn);
    
    return cardContainer;
};

function updateTaskCardsToWrappers() {
    const tasks = getActiveProject().tasks;

    // Remove old cards from wrappers before adding updated cards
    resetDOM(todayTasks.cardsWrapper);
    resetDOM(upcomingTasks.cardsWrapper);
    resetDOM(OneTimeTasks.cardsWrapper);

    tasks.forEach((task, index) => {
        // First, reset the completion of all tasks based on the due date
        task.setToDoUncompleted();

        const card = createTaskCard(task, index);

        if (oneTimeTasksAreCompleted(task)) {
            return OneTimeTasks.cardsWrapper.appendChild(card);
        }

        if (isDueDate(task)) {
            return todayTasks.cardsWrapper.appendChild(card);
        }

        upcomingTasks.cardsWrapper.appendChild(card);
    });
};

const updateTaskCards = () => {
    if (!getActiveProject()) {
        return resetDOM(tasksContainer);
    }

    updateTaskCardsToWrappers();
    updateContentToContainers();  
};

const updateDOM = () => {
    updateProjectCards();
    updateActiveProjectContainer(editProjectNameBtn, addNewToDoBtn, removeProjectBtn);
    updateTaskCards();
};

export { updateDOM };
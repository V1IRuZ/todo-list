import { getProjects, getActiveProject } from "./projects";
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
editProjectModal(editProjectNameBtn);
activeProjectBtnsWrapper.appendChild(editProjectNameBtn);

const addNewToDoBtn = createButton("add-task", "Add new task");
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
    buttons.forEach(button => activeProjectBtnsWrapper.appendChild(button));
};

// TASK CARDS
// Main wrapper container
const tasksContainer = document.createElement("div");
tasksContainer.classList.add("view-tasks");
main.appendChild(tasksContainer);

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
};

// Containers for each task, based on their status
const todayTasks = createContainerToTaskCards("today-container", "Today's tasks");
const upcomingTasks = createContainerToTaskCards("upcoming-container", "Upcoming tasks");
const OneTimeTasks = createContainerToTaskCards("tasks-done", "One-time tasks");

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
    const isTodayTasks = activeProject.tasks.some(task => isDueDate(task) && !taskIsDoneWithNoRepeat(task));
    const isUpcomingTasks = activeProject.tasks.some(task => !isDueDate(task));
    const isOneTimeTasks = activeProject.tasks.some(task => taskIsDoneWithNoRepeat(task));

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
    
    // Allways visible section of card
    const mainTaskCardWrapper = document.createElement("div");
    mainTaskCardWrapper.classList.add("task-card");
    cardContainer.appendChild(mainTaskCardWrapper);

    // Check button for completeing task
    const checkButtonWrapper = document.createElement("div");
    checkButtonWrapper.classList.add("complete-div");

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

    const arrowIcon = createIcon(arrowDownImg, "Toggle details", "details-btn", "1.75em");
    toggleExtensionWrapper.appendChild(arrowIcon);
    mainTaskCardWrapper.appendChild(toggleExtensionWrapper);

    // Hidden extension container
    const cardExtensionContainer = document.createElement("div");
    cardExtensionContainer.classList.add("details");
    cardExtensionContainer.classList.add("hide");
    cardContainer.appendChild(cardExtensionContainer);
    
    // Description
    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.classList.add("task-info");
    cardExtensionContainer.appendChild(descriptionWrapper);
    
    const description = document.createElement("p");
    description.textContent = `${task.description}`;
    descriptionWrapper.appendChild(description);
    
    // Extension edit and remove buttons
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("edit-tasks");
    cardExtensionContainer.appendChild(buttonsWrapper);
    
    const ediTaskBtn = createButton("edit-btn", "Edit task", index);
    const editIcon = createIcon(editImg, "Edit task", "", "2em");
    ediTaskBtn.prepend(editIcon);
    editTaskModal(ediTaskBtn);
    buttonsWrapper.appendChild(ediTaskBtn);
    
    const removeTaskBtn = createButton("remove-task", "Remove Task", index);
    const trashCanIcon = createIcon(trashCanImg, "Remove task", "remove-icon", "2em");
    removeTaskBtn.prepend(trashCanIcon);
    deleteTask(removeTaskBtn);
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

        if (taskIsDoneWithNoRepeat(task)) {
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
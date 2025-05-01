import { withActiveProject, getProjects } from "./projects";
import { resetDOM, updateActiveProjectHeader, addActiveProjectBtns, isDueDate, updateCheckMark } from "./utils";

// aside
const aside = document.createElement("aside");

const myProjectsH1 = document.createElement("h1");
myProjectsH1.textContent = "My Projects";
aside.appendChild(myProjectsH1);

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

const renderProjectListDOM = () => {
    updateProjectCards();
    return aside;
} 

// main
// Active project header
const main = document.createElement("main");

const mainContent = document.createElement("div");

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

// Task Cards
const showTasksDiv = document.createElement("div");
showTasksDiv.classList.add("view-tasks");

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

function displayContainer() {
    withActiveProject((activeProject) => {
        const isTodayTasks = activeProject.tasks.some(task => isDueDate(task))
        const isUpcomingTasks = activeProject.tasks.some(task => !isDueDate(task))

        today.container.remove();
        upcoming.container.remove();

        if (activeProject.tasks.length === 0) {
            return;
        }

        if (isTodayTasks) {
            showTasksDiv.prepend(today.container);
        } 

        if (isUpcomingTasks) {
            showTasksDiv.appendChild(upcoming.container);
        }
    })
}

const makeMainTaskCard = (task, index) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("card-container");
    
    const mainTaskInfo = document.createElement("div");
    mainTaskInfo.classList.add("task-card");
    
    const taskCardTitle = document.createElement("p");
    taskCardTitle.textContent = `${task.title}`
    mainTaskInfo.appendChild(taskCardTitle)
    
    const taskCardDueDate = document.createElement("p");
    taskCardDueDate.textContent = `${task.dueDate}`
    mainTaskInfo.appendChild(taskCardDueDate)
    
    const checkBoxDiv = document.createElement("div");

    const label = document.createElement("label");
    label.setAttribute("for", `completion${index}`);
    checkBoxDiv.appendChild(label);
    
    const checkbox = document.createElement("input");
    checkbox.id = `completion${index}`
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("data-index", index);
    checkBoxDiv.appendChild(checkbox);
    mainTaskInfo.appendChild(checkBoxDiv)
    
    const detailsBtnDiv = document.createElement("div");

    const detailsBtn = document.createElement("button");
    detailsBtn.setAttribute("data-index", index);
    detailsBtn.classList.add("details-btn");
    detailsBtn.textContent = "details";

    detailsBtnDiv.appendChild(detailsBtn)
    mainTaskInfo.appendChild(detailsBtnDiv)

    taskCard.appendChild(mainTaskInfo);

    updateCheckMark(task, checkbox);
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

    const taskPriority = document.createElement("p");
    taskPriority.textContent = `Priority: ${task.priority}`;
    infoDiv.appendChild(taskPriority);

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


function updateTaskCards() {
    resetDOM(today.cardsContainer);
    resetDOM(upcoming.cardsContainer);

    withActiveProject((activeProject) => {
        const tasks = activeProject.tasks

        tasks.forEach((task, index) => {
            const card = makeMainTaskCard(task, index);
            const cardExtendion = makeCardExtension(task, index);
            
            card.appendChild(cardExtendion);

            if (isDueDate(task)) {
                today.cardsContainer.appendChild(card);
            } else {
                upcoming.cardsContainer.appendChild(card);
            }

        })
    })
}


const renderActiveProjectDOM = () => {
    updateActiveProjectHeader(addTasksDiv, activeProjectH1);
    addActiveProjectBtns(addTasksDiv, addNewToDoBtn, removeProjectBtn);
    mainContent.appendChild(activeProjectHeaderDiv);

    updateTaskCards();
    displayContainer();
    mainContent.appendChild(showTasksDiv);
    
    main.appendChild(mainContent)

    return main;
}

export {renderActiveProjectDOM, renderProjectListDOM}
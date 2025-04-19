import { getActiveProject } from "./projects";
import { addTasksDOM } from "./task-modal";

const main = document.createElement("main");

const activeProjectDiv = document.createElement("div");
activeProjectDiv.classList.add("active-project");

const activeProjectH1 = document.createElement("h1");

const addTasksDiv = document.createElement("div");


function updateActiveProjectH1() {
    if (!getActiveProject()) {
        activeProjectH1.textContent = "No project selected";
        return 
    }
    
    activeProjectH1.textContent = `${getActiveProject().name}`;
}

const renderActiveProjectDOM = () => {
    updateActiveProjectH1();
    addTasksDOM(addTasksDiv);
    activeProjectDiv.appendChild(activeProjectH1);
    activeProjectDiv.appendChild(addTasksDiv);
    
    main.appendChild(activeProjectDiv)

    return main;
}

export {renderActiveProjectDOM}
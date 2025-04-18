import { getActiveProject } from "./projects";

const main = document.createElement("main");

const activeProjectDiv = document.createElement("div");
activeProjectDiv.classList.add("active-project");

const activeProjectH1 = document.createElement("h1");

function updateActiveProjectH1() {
    if (!getActiveProject()) {
        return
    }
    
    activeProjectH1.textContent = `${getActiveProject().name}`;
}

const addNewToDoBtn = document.createElement("button");
addNewToDoBtn.textContent = "Add new task";

const renderActiveProjectDOM = () => {
    updateActiveProjectH1();
    activeProjectDiv.appendChild(activeProjectH1);
    activeProjectDiv.appendChild(addNewToDoBtn);
    
    main.appendChild(activeProjectDiv)

    return main;
}

export {renderActiveProjectDOM}
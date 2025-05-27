import { getActiveProject, switchActiveProject } from "./projects";
import { addGlobalEventListener, showHideTaskCardExpansion, switchIcon } from "./utils";
import { updateDOM } from "./DOM";
import { showAddProjectModal } from "./modals";
import { loadData, saveData } from "./local-storage";
import "./styles.css";

document.addEventListener("DOMContentLoaded", loadData);

addGlobalEventListener("click", ".extension-btn", e => {
    let parentContainer = e.target.closest(".card-container");
    let details = parentContainer.querySelector(".extension");

    showHideTaskCardExpansion(details);
    switchIcon(e);
})

addGlobalEventListener("click", ".project-btn", e => {
        let projectIndex = e.target.getAttribute("data-index");
        switchActiveProject(+projectIndex);
        updateDOM();
})

addGlobalEventListener("click", ".complete-btn", e => {
    let index = e.target.getAttribute("data-index");
    let activeProjectTask = getActiveProject().tasks[index];

    if(!activeProjectTask.complete) {
        activeProjectTask.setToDoCompleted();
        activeProjectTask.updateDueToDate();

        updateDOM();
        saveData();
    }   
})

updateDOM();
showAddProjectModal();
import { getActiveProject, switchActiveProject } from "./projects";
import  { addGlobalEventListener, showHideTaskCardExpansion, switchIcon } from "./utils";
import { updateDOM } from "./DOM";
import { saveData } from "./local-storage";

export function eventActions() {
    addGlobalEventListener("click", ".details-btn", e => {
        let parentContainer = e.target.closest(".card-container");
        let details = parentContainer.querySelector(".details");
    
        showHideTaskCardExpansion(details);
        switchIcon(e);
    })
    
    // addGlobalEventListener("click", ".remove-task", e => {
    //     let index = e.target.getAttribute("data-index");
    //     getActiveProject().removeToDo(index);
    //     updateMainDOM();
    //     saveData();
    // })
    
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
}


import { withActiveProject, getActiveProject, removeProject, getActiveProjectIndex, setActiveProject, switchActiveProject } from "./projects";
import  { addGlobalEventListener, showHideDetails, changeButtonText } from "./utils";
import { updateMainDOM, updateDOM } from "./DOM";
import { saveData } from "./local-storage";

export function eventActions() {
    addGlobalEventListener("click", ".details-btn", e => {
        let parentContainer = e.target.closest(".card-container");
        let details = parentContainer.querySelector(".details");
    
        showHideDetails(details);
        changeButtonText(e);
    })
    
    addGlobalEventListener("click", ".remove-project", e => {
        withActiveProject(() => {
            let index = getActiveProjectIndex();
            removeProject(index);
            setActiveProject();
            updateDOM();
            saveData();
        })
    })
    
    addGlobalEventListener("click", ".remove-task", e => {
        let index = e.target.getAttribute("data-index");
        getActiveProject().removeToDo(index);
        updateMainDOM();
        saveData();
    })
    
    addGlobalEventListener("click", ".project-btn", e => {
            let projectIndex = e.target.getAttribute("data-index");
            switchActiveProject(+projectIndex);
            updateMainDOM();
    })
    
    addGlobalEventListener("click", ".complete-btn", e => {
        let index = e.target.getAttribute("data-index");
        let activeProjectTask = getActiveProject().tasks[index];

        if(!activeProjectTask.complete) {
            activeProjectTask.setToDoCompleted();
            activeProjectTask.updateDueToDate();
    
            updateMainDOM();
            saveData();
        }   
    })
}


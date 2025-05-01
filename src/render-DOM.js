import { withActiveProject, getActiveProject, removeProject, getActiveProjectIndex, setActiveProject, switchActiveProject } from "./projects";
import  { addGlobalEventListener, showHideDetails, changeButtonText, showWhenTaskCompleted } from "./utils";
import { updateMainDOM, updateDOM } from "./main-project-DOM";
import { addDays, format } from "date-fns";

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
        })
    })
    
    addGlobalEventListener("click", ".remove-task", e => {
        let index = e.target.getAttribute("data-index");
        getActiveProject().removeToDo(index);
        updateMainDOM();
    })
    
    addGlobalEventListener("click", ".project-btn", e => {
            let projectIndex = e.target.getAttribute("data-index");
            switchActiveProject(+projectIndex);
            updateMainDOM();
    })
    
    addGlobalEventListener("click", 'input[type="checkbox"]', e => {
        let index = e.target.getAttribute("data-index");
        let activeProjectTask = getActiveProject().tasks[index];
        if (e.target.checked) {
            activeProjectTask.setToDoCompleted();
            showWhenTaskCompleted(activeProjectTask);
            updateMainDOM();
        } else {
            activeProjectTask.setToDoUncompleted();
            updateMainDOM();
        }
    })
    
    let today = "2025-04-28";
    // Testing
    addGlobalEventListener("click", ".test", e => {
        
        today = format(addDays(today, 1), "yyyy-MM-dd");
        console.log(today);
    })
}


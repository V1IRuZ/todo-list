import { withActiveProject, getActiveProject, removeProject, getActiveProjectIndex, setActiveProject, switchActiveProject } from "./projects";
import  { addGlobalEventListener, showHideDetails, changeButtonText, showWhenTaskCompleted } from "./utils";
import { renderActiveProjectDOM, renderProjectListDOM } from "./main-project-DOM";
import { addDays, format } from "date-fns";

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
        renderDOM(); 
    })
})

addGlobalEventListener("click", ".remove-task", e => {
    let index = e.target.getAttribute("data-index");
    getActiveProject().removeToDo(index);
    renderActiveProjectDOM();
})

addGlobalEventListener("click", ".project-btn", e => {
        let projectIndex = e.target.getAttribute("data-index");
        switchActiveProject(+projectIndex);
        renderActiveProjectDOM();
})

addGlobalEventListener("click", 'input[type="checkbox"]', e => {
    let index = e.target.getAttribute("data-index");
    let activeProjectTask = getActiveProject().tasks[index];
    if (e.target.checked) {
        activeProjectTask.setToDoCompleted();
        showWhenTaskCompleted(activeProjectTask);
        renderActiveProjectDOM();
    } else {
        activeProjectTask.setToDoUncompleted();
        renderActiveProjectDOM();
    }
})

let today = "2025-04-28";
// Testing
addGlobalEventListener("click", ".test", e => {
    
    today = format(addDays(today, 1), "yyyy-MM-dd");
    console.log(today);
})

const content = document.querySelector("#page");

function renderDOM() {
    const main = renderActiveProjectDOM()
    const aside = renderProjectListDOM();

    content.appendChild(aside);
    content.appendChild(main);
}

export {renderDOM}

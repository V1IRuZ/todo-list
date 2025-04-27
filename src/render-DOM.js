import { withActiveProject, getActiveProject, removeProject, getActiveProjectIndex, setActiveProject, switchActiveProject } from "./projects";
import  { addGlobalEventListener, showHideDetails, changeButtonText } from "./utils";
import { renderProjectListDOM } from "./aside-DOM";
import { renderActiveProjectDOM } from "./main-project-DOM";

addGlobalEventListener("click", ".details-btn", e => {
    let parentContainer = e.target.closest(".card-container");
    let details = parentContainer.querySelector(".details");
    let buttons = parentContainer.querySelector(".edit-tasks");

    showHideDetails(details);
    showHideDetails(buttons);
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
        console.log(e.target.checked);
        activeProjectTask.setToDoCompleted();
        console.log(activeProjectTask.updateDueToDate());
        renderActiveProjectDOM();
    } else {
        activeProjectTask.setToDoUncompleted();
        renderActiveProjectDOM();
    }
})

const content = document.querySelector("#content");

function renderDOM() {
    const main = renderActiveProjectDOM()
    const aside = renderProjectListDOM();

    content.appendChild(aside);
    content.appendChild(main);
}

export {renderDOM}

import { withActiveProject, removeProject, removeTask, getActiveProjectIndex, setActiveProject } from "./projects";
import  { addGlobalEventListener } from "./utils";
import { renderProjectListDOM } from "./aside-DOM";
import { renderActiveProjectDOM } from "./main-project-DOM";

addGlobalEventListener("click", ".remove-project", e => {
    withActiveProject(() => {
        let index = getActiveProjectIndex();
        removeProject(index);
        setActiveProject();
        renderDOM();
    })
})

addGlobalEventListener("click", ".remove-task", e => {
    let index = getActiveProjectIndex();
    removeTask(index);
    renderActiveProjectDOM();
})

const content = document.querySelector("#content");

function renderDOM() {
    const main = renderActiveProjectDOM()
    const aside = renderProjectListDOM();

    content.appendChild(aside);
    content.appendChild(main);
}

export {renderDOM}

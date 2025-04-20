import { renderDOM } from "./render-DOM";
import { getProjectModal } from "./modals";
import { getProjects, defaultProject } from "./projects";
import "./styles.css";

function renderChanges () {
    renderDOM();
    getProjectModal();
    console.log(getProjects());
}

renderChanges();
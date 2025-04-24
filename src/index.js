import { renderDOM } from "./render-DOM";
import { getProjectModal, getTaskModal, editTaskModal } from "./modals";
import { getProjects } from "./projects";
import "./styles.css";

function renderChanges () {
    renderDOM();
    getTaskModal();
    getProjectModal();
    editTaskModal();
    console.log(getProjects());
}

renderChanges();
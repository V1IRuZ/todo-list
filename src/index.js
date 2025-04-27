import { renderDOM } from "./render-DOM";
import { getProjectModal, addTaskModal, editTaskModal } from "./modals";
import { getProjects } from "./projects";
import "./styles.css";


function renderChanges () {
    renderDOM();
    addTaskModal();
    getProjectModal();
    editTaskModal();
    console.log(getProjects());
}

renderChanges();
import { eventActions } from "./events";
import { updateDOM } from "./DOM";
import { getProjectModal, addTaskModal, editTaskModal } from "./modals";
import { getProjects } from "./projects";
import "./styles.css";


function renderChanges () {
    updateDOM();
    eventActions();
    addTaskModal();
    getProjectModal();
    editTaskModal();
    console.log(getProjects());
}

renderChanges();
import { eventActions } from "./events";
import { updateDOM } from "./DOM";
import { getProjectModal, addTaskModal, editTaskModal } from "./modals";
import { getProjects } from "./projects";
import { loadData } from "./local-storage";
import "./styles.css";


document.addEventListener("DOMContentLoaded", loadData);

function renderChanges () {
    updateDOM();
    eventActions();
    addTaskModal();
    getProjectModal();
    editTaskModal();
    console.log(getProjects());
}

renderChanges();
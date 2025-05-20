import { eventActions } from "./events";
import { updateDOM } from "./DOM";
import { getProjectModal, addTaskModal, editTaskModal, deleteProject } from "./modals";
import { getProjects, defaultProject } from "./projects";
import { loadData } from "./local-storage";
import "./styles.css";

// const test = document.querySelector(".test");

// test.addEventListener("click", () => {
//     localStorage.clear();
// })

document.addEventListener("DOMContentLoaded", loadData);

function renderChanges () {
    updateDOM();
    eventActions();
    getProjectModal();
    // editTaskModal();
    // console.log(getProjects());
}

renderChanges();
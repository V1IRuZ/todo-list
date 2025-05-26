import { eventActions } from "./events";
import { updateDOM } from "./DOM";
import { showAddProjectModal } from "./modals";
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
    showAddProjectModal();
    // console.log(getProjects());
}

renderChanges();
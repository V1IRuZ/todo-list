import { renderDOM } from "./render-DOM";
import { getProjectModal } from "./modals";
import { getProjects } from "./projects";
import "./styles.css";

function renderChanges () {
    getProjectModal();
    console.log(getProjects());
}
renderDOM();
renderChanges();
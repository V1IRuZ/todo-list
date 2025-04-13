import { getProjectModal } from "./modals";
import { projects } from "./projects";
import "./styles.css";

function renderChanges () {
    getProjectModal();
    console.log(projects);
}

renderChanges();
import { getProjects, updateProjects, setActiveProject, defaultProject } from "./projects";
import { Project } from "./create-project";
import { Todo } from "./create-todo";
import { updateDOM } from "./DOM";

function saveData () {
    const projects = getProjects();
    if (projects.length > 0) {
        localStorage.setItem("projects", JSON.stringify(projects));
        console.log("data saved")
    } 
}

function loadData () {
    let rawData = JSON.parse(localStorage.getItem("projects")) || [];

    if (!rawData || rawData.length === 0) {
        defaultProject();
        rawData = getProjects();
    }

    const data = rawData.map(project => new Project({
        name: project.name,
        tasks: project.tasks.map(task => new Todo(task)) 
    }))

    console.log("Data created again: ", rawData)

    console.log("Before update:", getProjects());
    updateProjects(data);
    console.log("After update:", getProjects());
    setActiveProject()
    updateDOM();
}

export { saveData, loadData }
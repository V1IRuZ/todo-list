import { getProjects, updateProjects, setActiveProject } from "./projects";
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
    const rawData = JSON.parse(localStorage.getItem("projects")) || [];
    const data = rawData.map(project => new Project({
        name: project.name,
        tasks: project.tasks.map(task => new Todo(task)) 
    }))

    updateProjects(data);
    setActiveProject()
    updateDOM();
}

export { saveData, loadData }
import { getProjects, switchActiveProject } from "./projects";
import { renderActiveProjectDOM } from "./main-project-DOM";
import { resetDOM } from "./utils";

const aside = document.createElement("aside");

const myProjects = document.createElement("div");
myProjects.classList.add("my-projects");

const myProjectsH1 = document.createElement("h1");
myProjectsH1.textContent = "My Projects";

const createProjectCard = (projects) => {
    resetDOM(myProjects);

    projects.forEach((project, index) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        const projectCardBtn = document.createElement("button");
        projectCardBtn.classList.add("project-btn");
        projectCardBtn.textContent = `${project.name}`;
        projectCardBtn.setAttribute("data-index", index);

        projectCard.appendChild(projectCardBtn);
        myProjects.appendChild(projectCard);
    })
}


myProjects.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-btn")) {
        let projectIndex = e.target.getAttribute("data-index");
        switchActiveProject(+projectIndex);
        renderActiveProjectDOM();
    }
});


const renderProjectListDOM = () => {
    const projects = getProjects();
    createProjectCard(projects);

    aside.appendChild(myProjectsH1);
    aside.appendChild(myProjects);

    return aside;
} 

export { renderProjectListDOM }
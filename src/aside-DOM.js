import { getProjects} from "./projects";
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

const renderProjectListDOM = () => {
    const projects = getProjects();
    createProjectCard(projects);

    aside.appendChild(myProjectsH1);
    aside.appendChild(myProjects);

    return aside;
} 

export { renderProjectListDOM }
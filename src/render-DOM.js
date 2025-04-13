import { projects } from "./projects";

const content = document.querySelector("#content");


const aside = document.createElement("aside");
const main = document.createElement("main");

const myProjects = document.createElement("div");
const myProjectsH1 = document.createElement("h1");
myProjectsH1.textContent = "My Projects";

aside.appendChild(myProjectsH1);
aside.appendChild(myProjects);

const createProjectCard = (projects) => {
    projects.forEach(project => {
        const projectCard = document.createElement("div");
        const projectCardH1 = document.createElement("h1");
        projectCardH1.textContent = `${project.name}`;

        projectCard.appendChild(projectCardH1);
        aside.appendChild(projectCard);
    })
}

const resetDOM = (container) => {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

const updateAsideDOM = () => {
    resetDOM(aside);
    createProjectCard(projects);
}



function renderDOM() {
    
    content.appendChild(aside);
    content.appendChild(main);
}

export {resetDOM, updateAsideDOM, renderDOM}

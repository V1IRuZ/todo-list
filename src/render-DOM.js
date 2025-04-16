import { getProjects, getActiveProject, switchActiveProject } from "./projects";

const projects = getProjects();

const content = document.querySelector("#content");

const aside = document.createElement("aside");

const myProjects = document.createElement("div");
myProjects.classList.add("my-projects");

const myProjectsH1 = document.createElement("h1");
myProjectsH1.textContent = "My Projects";

aside.appendChild(myProjectsH1);
aside.appendChild(myProjects);

const createProjectCard = (projects) => {
    projects.forEach((project, index) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        const projectCardBtn = document.createElement("button");
        projectCardBtn.classList.add("project-btn");
        projectCardBtn.textContent = `${project.name}`;
        projectCardBtn.setAttribute("data-index", index);

        projectCardBtn.addEventListener("click", (e) => {
            let projectIndex = e.target.getAttribute("data-index");
            switchActiveProject(+projectIndex);
            updateActiveProjectH1();
            console.log(getProjects());
        });

        projectCard.appendChild(projectCardBtn);
        myProjects.appendChild(projectCard);
        aside.appendChild(myProjects);
    })
}

const resetDOM = (container) => {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

const updateProjectsDOM = () => {
    resetDOM(myProjects);
    createProjectCard(projects);
}



const main = document.createElement("main");

const activeProjectDiv = document.createElement("div");
activeProjectDiv.classList.add("active-project");

const activeProjectH1 = document.createElement("h1");

function updateActiveProjectH1() {
    if (!getActiveProject()) {
        return
    }
    
    activeProjectH1.textContent = `${getActiveProject().name}`;
}

updateActiveProjectH1();

const addNewToDoBtn = document.createElement("button");
addNewToDoBtn.textContent = "Add new task";


activeProjectDiv.appendChild(activeProjectH1);
activeProjectDiv.appendChild(addNewToDoBtn);

main.appendChild(activeProjectDiv)

function renderDOM() {
    updateProjectsDOM();
    content.appendChild(aside);
    content.appendChild(main);
}

export {resetDOM, updateProjectsDOM, renderDOM}

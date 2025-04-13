import { makeNewProject } from "./projects";

export function getProjectModal() {
    const addProjectBtn = document.querySelector(".add-project");
    const projectModal = document.querySelector("#project-modal");
    const projectForm = document.querySelector(".project-form");

    
    addProjectBtn.addEventListener("click", () => {
        projectModal.showModal();
    })

    projectForm.addEventListener("submit", e => {
        const projectName = document.querySelector("#name").value;

        makeNewProject(projectName);

        projectModal.close();
        projectForm.reset();

        e.preventDefault();
    }) 

    const closeProjectModal = document.querySelector(".close-project");

    closeProjectModal.addEventListener("click", (e) => {
        projectModal.close();
        projectForm.reset();
        e.preventDefault();
    });
}


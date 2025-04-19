import { renderDOM } from "./render-DOM";
import { makeNewProject } from "./projects";
import { closeModal } from "./utils";

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
        renderDOM();
        
        closeModal(e, projectModal, projectForm)
    }) 

    const closeProjectModal = document.querySelector(".close-project");

    closeProjectModal.addEventListener("click", (e) => {
        closeModal(e, projectModal, projectForm)
    });

}


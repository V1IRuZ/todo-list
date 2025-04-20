import { withActiveProject } from "./projects";
import { addTasksDOM } from "./task-modal";
import { resetDOM } from "./utils";

const main = document.createElement("main");

const activeProjectDiv = document.createElement("div");

const activeProjectHeaderDiv = document.createElement("div");
activeProjectHeaderDiv.classList.add("active-project");

const activeProjectH1 = document.createElement("h1");
activeProjectH1.textContent = "No project selected";
activeProjectHeaderDiv.appendChild(activeProjectH1)

const addTasksDiv = document.createElement("div");
activeProjectHeaderDiv.appendChild(addTasksDiv);


function updateActiveProjectH1() {
    withActiveProject((activeProject) => {
        activeProjectH1.textContent = `${activeProject.name}`;
    })
}

const showTasksDiv = document.createElement("div");
showTasksDiv.classList.add("view-tasks");

function makeTaskCard() {
    resetDOM(showTasksDiv);

    withActiveProject((activeProject) => {
        const tasks = activeProject.tasks
        console.log(tasks);

        tasks.forEach(task => {
            const makeTaskCardDiv = document.createElement("div");
            makeTaskCardDiv.classList.add("task-card");

            const makeTaskCardTitle = document.createElement("p");
            makeTaskCardTitle.textContent = `${task.title}`

            const makeTaskCardDueDate = document.createElement("p");
            makeTaskCardDueDate.textContent = `${task.dueDate}`

            const checkBoxDiv = document.createElement("div");
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            
            checkBoxDiv.appendChild(label);
            checkBoxDiv.appendChild(input);

            makeTaskCardDiv.appendChild(makeTaskCardTitle);
            makeTaskCardDiv.appendChild(makeTaskCardDueDate);
            makeTaskCardDiv.appendChild(checkBoxDiv);
            
            showTasksDiv.appendChild(makeTaskCardDiv);
        })
    })
}


const renderActiveProjectDOM = () => {
    updateActiveProjectH1();
    addTasksDOM(addTasksDiv);
    activeProjectDiv.appendChild(activeProjectHeaderDiv);

    makeTaskCard();
    activeProjectDiv.appendChild(showTasksDiv);
    
    main.appendChild(activeProjectDiv)

    return main;
}

export {renderActiveProjectDOM}
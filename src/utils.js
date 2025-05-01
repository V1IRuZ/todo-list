import { withActiveProject, getActiveProject } from "./projects";
import { format, addDays, isBefore, isEqual, isAfter } from "date-fns";

function showCurrentDate() {
    return format(new Date(), "yyyy-MM-dd");
}

function isDueDate (task) {
    return isEqual(showCurrentDate(), task.dueDate);
}

function resetDOM(container) {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function closeModal (event, modal, form) {
    modal.close();
    form.reset();

    event.preventDefault();
}

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e);
    })
}

function showHideDetails(element) {
    element.classList.toggle("hide");
}

function changeButtonText(event) {
    event.target.textContent = event.target.textContent === "details" ? "hide" : "details";
}

function updateActiveProjectHeader(container, element) {
    if (!getActiveProject()) {
        resetDOM(container)
        element.textContent = "No projects";
        return
    }
        element.textContent = `${getActiveProject().name}`
}

function addActiveProjectBtns(container, ...buttons) {
    withActiveProject(() => {
        buttons.forEach(button => {
            container.appendChild(button);
        })
    })
}

function updateCheckMark(task, input) {
    const dueDateToday = isEqual(showCurrentDate(), task.dueDate);
    if (!dueDateToday) {
        input.disabled = true;
    }

    if (!task.complete && dueDateToday) {
        input.disabled = false;
    }
    if (task.complete) {
        input.setAttribute("checked", true);
        input.disabled = true;
    }
}


function showWhenTaskCompleted(task) {
    const today = format(new Date(), "yyyy-MM-dd");
    const test = isEqual(today, task.dayCompleted);
    console.log(test);
}   


export {resetDOM, closeModal, addGlobalEventListener, showHideDetails, changeButtonText, addActiveProjectBtns, updateActiveProjectHeader, updateCheckMark, showWhenTaskCompleted, isDueDate}
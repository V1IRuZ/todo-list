import { withActiveProject, getActiveProject } from "./projects";
import { format, addDays, isBefore, isEqual, isAfter } from "date-fns";
import { updateDOM } from "./DOM";



let today = "2025-05-04";
// Testing
addGlobalEventListener("click", ".test", e => {
    today = format(addDays(today, 1), "yyyy-MM-dd");
    e.target.textContent = `${today}`;
    
    updateDOM();
})
function showCurrentDate() {
    return today;
    // return format(new Date(), "yyyy-MM-dd");
}

function isDueDate (task) {
    return isEqual(showCurrentDate(), task.dayCompleted) || (isEqual(showCurrentDate(), task.dueDate) || isAfter(showCurrentDate(), task.dueDate));
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
    event.target.textContent = event.target.textContent === "+" ? "-" : "+";
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

function updateStateOfCompleteBtn (task, button) {
    if (isEqual(showCurrentDate(), task.dayCompleted)) {
        button.classList.add("done");
        button.textContent = "Done";
    } else {
        button.classList.add("not-done");
        button.textContent = "Not Done";
    }
}

function enableDisableCheckBtn(task, button) {
    const dueDateToday = isEqual(showCurrentDate(), task.dueDate)
    const dueDateLate = isBefore(task.dueDate, showCurrentDate())
    // After testing change today to showCurrentDate()
    
    if (dueDateToday || dueDateLate) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}
 

export {resetDOM, closeModal, addGlobalEventListener, showHideDetails, changeButtonText, addActiveProjectBtns, updateActiveProjectHeader, enableDisableCheckBtn, updateStateOfCompleteBtn, isDueDate, showCurrentDate}
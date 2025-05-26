import { format, isBefore, isEqual, isAfter } from "date-fns";
import arrowDownImg from "./icons/arrow-down-drop-circle-outline.svg";
import arrowUpImg from "./icons/arrow-up-drop-circle-outline.svg";

// Testing

// let today = "2025-05-07";
// addGlobalEventListener("click", ".test", e => {
//     today = format(addDays(today, 1), "yyyy-MM-dd");
//     e.target.textContent = `${today}`;
    
//     updateDOM();
// })

// DOM 
function createButton (className, buttonText, index) {
    const button = document.createElement("button");
    button.classList.add(className);

    if (buttonText) {
        button.textContent = buttonText;
    }

    if (index || index === 0) {
        button.setAttribute("data-index", index);
    }

    return button;
}

function createIcon (srcIcon, altText, className, width) {
    const icon = document.createElement("img");
    icon.src = srcIcon;
    icon.alt = altText;

    if (className) {
        icon.classList.add(className);
    }

    if (width) {
        icon.style.width = width;
    }

    return icon;
}

function resetDOM(container) {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function showHideTaskCardExpansion(container) {
    container.classList.toggle("hide");
}

function switchIcon(event) {
    event.target.src = event.target.src.includes(arrowDownImg) ? arrowUpImg : arrowDownImg;
}

function getCounterTextContent(project, element) {
    if (project.getCounter() === 0) {
        element.style.color = "green";
        return element.innerHTML = "&#10003;";
        
    }

    element.style.color = "#ff6b6b";
    return element.textContent = project.getCounter();
}

function setPriorityColor (task, element) {
    switch(task.priority) {
        case "Low":
            element.style.backgroundColor = "#90ee90";
            break;
        case "Medium":
            element.style.backgroundColor = "#fdd835";
            break;
        case "High":
            element.style.backgroundColor = "#ffa07a";
            break;
        case "Critical":
            element.style.backgroundColor = "#ff6b6b";
            break;
    }
}

function updateStateOfCompleteBtn (task, button) {
    if (isEqual(showCurrentDate(), task.dayCompleted) || task.remainder === 'none' && task.complete) {
        button.classList.add("done");
        button.innerHTML = "&#10003;";
        button.style.color = "green";
    } else {
        button.classList.add("not-done");
        button.textContent = ""
    }
}

function enableDisableCheckBtn(task, button) {
    const dueDateToday = isEqual(showCurrentDate(), task.dueDate)
    const dueDateLate = isBefore(task.dueDate, showCurrentDate())

    if (task.remainder === 'none' && task.complete) {
        button.disabled = true;
    } else if (dueDateToday || dueDateLate) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

// Events

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e);
    })
}

// Modal

function closeModal (event, modal, form) {
    modal.close();
    form.reset();

    event.preventDefault();
}

// Checking Date and task completion functions

function showCurrentDate() {
    return format(new Date(), "yyyy-MM-dd");
}

function isDueDate (task) {
    return isEqual(showCurrentDate(), task.dayCompleted) || (isEqual(showCurrentDate(), task.dueDate) || isAfter(showCurrentDate(), task.dueDate));
}

function oneTimeTasksAreCompleted (task) {
    return task.remainder === 'none' && task.complete;
}

export {
    resetDOM, 
    closeModal, 
    addGlobalEventListener, 
    showHideTaskCardExpansion, 
    switchIcon,
    enableDisableCheckBtn, 
    updateStateOfCompleteBtn, 
    isDueDate, 
    showCurrentDate, 
    setPriorityColor, 
    oneTimeTasksAreCompleted,
    getCounterTextContent,
    createButton,
    createIcon
}
import { format, addDays, isBefore, isAfter, isEqual } from "date-fns";
import { showCurrentDate } from "./utils";

class Todo {
    // Testing
    // #today = format(new Date(), "yyyy-MM-dd");
    complete = false;
    dayCompleted = "";

    constructor(title, description, dueDate, remainder, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.remainder = remainder;
        this.priority = priority;
    }

    editToDo(title, description, dueDate, remainder, priority) {
        if (title !== undefined) this.title = title;
        if (description !== undefined) this.description = description;
        if (dueDate !== undefined) this.dueDate = dueDate;
        if (remainder !== undefined) this.remainder = remainder;
        if (priority !== undefined) this.priority = priority;
    }

    setToDoCompleted() {
        this.complete = true;
        this.dayCompleted = showCurrentDate();
    }

    setToDoUncompleted() {
        if (isEqual(showCurrentDate(), this.dueDate) || isBefore(showCurrentDate(), this.dueDate)) {
        this.complete = false;
        }
    }

    updateDueToDate() {
        this.dueDate = format(addDays(showCurrentDate(), +this.remainder), "yyyy-MM-dd");
        console.log(`duedate: ${this.dueDate}, Remainder: ${this.remainder}, Day completed: ${this.dayCompleted}`);
    }
}

export { Todo }












import { format, addDays, addMonths, isBefore, isEqual } from "date-fns";
import { showCurrentDate } from "./utils";

class Todo {
    constructor({title, description, dueDate, remainder, priority, complete = false, dayCompleted = ""}) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.remainder = remainder;
        this.priority = priority;
        this.complete = complete;
        this.dayCompleted = dayCompleted;
    };

    editToDo(title, description, dueDate, remainder, priority) {
        if (title !== undefined) {
            this.title = title;
        }

        if (description !== undefined) {
            this.description = description;
        }

        if (dueDate !== undefined) {
            this.dueDate = dueDate;
        }

        if (remainder !== undefined) {
            this.remainder = remainder;
        }

        if (priority !== undefined) {
            this.priority = priority;
        }

        this.complete = false;
        this.dayCompleted = "";
    };

    setToDoCompleted() {
        this.complete = true;
        this.dayCompleted = showCurrentDate();
    };

    setToDoUncompleted() {
        if (this.remainder === 'none') {
            return;
        }

        if (isEqual(showCurrentDate(), this.dueDate) || isBefore(showCurrentDate(), this.dueDate)) {
            this.complete = false;
        }
    };

    updateDueToDate() {
        if (this.remainder === 'none') {
            return;
        }
        
        if (this.remainder === 'monthly') {
           return this.dueDate = format(addMonths(showCurrentDate(), 1), "yyyy-MM-dd");
        }

        this.dueDate = format(addDays(showCurrentDate(), +this.remainder), "yyyy-MM-dd");
    };
};

export { Todo }












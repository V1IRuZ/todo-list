import { format, addDays } from "date-fns";

class Todo {
    #today = format(new Date(), "yyyy-MM-dd");
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
        this.dayCompleted = format(new Date(), "yyyy-MM-dd");
    }

    setToDoUncompleted() {
        this.complete = false;
    }

    updateDueToDate() {
        if (this.complete) {

            this.dueDate = format(addDays(this.#today, +this.remainder), "yyyy-MM-dd");
        }
    }
}

export { Todo }












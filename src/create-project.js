import { Todo } from "./create-todo";
import { format, isEqual, isAfter } from "date-fns";

export class Project {
constructor({name, tasks = []}) {
        this.name = name;
        this.tasks = tasks.map(task => new Todo(task))
    }

    addToDo(todo) {
        this.tasks.push(todo)
    }

    editName(name) {
        if (name !== undefined) this.name = name;
    }

    removeToDo(index) {
        this.tasks.splice(index, 1);
    }

    getCounter() {
        const today = format(new Date(), "yyyy-MM-dd");

        return this.tasks.reduce((total, task) => {
        const dueDateToday = isEqual(today, task.dueDate);
        const dueDateLate = isAfter(today, task.dueDate);

            if ((dueDateToday || dueDateLate) && !task.complete) {
                total++
            }

            return total

        }, 0);
    }
}
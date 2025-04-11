class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

const todo = new Todo("Workout", "Leg day", "12.4.2025", "high");

export function printTodo () {
    console.log(todo);
};

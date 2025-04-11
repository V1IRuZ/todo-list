class Project {
    toDos = []

    constructor(name) {
        this.name = name;
    }

    addTodo(todo) {
        this.toDos.push(todo)
    }
}

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

const project = new Project("Everyday tasks");

const todo = new Todo("Workout", "Leg day", "12.4.2025", "high");
const medicine = new Todo("Allergic Medicine", "1 tablet of certizin", "12.4.2025", "Critical")

project.addTodo(todo);
project.addTodo(medicine);

export function printTodo () {
    console.log(project);
};

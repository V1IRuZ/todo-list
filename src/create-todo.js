class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    editToDo(title, description, dueDate, priority) {
        if (title !== undefined) this.title = title;
        if (description !== undefined) this.description = description;
        if (dueDate !== undefined) this.dueDate = dueDate;
        if (priority !== undefined) this.priority = priority;
    }
}

export { Todo }












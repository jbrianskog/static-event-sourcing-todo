import { Todo, CompletedTodo } from "../domain/todo";
import { todoController } from "./todo-controller";

export function todoListGroupController(todos: (Todo | CompletedTodo)[]): DocumentFragment {
    let fragment = new DocumentFragment();
    for (const todo of todos) {
        fragment.appendChild(todoController(todo))
    }
    return fragment;
}

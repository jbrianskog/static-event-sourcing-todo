import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, findControllerElement } from "../utils";
import { todoListGroupController } from "./todo-list-group-controller";

export function todoListController(todos: (Todo | CompletedTodo)[]): DocumentFragment {
    let fragment = templateClone("todoListTemplate");
    findControllerElement(fragment, "todoListGroupController")
        .appendChild(todoListGroupController(todos));
    return fragment;
}

import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { todoListGroupController } from "./todo-list-group-controller";

export function todoListController(todos: (Todo | CompletedTodo)[]): DocumentFragment {
    let fragment = templateClone("todoListTemplate");
    fillControllerElements(fragment, "todoListGroupController", todoListGroupController(todos));
    return fragment;
}

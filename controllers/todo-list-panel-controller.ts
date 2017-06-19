import { Todo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { todoListController } from "./todo-list-controller";

export function todoListPanelController(todos: Todo[]): DocumentFragment {
    if (!todos.length) {
        return new DocumentFragment();
    }
    let fragment = templateClone("todoListPanelTemplate");
    fillControllerElements(fragment, "todoListController", todoListController(todos)); 
    return fragment;
}
import { Todo } from "../domain/todo";
import { templateClone, findControllerElement } from "../utils";
import { todoListController } from "./todo-list-controller";

export function todoListPanelController(todos: Todo[]): DocumentFragment {
    if (!todos.length) {
        return new DocumentFragment();
    }
    let fragment = templateClone("todoListPanelTemplate");
    findControllerElement(fragment, "todoListController")
        .appendChild(todoListController(todos));
    return fragment;
}
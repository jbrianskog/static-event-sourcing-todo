import { CompletedTodo } from "../domain/todo";
import { templateClone, findControllerElement } from "../utils";
import { todoListController } from "./todo-list-controller";

export function completedTodoListPanelController(todos: CompletedTodo[]): DocumentFragment {
    if (!todos.length) {
        return new DocumentFragment();
    }
    let fragment = templateClone("completedTodoListPanelTemplate");
    findControllerElement(fragment, "todoListController")
        .appendChild(todoListController(todos));
    return fragment;
}

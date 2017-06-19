import { CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { todoListController } from "./todo-list-controller";

export function completedTodoListPanelController(todos: CompletedTodo[]): DocumentFragment {
    if (!todos.length) {
        return new DocumentFragment();
    }
    let fragment = templateClone("completedTodoListPanelTemplate");
    fillControllerElements(fragment, "todoListController", todoListController(todos));
    return fragment;
}

import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { todoTitleController } from "./todo-title-controller";
import { todoActionsPanelButtonsController } from "./todo-actions-panel-buttons-controller";

export function todoActionsPanelController(todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoActionsPanelTemplate");
    fillControllerElements(fragment, "todoTitleController", todoTitleController(todo));
    fillControllerElements(fragment, "todoActionsPanelButtonsController", todoActionsPanelButtonsController(todo));
    return fragment;
}
import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, findControllerElement } from "../utils";
import { todoTitleController } from "./todo-title-controller";
import { todoActionsPanelButtonsController } from "./todo-actions-panel-buttons-controller";

export function todoActionsPanelController(todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoActionsPanelTemplate");
    findControllerElement(fragment, "todoTitleController")
        .appendChild(todoTitleController(todo));
    findControllerElement(fragment, "todoActionsPanelButtonsController")
        .appendChild(todoActionsPanelButtonsController(todo));
    return fragment;
}
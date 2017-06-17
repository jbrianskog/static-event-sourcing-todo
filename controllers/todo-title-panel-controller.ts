import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, findControllerElement } from "../utils";
import { todoTitleController } from "./todo-title-controller";

export function todoTitlePanelController(todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoTitlePanelTemplate");
    findControllerElement(fragment, "todoTitleController")
        .appendChild(todoTitleController(todo));
    return fragment;
}
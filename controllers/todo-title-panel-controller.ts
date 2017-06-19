import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { todoTitleController } from "./todo-title-controller";

export function todoTitlePanelController(todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoTitlePanelTemplate");
    fillControllerElements(fragment, "todoTitleController", todoTitleController(todo));
    return fragment;
}
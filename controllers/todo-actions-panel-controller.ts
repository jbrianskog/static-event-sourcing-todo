import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { todoTitleController } from "./todo-title-controller";
import { Dependencies } from "../dependencies";

export function todoActionsPanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoActionsPanelTemplate");
    fillControllerElements(fragment, "todoTitleController", di.todoTitleController(di, todo));
    fillControllerElements(fragment, "todoActionsPanelButtonsController", di.todoActionsPanelButtonsController(di, todo));
    return fragment;
}
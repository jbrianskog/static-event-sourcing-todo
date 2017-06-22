import { Dependencies } from "../dependencies";
import { CompletedTodo, Todo } from "../domain/todo";
import { fillControllerElements, templateClone } from "../utils";
import { todoTitleController } from "./todo-title-controller";

export function todoActionsPanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoActionsPanelTemplate");
    fillControllerElements(fragment, "todoTitleController", di.todoTitleController(di, todo));
    fillControllerElements(fragment, "todoActionsPanelButtonsController", di.todoActionsPanelButtonsController(di, todo));
    return fragment;
}

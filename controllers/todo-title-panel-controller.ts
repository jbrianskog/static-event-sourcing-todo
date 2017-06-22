import { Dependencies } from "../dependencies";
import { CompletedTodo, Todo } from "../domain/todo";
import { fillControllerElements, templateClone } from "../utils";

export function todoTitlePanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoTitlePanelTemplate");
    fillControllerElements(fragment, "todoTitleController", di.todoTitleController(di, todo));
    return fragment;
}

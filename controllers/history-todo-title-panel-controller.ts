import { Dependencies } from "../dependencies";
import { CompletedTodo, Todo } from "../domain/todo";
import { fillControllerElements, templateClone } from "../utils";

export function historyTodoTitlePanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("historyTodoTitlePanelTemplate");
    fillControllerElements(fragment, "todoTitleController", di.todoTitleController(di, todo));
    return fragment;
}

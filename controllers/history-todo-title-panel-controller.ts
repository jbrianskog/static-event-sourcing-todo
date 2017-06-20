import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { Dependencies } from "../dependencies";

export function historyTodoTitlePanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("historyTodoTitlePanelTemplate");
    fillControllerElements(fragment, "todoTitleController", di.todoTitleController(di, todo));
    return fragment;
}
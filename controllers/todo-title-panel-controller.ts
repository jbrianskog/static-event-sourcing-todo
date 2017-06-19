import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { Dependencies } from "../dependencies";

export function todoTitlePanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoTitlePanelTemplate");
    fillControllerElements(fragment, "todoTitleController", di.todoTitleController(di, todo));
    return fragment;
}
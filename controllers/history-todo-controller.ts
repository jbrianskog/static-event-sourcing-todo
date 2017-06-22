import { Dependencies } from "../dependencies";
import { CompletedTodo, Todo } from "../domain/todo";
import { fillControllerElements, templateClone } from "../utils";

export function historyTodoController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = (todo.isCompleted)
        ? templateClone("historyCompletedTodoTemplate")
        : templateClone("historyTodoTemplate");
    fillControllerElements(fragment, "historyTodoTitlePanelController", di.historyTodoTitlePanelController(di, todo));
    return fragment;
}

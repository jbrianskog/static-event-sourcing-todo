import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { Dependencies } from "../dependencies";

export function historyTodoController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = (todo.isCompleted)
        ? templateClone("historyCompletedTodoTemplate")
        : templateClone("historyTodoTemplate");
    fillControllerElements(fragment, "historyTodoTitlePanelController", di.historyTodoTitlePanelController(di, todo));
    return fragment;
}

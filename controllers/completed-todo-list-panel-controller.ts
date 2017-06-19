import { CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { Dependencies } from "../dependencies";

export function completedTodoListPanelController(di: Dependencies, todos: CompletedTodo[]): DocumentFragment {
    if (!todos.length) {
        return new DocumentFragment();
    }
    let fragment = templateClone("completedTodoListPanelTemplate");
    fillControllerElements(fragment, "todoListController", di.todoListController(di, todos));
    return fragment;
}

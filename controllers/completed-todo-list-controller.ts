import { CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { Dependencies } from "../dependencies";

export function completedTodoListController(di: Dependencies, todos: CompletedTodo[]): DocumentFragment {
    if (!todos.length) {
        return document.createDocumentFragment();
    }
    let fragment = templateClone("completedTodoListTemplate");
    fillControllerElements(fragment, "todoListController", di.todoListController(di, todos));
    return fragment;
}

import { Dependencies } from "../dependencies";
import { Todo } from "../domain/todo";
import { fillControllerElements, templateClone } from "../utils";

export function incompleteTodoListController(di: Dependencies, todos: Todo[]): DocumentFragment {
    if (!todos.length) {
        return document.createDocumentFragment();
    }
    let fragment = templateClone("incompleteTodoListTemplate");
    fillControllerElements(fragment, "todoListController", di.todoListController(di, todos));
    return fragment;
}

import { Todo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { Dependencies } from "../dependencies";

export function incompleteTodoListController(di: Dependencies, todos: Todo[]): DocumentFragment {
    if (!todos.length) {
        return new DocumentFragment();
    }
    let fragment = templateClone("incompleteTodoListTemplate");
    fillControllerElements(fragment, "todoListController", di.todoListController(di, todos)); 
    return fragment;
}
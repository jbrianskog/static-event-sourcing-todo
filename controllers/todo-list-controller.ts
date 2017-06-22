import { Dependencies } from "../dependencies";
import { CompletedTodo, Todo } from "../domain/todo";
import { fillControllerElements, templateClone } from "../utils";

export function todoListController(di: Dependencies, todos: (Todo | CompletedTodo)[]): DocumentFragment {
    let fragment = templateClone("todoListTemplate");
    fillControllerElements(fragment, "todoListGroupController", di.todoListGroupController(di, todos));
    return fragment;
}

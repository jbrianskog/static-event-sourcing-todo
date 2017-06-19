import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements } from "../utils";
import { Dependencies } from "../dependencies";

export function todoListController(di: Dependencies, todos: (Todo | CompletedTodo)[]): DocumentFragment {
    let fragment = templateClone("todoListTemplate");
    fillControllerElements(fragment, "todoListGroupController", di.todoListGroupController(di, todos));
    return fragment;
}

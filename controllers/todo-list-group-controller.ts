import { Dependencies } from "../dependencies";
import { CompletedTodo, Todo } from "../domain/todo";

export function todoListGroupController(di: Dependencies, todos: (Todo | CompletedTodo)[]): DocumentFragment {
    let fragment = document.createDocumentFragment();
    for (const todo of todos) {
        fragment.appendChild(di.todoController(di, todo));
    }
    return fragment;
}

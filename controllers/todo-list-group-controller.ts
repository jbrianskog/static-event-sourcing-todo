import { Todo, CompletedTodo } from "../domain/todo";
import { Dependencies } from "../dependencies";

export function todoListGroupController(di: Dependencies, todos: (Todo | CompletedTodo)[]): DocumentFragment {
    let fragment = new DocumentFragment();
    for (const todo of todos) {
        fragment.appendChild(di.todoController(di, todo))
    }
    return fragment;
}

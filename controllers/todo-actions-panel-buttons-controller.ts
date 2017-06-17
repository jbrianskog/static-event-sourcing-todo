import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, setPropElements } from "../utils";

export function todoActionsPanelButtonsController(todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoDeleteBtnTemplate");
    if (!todo.isCompleted) {
        fragment.appendChild(templateClone("todoMoveUpBtnTemplate"));
        fragment.appendChild(templateClone("todoMoveDownBtnTemplate"));
    }
    for (const element of fragment.querySelectorAll("button")) {
        element.dataset.todoId = todo.id;
    }
    fragment.appendChild(templateClone("todoRenameBtnTemplate"));
    setPropElements(fragment, "todo-id", todo.id);
    return fragment;
}
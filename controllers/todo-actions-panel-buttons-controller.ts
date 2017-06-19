import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, setAttrElements } from "../utils";
import { todoIdDataAttrName } from "../app.common";

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
    setAttrElements(fragment, todoIdDataAttrName, todo.id);
    return fragment;
}
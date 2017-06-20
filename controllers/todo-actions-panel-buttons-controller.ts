import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, setAttrElements } from "../utils";
import { todoIdDataAttrName } from "../app.common";
import { Dependencies } from "../dependencies";

export function todoActionsPanelButtonsController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoDeleteBtnTemplate");
    if (!todo.isCompleted) {
        fragment.appendChild(templateClone("todoMoveUpBtnTemplate"));
        fragment.appendChild(templateClone("todoMoveDownBtnTemplate"));
    }
    fragment.appendChild(templateClone("todoRenameBtnTemplate"));
    setAttrElements(fragment, todoIdDataAttrName, todo.id);
    return fragment;
}
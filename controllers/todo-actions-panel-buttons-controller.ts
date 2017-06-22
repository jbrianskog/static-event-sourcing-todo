import { todoIdDataAttrName } from "../app.common";
import { Dependencies } from "../dependencies";
import { CompletedTodo, Todo } from "../domain/todo";
import { setAttrElements, templateClone } from "../utils";

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

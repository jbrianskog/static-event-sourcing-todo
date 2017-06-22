import { invalidNameInputHandler, todoIdDataAttrName } from "../app.common";
import { Dependencies } from "../dependencies";
import { CompletedTodo, Todo } from "../domain/todo";
import { findElement, setAttrElements, templateClone } from "../utils";

export function todoRenamePanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoRenamePanelTemplate");
    let input = findElement(fragment, "input[name='name']");
    let inputId = input.getAttribute("id");
    let newInputId = `${inputId}-${todo.id}`;
    let label = findElement(fragment, `label[for='${inputId}']`);
    input.setAttribute("id", newInputId);
    input.setAttribute("value", todo.name);
    label.setAttribute("for", newInputId);
    setAttrElements(fragment, todoIdDataAttrName, todo.id);
    $(input).on("invalid", invalidNameInputHandler);
    return fragment;
}

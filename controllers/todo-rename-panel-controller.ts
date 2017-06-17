import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, findElement, setPropElements } from "../utils";
import { invalidNameInputHandler } from "../app.common";

export function todoRenamePanelController(todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = templateClone("todoRenamePanelTemplate");
    let input = findElement(fragment, "input[name='name']");
    let inputId = input.getAttribute("id");
    let newInputId = `${inputId}-${todo.id}`;
    let label = findElement(fragment, `label[for='${inputId}']`);
    input.setAttribute("id", newInputId);
    input.setAttribute("value", todo.name);
    label.setAttribute("for", newInputId);
    setPropElements(fragment, "todo-id", todo.id);
    $(input).on("invalid", invalidNameInputHandler);
    return fragment;
}
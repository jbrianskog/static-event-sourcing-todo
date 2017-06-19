import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, fillControllerElements, setAttrElements } from "../utils";
import { todoTitlePanelController } from "./todo-title-panel-controller";
import { todoActionsPanelController } from "./todo-actions-panel-controller";
import { todoRenamePanelController } from "./todo-rename-panel-controller";
import { todoIdDataAttrName } from "../app.common";

export function todoController(todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = (todo.isCompleted)
        ? templateClone("completedTodoTemplate")
        : templateClone("todoTemplate");
    setAttrElements(fragment, todoIdDataAttrName, todo.id);
    fillControllerElements(fragment, "todoTitlePanelController", todoTitlePanelController(todo));
    fillControllerElements(fragment, "todoActionsPanelController", todoActionsPanelController(todo));
    fillControllerElements(fragment, "todoRenamePanelController", todoRenamePanelController(todo));
    return fragment;
}

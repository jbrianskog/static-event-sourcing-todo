import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, findControllerElement, setPropElements } from "../utils";
import { todoTitlePanelController } from "./todo-title-panel-controller";
import { todoActionsPanelController } from "./todo-actions-panel-controller";
import { todoRenamePanelController } from "./todo-rename-panel-controller";

export function todoController(todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = (todo.isCompleted)
        ? templateClone("completedTodoTemplate")
        : templateClone("todoTemplate");
    setPropElements(fragment, "todo-id", todo.id);
    findControllerElement(fragment, "todoTitlePanelController")
        .appendChild(todoTitlePanelController(todo));
    findControllerElement(fragment, "todoActionsPanelController")
        .appendChild(todoActionsPanelController(todo));
    findControllerElement(fragment, "todoRenamePanelController")
        .appendChild(todoRenamePanelController(todo));
    return fragment;
}

import { todoIdDataAttrName } from "../app.common";
import { Dependencies } from "../dependencies";
import { CompletedTodo, Todo } from "../domain/todo";
import { fillControllerElements, setAttrElements, templateClone } from "../utils";

export function todoController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let fragment = (todo.isCompleted)
        ? templateClone("completedTodoTemplate")
        : templateClone("todoTemplate");
    setAttrElements(fragment, todoIdDataAttrName, todo.id);
    fillControllerElements(fragment, "todoTitlePanelController", di.todoTitlePanelController(di, todo));
    fillControllerElements(fragment, "todoActionsPanelController", di.todoActionsPanelController(di, todo));
    fillControllerElements(fragment, "todoRenamePanelController", di.todoRenamePanelController(di, todo));
    return fragment;
}

import { Dependencies } from "../dependencies";
import { TodoList } from "../domain/todo-list";
import { DomainEvent } from "../event-store";
import { fillControllerElements, templateClone } from "../utils";

export function historyTodoListPanelController(di: Dependencies, events: DomainEvent[]): DocumentFragment {
    let fragment = templateClone("historyTodoListPanelTemplate");
    let todoList = new TodoList(events);
    fillControllerElements(fragment, "incompleteTodoListController", di.incompleteTodoListController(di, todoList.todos));
    fillControllerElements(fragment, "completedTodoListController", di.completedTodoListController(di, todoList.completedTodos));
    return fragment;
}

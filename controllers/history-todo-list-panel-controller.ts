import { Dependencies } from "../dependencies";
import { DomainEvent } from "../event-store";
import { templateClone, fillControllerElements } from "../utils";
import { TodoList } from "../domain/todo-list";

export function historyTodoListPanelController(di: Dependencies, events: DomainEvent[]): DocumentFragment {
    let fragment = templateClone("historyTodoListPanelTemplate");
    let todoList = new TodoList(events);
    fillControllerElements(fragment, "incompleteTodoListController", di.incompleteTodoListController(di, todoList.todos));
    fillControllerElements(fragment, "completedTodoListController", di.completedTodoListController(di, todoList.completedTodos));
    return fragment;
}
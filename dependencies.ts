import { CompletedTodo, Todo } from "./domain/todo";
import { AggregateIdType, DomainEvent } from "./event-store";

export interface Dependencies {
    bodyController(di: Dependencies, events: DomainEvent[]): DocumentFragment;
    todoListPanelController(di: Dependencies, events: DomainEvent[]): DocumentFragment;
    addTodoFormController(di: Dependencies, todoListId: AggregateIdType): DocumentFragment;
    incompleteTodoListController(di: Dependencies, todos: Todo[]): DocumentFragment;
    completedTodoListController(di: Dependencies, todos: CompletedTodo[]): DocumentFragment;
    todoListController(di: Dependencies, todos: (Todo | CompletedTodo)[]): DocumentFragment;
    todoListGroupController(di: Dependencies, todos: (Todo | CompletedTodo)[]): DocumentFragment;
    todoController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment;
    todoTitlePanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment;
    todoTitleController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment;
    todoActionsPanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment;
    todoActionsPanelButtonsController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment;
    todoRenamePanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment;
    eventListController(di: Dependencies, events: DomainEvent[]): DocumentFragment;
    eventListGroupController(di: Dependencies, events: DomainEvent[]): DocumentFragment;
    eventTextController(di: Dependencies, event: DomainEvent): DocumentFragment;
    refreshLists(di: Dependencies, todoListId: AggregateIdType): Promise<void>;
    refreshBody(di: Dependencies, todoListId: AggregateIdType): Promise<void>;
    historyTodoListPanelController(di: Dependencies, events: DomainEvent[]): DocumentFragment;
    historyTodoController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment;
    historyTodoTitlePanelController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment;
}

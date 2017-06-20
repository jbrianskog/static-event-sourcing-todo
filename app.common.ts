import { Dependencies } from "./dependencies";
import { AggregateIdType, domainEventsByAggregate } from "./event-store";
import { TodoList } from "./domain/todo-list";
import { fillControllerElements } from "./utils";
import { v4 as uuid } from "uuid";

export const todoIdDataAttrName = "data-estd-todo-id";
export const eventIdDataAttrName = "data-estd-event-id";

export function refreshLists(di: Dependencies, todoListId: AggregateIdType): Promise<void> {
    return domainEventsByAggregate(todoListId)
        .then(events => {
            let todoList = new TodoList(events);
            fillControllerElements(document, "incompleteTodoListController", di.incompleteTodoListController(di, todoList.todos));
            fillControllerElements(document, "completedTodoListController", di.completedTodoListController(di, todoList.completedTodos));
            fillControllerElements(document, "eventListController", di.eventListController(di, events));
        });
}

export function refreshBody(di: Dependencies, todoListId: AggregateIdType): Promise<void> {
    return domainEventsByAggregate(todoListId)
        .then(events => {
            fillControllerElements(document, "bodyController", di.bodyController(di, events));
        });
}

export function invalidNameInputHandler(e: JQueryEventObject) {
    let input = e.currentTarget as HTMLInputElement;
    let $input = $(input);
    let $form = $input.closest("form");
    let $button = $input.next().children("button");
    $form.addClass("has-error");
    $button.removeClass("btn-success").addClass("btn-danger");

    let validationEventNamespace = ".nameTodoInputValidation:" + uuid();
    function clearValidation() {
        $form.removeClass("has-error");
        $button.removeClass("btn-danger").addClass("btn-success");
        $form.off(validationEventNamespace);
        $input.off(validationEventNamespace);
    }
    $input.on("input" + validationEventNamespace, function (e) {
        if (input.validity.valid) {
            clearValidation();
        }
    });
    $form.on("focusout" + validationEventNamespace, function (e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            clearValidation();
        }
    });
}
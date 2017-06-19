import { allDomainEvents, AggregateIdType, domainEventsByAggregate } from "./event-store";
import { fillControllerElements } from "./utils";
import { TodoList } from "./domain/todo-list";
import { todoListPanelController } from "./controllers/todo-list-panel-controller";
import { completedTodoListPanelController } from "./controllers/completed-todo-list-panel-controller";
import { eventListController } from "./controllers/event-list-controller";

export const todoIdDataAttrName = "data-estd-todo-id";
export function refreshLists(todoListId: AggregateIdType): Promise<void> {
    return domainEventsByAggregate(todoListId)
        .then(events => {
            let todoList = new TodoList(events);
            fillControllerElements(document, "todoListPanelController", todoListPanelController(todoList.todos));
            fillControllerElements(document, "completedTodoListPanelController", completedTodoListPanelController(todoList.completedTodos));
            fillControllerElements(document, "eventListController", eventListController(events));
        });
}

export function invalidNameInputHandler(e: JQueryEventObject) {
    let input = e.currentTarget as HTMLInputElement;
    let $input = $(input);
    let $form = $input.closest("form");
    let $button = $input.next().children("button");
    $form.addClass("has-error");
    $button.removeClass("btn-success").addClass("btn-danger");

    let validationEventNamespace = ".nameTodoInputValidation:" + e.timeStamp.toString().replace(".", "");
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
        setTimeout(function () {
            if (!e.currentTarget.contains(document.activeElement)) {
                clearValidation();
            }
        }, 0);
    });
}
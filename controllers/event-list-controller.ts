import { templateClone, fillControllerElements, findElement, getRequiredAttribute } from "../utils";
import { DomainEvent } from "../event-store";
import { Dependencies } from "../dependencies";
import { eventIdDataAttrName } from "../app.common";
import { historyTodoController } from "./history-todo-controller";
import { v4 as uuid } from "uuid";

export function eventListController(di: Dependencies, events: DomainEvent[]): DocumentFragment {
    if (!events.length) {
        return templateClone("emptyEventListTemplate");
    }
    let todoListId = events[0].aggregateId;
    let fragment = templateClone("eventListTemplate");
    let historyDi = Object.assign({}, di);
    historyDi.todoController = historyTodoController;
    let eventListDelegatedEventTarget = findElement(fragment, "#eventListDelegatedEventTarget");
    let $eventListDelegatedEventTarget = $(eventListDelegatedEventTarget);
    $eventListDelegatedEventTarget.on("click", ".event-list-item", function (e) {
        let refreshBodyEventNamespace = ".activeEventFocusOut:" + uuid();
        // This handler will reset the body to the interactive todolist when the user clicks
        // anywhere in the document outside of the event list.
        $(document).on(`click${refreshBodyEventNamespace} keypress${refreshBodyEventNamespace}`, function (e2) {
            // Short-circuit when handler is triggered by event that created it
            // or when isn't an 'enter' keypress
            // or when the event-list-item contains the click target
            if (e.originalEvent === e2.originalEvent
                || (e2.type === "keypress" && e2.which !== 13)
                || e.currentTarget.contains(e2.target)) {
                return;
            }
            $(document).off(refreshBodyEventNamespace);
            if (!eventListDelegatedEventTarget.contains(e2.target)) {
                di.refreshBody(di, todoListId);
            }
        });
        let eventId = getRequiredAttribute(e.currentTarget, eventIdDataAttrName);
        let historyEvents = events.slice(0, parseInt(eventId));
        fillControllerElements(document, "todoListPanelController", historyDi.historyTodoListPanelController(historyDi, historyEvents));
    });
    fillControllerElements(fragment, "eventListGroupController", di.eventListGroupController(di, events));
    return fragment;
}
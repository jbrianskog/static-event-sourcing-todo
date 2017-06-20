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
        let eventNamespace = "focusout.activeEventFocusOut:" + uuid();
        $(e.currentTarget).on(eventNamespace, function (e2) {
            if (e2.currentTarget.contains(e2.relatedTarget)) {
                return;
            }
            $(e2.currentTarget).off(eventNamespace);
            if (!eventListDelegatedEventTarget.contains(e2.relatedTarget)) {
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
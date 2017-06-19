import { Dependencies } from "../dependencies";
import { DomainEvent } from "../event-store";
import { templateClone, fillControllerElements } from "../utils";

export function bodyController(di: Dependencies, events: DomainEvent[]): DocumentFragment {
    let fragment = templateClone("bodyTemplate");
    fillControllerElements(fragment, "todoListPanelController", di.todoListPanelController(di, events));
    fillControllerElements(fragment, "eventListController", di.eventListController(di, events));
    return fragment;
}
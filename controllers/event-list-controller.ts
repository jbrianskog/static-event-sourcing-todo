import { templateClone, fillControllerElements } from "../utils";
import { DomainEvent } from "../event-store";
import { eventListGroupController } from "./event-list-group-controller";

export function eventListController(events: DomainEvent[]): DocumentFragment {
    if (events.length) {
        let fragment = templateClone("eventListTemplate");
        fillControllerElements(fragment, "eventListGroupController", eventListGroupController(events));
        return fragment;
    } else {
        let fragment = templateClone("emptyEventListTemplate");
        return fragment;
    }
}
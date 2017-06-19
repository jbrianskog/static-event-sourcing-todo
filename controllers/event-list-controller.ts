import { templateClone, findControllerElement } from "../utils";
import { DomainEvent } from "../event-store";
import { eventListGroupController } from "./event-list-group-controller";

export function eventListController(events: DomainEvent[]): DocumentFragment {
    if (events.length) {
        let fragment = templateClone("eventListTemplate");
        findControllerElement(fragment, "eventListGroupController")
            .appendChild(eventListGroupController(events));
        return fragment;
    } else {
        let fragment = templateClone("emptyEventListTemplate");
        return fragment;
    }
}
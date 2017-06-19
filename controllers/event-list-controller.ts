import { templateClone, fillControllerElements } from "../utils";
import { DomainEvent } from "../event-store";
import { Dependencies } from "../dependencies";

export function eventListController(di: Dependencies, events: DomainEvent[]): DocumentFragment {
    if (events.length) {
        let fragment = templateClone("eventListTemplate");
        fillControllerElements(fragment, "eventListGroupController", di.eventListGroupController(di, events));
        return fragment;
    } else {
        let fragment = templateClone("emptyEventListTemplate");
        return fragment;
    }
}
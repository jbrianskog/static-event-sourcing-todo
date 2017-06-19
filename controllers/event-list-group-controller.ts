import { DomainEvent } from "../event-store";
import { templateClone, findControllerElement } from "../utils";
import { eventTextController } from "./event-text-controller";

export function eventListGroupController(events: DomainEvent[]): DocumentFragment {
    if (events.length) {
        let fragment = new DocumentFragment();
        events.forEach(e => {
            let listItemFragment = templateClone("eventListItemTemplate");
            findControllerElement(listItemFragment, "eventTextController")
                .appendChild(eventTextController(e));
            fragment.appendChild(listItemFragment);
        });
        return fragment;
    } else {
        let fragment = templateClone("emptyEventListTemplate");
        return fragment;
    }
}
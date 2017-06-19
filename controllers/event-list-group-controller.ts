import { DomainEvent } from "../event-store";
import { templateClone, fillControllerElements } from "../utils";
import { Dependencies } from "../dependencies";

export function eventListGroupController(di: Dependencies, events: DomainEvent[]): DocumentFragment {
    if (events.length) {
        let fragment = new DocumentFragment();
        events.forEach(e => {
            let listItemFragment = templateClone("eventListItemTemplate");
            fillControllerElements(listItemFragment, "eventTextController", di.eventTextController(di, e));
            fragment.appendChild(listItemFragment);
        });
        return fragment;
    } else {
        let fragment = templateClone("emptyEventListTemplate");
        return fragment;
    }
}
import { DomainEvent } from "../event-store";
import { templateClone, fillControllerElements, setAttrElements } from "../utils";
import { Dependencies } from "../dependencies";
import { eventIdDataAttrName } from "../app.common";

export function eventListGroupController(di: Dependencies, events: DomainEvent[]): DocumentFragment {
    if (events.length) {
        let fragment = document.createDocumentFragment();
        events.forEach(e => {
            let listItemFragment = templateClone("eventListItemTemplate");
            setAttrElements(listItemFragment, eventIdDataAttrName, e.id.toString());
            fillControllerElements(listItemFragment, "eventTextController", di.eventTextController(di, e));
            fragment.appendChild(listItemFragment);
        });
        return fragment;
    } else {
        let fragment = templateClone("emptyEventListTemplate");
        return fragment;
    }
}
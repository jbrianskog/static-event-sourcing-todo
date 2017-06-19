import { templateClone, fillContentElements } from "../utils";
import { DomainEvent } from "../event-store";

export function eventListController(events: DomainEvent[]): DocumentFragment {
    if (events.length) {
        let fragment = templateClone("eventListTemplate");
        fillContentElements(fragment, "eventListText", events.reduce<string>((p, c) => { return p + JSON.stringify(c) + "\n"; }, ""));
        return fragment;
    } else {
        let fragment = templateClone("emptyEventListTemplate");
        return fragment;
    }
}
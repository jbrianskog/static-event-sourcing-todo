import { Dependencies } from "../dependencies";
import { DomainEvent, DomainEventType } from "../event-store";

export function eventTextController(di: Dependencies, event: DomainEvent): DocumentFragment {
    let fragment = document.createDocumentFragment();
    fragment.textContent = `${event.id} : ${DomainEventType[event.type]}`;
    return fragment;
}

import { DomainEvent, DomainEventType } from "../event-store";
import { Dependencies } from "../dependencies";

export function eventTextController(di: Dependencies, event: DomainEvent): DocumentFragment {
    let fragment = new DocumentFragment();
    fragment.textContent = `${event.id} : ${DomainEventType[event.type]}`;
    return fragment;
}
import { DomainEvent, DomainEventType } from "../event-store";

export function eventTextController(event: DomainEvent): DocumentFragment {
    let fragment = new DocumentFragment();
    fragment.textContent = `${event.id} : ${DomainEventType[event.type]}`;
    return fragment;
}
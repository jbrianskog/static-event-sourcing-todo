import { AggregateIdType, allDomainEvents, DomainEvent, domainEventsByAggregate, DomainEventType } from "./event-store";

export function todoListEvents(): Promise<DomainEvent[]> {
    // This app's domain and event-store are designed to accommodate multiple aggregates of different types.
    // Currently, the app only has one aggregate type (TodoList) and only allows the user to have one instance of that aggregate.
    // This todoLists() lookup occurs to get the aggregateId of the user's one TodoList.
    return allDomainEvents()
        .then(events => {
            let lists = todoLists(events);
            return (lists.length)
                ? domainEventsByAggregate(lists[0])
                : [];
        });
}

function todoLists(events: DomainEvent[]): AggregateIdType[] {
    return events.reduce<AggregateIdType[]>((p, c) => {
        if (c.type === DomainEventType.TodoAdded && p.indexOf(c.aggregateId) === -1) {
            p.push(c.aggregateId);
        }
        return p;
    }, []);
}

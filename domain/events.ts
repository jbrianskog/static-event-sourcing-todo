import { AggregateIdType, DomainEventType, UncommittedDomainEvent } from "../event-store";
import { TodoIdType } from "./todo";

export class TodoAdded implements UncommittedDomainEvent {
    readonly type = DomainEventType.TodoAdded;
    constructor(
        readonly aggregateId: AggregateIdType,
        readonly todoId: TodoIdType,
        readonly todoName: string,
    ) { }
}

export class TodoRemoved implements UncommittedDomainEvent {
    readonly type = DomainEventType.TodoRemoved;
    constructor(
        readonly aggregateId: AggregateIdType,
        readonly todoId: TodoIdType,
    ) { }
}

export class TodoCompleted implements UncommittedDomainEvent {
    readonly type = DomainEventType.TodoCompleted;
    constructor(
        readonly aggregateId: AggregateIdType,
        readonly todoId: TodoIdType,
        readonly todoCompletionTimestamp: number,
    ) { }
}

export class TodoUncompleted implements UncommittedDomainEvent {
    readonly type = DomainEventType.TodoUncompleted;
    constructor(
        readonly aggregateId: AggregateIdType,
        readonly todoId: TodoIdType,
    ) { }
}

export class TodoRenamed implements UncommittedDomainEvent {
    readonly type = DomainEventType.TodoRenamed;
    constructor(
        readonly aggregateId: AggregateIdType,
        readonly todoId: TodoIdType,
        readonly todoName: string,
    ) { }
}

export class TodoPositionChanged implements UncommittedDomainEvent {
    readonly type = DomainEventType.TodoPositionChanged;
    constructor(
        readonly aggregateId: AggregateIdType,
        readonly todoId: TodoIdType,
        readonly todoOffset: number,
    ) { }
}

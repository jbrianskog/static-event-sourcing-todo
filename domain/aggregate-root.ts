import { AggregateIdType, DomainEvent, DomainEventType, UncommittedDomainEvent } from "../event-store";

export type DomainEventHandler = (e: UncommittedDomainEvent) => void;

export abstract class AggregateRoot {
    [key: string]: any;
    private _uncommittedEvents: UncommittedDomainEvent[];
    get uncommittedEvents(): UncommittedDomainEvent[] {
        return this._uncommittedEvents;
    }
    protected _id: AggregateIdType;
    get id(): AggregateIdType {
        return this._id;
    }
    protected init(): void {
        this._uncommittedEvents = new Array<UncommittedDomainEvent>();
    }
    constructor(events: DomainEvent[]) {
        this.init();
        for (const e of events) {
            (this[DomainEventType[e.type]] as DomainEventHandler)(e);
        }
    }
    protected applyAndStage(e: UncommittedDomainEvent): void {
        (this[DomainEventType[e.type]] as DomainEventHandler)(e);
        this._uncommittedEvents.push(e);
    }
}

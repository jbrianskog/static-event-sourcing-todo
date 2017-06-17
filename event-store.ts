import idb, { DB } from "idb";

export enum DomainEventType {
    TodoAdded,
    TodoRemoved,
    TodoCompleted,
    TodoUncompleted,
    TodoRenamed,
    TodoPositionChanged
}
export type AggregateIdType = string;
export interface UncommittedDomainEvent {
    readonly aggregateId: AggregateIdType;
    readonly type: DomainEventType;
}
export interface DomainEvent extends UncommittedDomainEvent {
    readonly id: number;
}
export interface EventStore {
    getAllDomainEvents(version?: number): Promise<DomainEvent[]>;
    getDomainEventsByAggregate(aggregateId: AggregateIdType, version?: number): Promise<DomainEvent[]>;
    postDomainEvents(events: UncommittedDomainEvent[]): Promise<void>;
}

const dbName = "estd-db";
const domainEventStoreName = "domain-event";
const aggregateIdPropName = "aggregateId";
const eventIdPropName = "id";

function open(): Promise<DB> {
    return idb.open(dbName, 1, db => {
        switch (db.oldVersion) {
            case 0:
                db.createObjectStore(domainEventStoreName, { autoIncrement: true, keyPath: eventIdPropName })
                    .createIndex(aggregateIdPropName, aggregateIdPropName);
        }
    }).catch(reason => {
        alert("Database error: " + reason);
    });
}
export function allDomainEvents(version?: number): Promise<DomainEvent[]> {
    return open().then(db => {
        let store = db.transaction(domainEventStoreName).objectStore(domainEventStoreName);
        return (version)
            ? store.getAll(IDBKeyRange.upperBound(version))
            : store.getAll();
    }).catch(reason => {
        alert("Database error: " + reason);
    });
}
export function domainEventsByAggregate(aggregateId: AggregateIdType, version?: number): Promise<DomainEvent[]> {
    return open().then(db => {
        let index = db.transaction(domainEventStoreName).objectStore(domainEventStoreName).index(aggregateIdPropName);
        let eventsPromise = index.getAll(aggregateId) as Promise<DomainEvent[]>;
        return (version)
            ? eventsPromise.then(events => events.filter(e => e.id <= version))
            : eventsPromise;
    }).catch(reason => {
        alert("Database error: " + reason);
    });
}
export function postDomainEvents(events: UncommittedDomainEvent[]): Promise<void> {
    return open().then(db => {
        let tx = db.transaction(domainEventStoreName, "readwrite");
        let store = tx.objectStore(domainEventStoreName);
        events.forEach(x => store.add(x));
        return tx.complete;
    }).catch(reason => {
        alert("Database error: " + reason);
    });
}
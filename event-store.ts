import idb, { Cursor, DB } from "idb";

export enum DomainEventType {
    TodoAdded,
    TodoRemoved,
    TodoCompleted,
    TodoUncompleted,
    TodoRenamed,
    TodoPositionChanged,
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

async function open(): Promise<DB> {
    return await idb.open(dbName, 1, db => {
        switch (db.oldVersion) {
            case 0:
                db.createObjectStore(domainEventStoreName, { autoIncrement: true, keyPath: eventIdPropName })
                    .createIndex(aggregateIdPropName, aggregateIdPropName);
        }
    });
}
export async function allDomainEvents(version?: number): Promise<DomainEvent[]> {
    let db = await open();
    let events = [] as DomainEvent[];
    let tx = db.transaction(domainEventStoreName);
    let store = tx.objectStore(domainEventStoreName);
    function cursorCallback(cursor: Cursor): void {
        if (!cursor) {
            return;
        }
        events.push(cursor.value as DomainEvent);
        // tslint:disable-next-line:no-floating-promises
        cursor.continue();
    }
    // iterateCursor() should be replaced with usage of openCursor() when "idb" decides it is safe to do so.
    if (version) {
        store.iterateCursor(IDBKeyRange.upperBound(version), cursorCallback);
    } else {
        store.iterateCursor(cursorCallback);
    }
    await tx.complete;
    return events;
}
export async function domainEventsByAggregate(aggregateId: AggregateIdType, version?: number): Promise<DomainEvent[]> {
    let db = await open();
    let events = [] as DomainEvent[];
    let tx = db.transaction(domainEventStoreName);
    let index = tx.objectStore(domainEventStoreName).index(aggregateIdPropName);
    function cursorCallback(cursor: Cursor): void {
        if (!cursor) {
            return;
        }
        let event = cursor.value as DomainEvent;
        if (!version || event.id <= version) {
            events.push(event);
        }
        // tslint:disable-next-line:no-floating-promises
        cursor.continue();
    }
    // iterateCursor() should be replaced with usage of openCursor() when "idb" decides it is safe to do so.
    index.iterateCursor(aggregateId, cursorCallback);
    await tx.complete;
    return events;
}
export async function postDomainEvents(events: UncommittedDomainEvent[]): Promise<void> {
    let db = await open();
    let tx = db.transaction(domainEventStoreName, "readwrite");
    let store = tx.objectStore(domainEventStoreName);
    let addPromises = [];
    for (const e of events) {
        addPromises.push(store.add(e));
    }
    await Promise.all(addPromises);
    await tx.complete;
}

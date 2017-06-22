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

function open(): Promise<DB> {
    return idb.open(dbName, 1, db => {
        switch (db.oldVersion) {
            case 0:
                db.createObjectStore(domainEventStoreName, { autoIncrement: true, keyPath: eventIdPropName })
                    .createIndex(aggregateIdPropName, aggregateIdPropName);
        }
    });
}
export function allDomainEvents(version?: number): Promise<DomainEvent[]> {
    return open().then(db => {
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
        // iterateCursor() should be replace with usage of openCursor() when "idb" decides it is safe to do so.
        if (version) {
            store.iterateCursor(IDBKeyRange.upperBound(version), cursorCallback);
        } else {
            store.iterateCursor(cursorCallback);
        }
        return tx.complete.then(() => events);
    });
}

export function domainEventsByAggregate(aggregateId: AggregateIdType, version?: number): Promise<DomainEvent[]> {
    return open().then(db => {
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
        // iterateCursor() should be replace with usage of openCursor() when "idb" decides it is safe to do so.
        index.iterateCursor(cursorCallback);
        return tx.complete.then(() => events);
    });
}
export function postDomainEvents(events: UncommittedDomainEvent[]): Promise<void> {
    return open().then(db => {
        let tx = db.transaction(domainEventStoreName, "readwrite");
        let store = tx.objectStore(domainEventStoreName);
        events.forEach(x => store.add(x));
        return tx.complete;
    });
}

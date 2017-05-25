namespace StaticEventSourcedTodo {

    export interface Event {
        readonly kind: string;
    }

    export class TodoAdded implements Event {
        readonly kind = "TodoAdded";
        constructor(
            readonly id: TodoIdType,
            readonly title: string
        ) { }
    }

    export class TodoRemoved implements Event {
        readonly kind = "TodoRemoved";
        constructor(
            readonly id: TodoIdType
        ) { }
    }

    export class TodoCompleted implements Event {
        readonly kind = "TodoCompleted";
        constructor(
            readonly id: TodoIdType,
            readonly CompletionDate: Date
        ) { }
    }

    export class TodoUncompleted implements Event {
        readonly kind = "TodoUncompleted";
        constructor(
            readonly id: TodoIdType
        ) { }
    }

    export class TodoTitleChanged implements Event {
        readonly kind = "TodoTitleChanged";
        constructor(
            readonly id: TodoIdType,
            readonly title: string
        ) { }
    }

    export class TodoPositionChanged implements Event {
        readonly kind = "TodoPositionChanged";
        constructor(
            readonly id: TodoIdType,
            readonly offset: number
        ) { }
    }
}
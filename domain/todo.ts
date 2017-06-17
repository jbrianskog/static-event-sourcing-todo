export type TodoIdType = string;

export class Todo {
    readonly isCompleted: boolean = false;
    constructor(
        readonly id: TodoIdType,
        public name: string
    ) { }
}

export class CompletedTodo extends Todo {
    readonly isCompleted: boolean = true;
    constructor(
        id: TodoIdType,
        name: string,
        readonly completionTimestamp: number
    ) {
        super(id, name);
    }
}
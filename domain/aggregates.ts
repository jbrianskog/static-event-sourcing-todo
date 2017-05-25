/// <reference path="events.ts" />

namespace StaticEventSourcedTodo {
    
    type AggregateIdType = string;
    export type TodoIdType = string;

    interface Repository {
        events(aggregateId: AggregateIdType): Event[];
        save(events: Event[]): void;
    }

    interface EventHandlerDictionary {
        [kind: string]: (e: Event) => void;
    }

    abstract class AggregateRoot {
        private handlers: EventHandlerDictionary = {};
        private uncommittedEvents: Event[];
        constructor(private repo: Repository, id: AggregateIdType, handlers: EventHandlerDictionary) {
            Object.assign(this.handlers, handlers);
            repo.events(id).forEach(e => {
                this.handlers[e.kind](e);
            });
        }
        protected applyAndStage(e: Event) {
            this.handlers[e.kind](e);
            this.uncommittedEvents.push(e);
        }
        commit() {
            this.repo.save(this.uncommittedEvents);
        }
    }

    class TodoList extends AggregateRoot {
        protected todos: (Todo | CompletedTodo)[] = [];
        constructor(repo: Repository, id: AggregateIdType, handlers: EventHandlerDictionary = {}) {
            super(repo, id, Object.assign({
                TodoAdded: (e: TodoAdded) => {
                    this.todos.push(new Todo(e.id, e.title))
                },
                TodoRemoved: (e: TodoRemoved) => {
                    let i = this.todos.findIndex(x => x.id === e.id);
                    if (i !== -1) {
                        this.todos.splice(i, 1)
                    }
                },
                TodoCompleted: (e: TodoCompleted) => {
                    let i = this.todos.findIndex(x => x.id === e.id);
                    if (i !== -1) {
                        let oldTodo = this.todos[i];
                        let newTodo = new CompletedTodo(oldTodo.id, oldTodo.title, e.CompletionDate);
                        this.todos[i] = newTodo;
                    }
                },
                TodoUncompleted: (e: TodoUncompleted) => {
                    let i = this.todos.findIndex(x => x.id === e.id);
                    if (i !== -1) {
                        let oldTodo = this.todos[i];
                        let newTodo = new Todo(oldTodo.id, oldTodo.title);
                        this.todos[i] = newTodo;
                    }
                },
                TodoTitleChanged: (e: TodoTitleChanged) => {
                    let todo = this.todos.find(x => x.id === e.id);
                    if (todo) {
                        todo.title = e.title;
                    }
                },
                TodoPositionChanged: (e: TodoPositionChanged) => {
                    let from = this.todos.findIndex(x => x.id === e.id);
                    if (from === -1) {
                        return;
                    }
                    let to = from + e.offset;
                    if (to < 0) {
                        to = 0;
                    } else if (to > this.todos.length - 1) {
                        to = this.todos.length - 1;
                    }
                    if (from === to) {
                        return;
                    }
                    if (to < from)
                    {
                        for (let i = to; i < from; i++) {
                            arraySwap(this.todos, from, i);
                        }
                    } else {
                        for (let i = to; i > from; i--) {
                            arraySwap(this.todos, from, i);
                        }
                    }
                    function arraySwap(arr: Array<any>, x: number, y: number) {
                        let a = arr[x];
                        arr[x] = arr[y];
                        arr[y] = a;
                    }
                }
            }, handlers));
        }
        add(id: TodoIdType, title: string) {
            this.applyAndStage(new TodoAdded(id, title));
        }
        remove(id: TodoIdType) {
            this.applyAndStage(new TodoRemoved(id));
        }
        complete(id: TodoIdType, completionDate: Date) {
            this.applyAndStage(new TodoCompleted(id, completionDate));
        }
        uncomplete(id: TodoIdType) {
            this.applyAndStage(new TodoUncompleted(id));
        }
        changeTitle(id: TodoIdType, title: string) {
            this.applyAndStage(new TodoTitleChanged(id, title));
        }
        changePosition(id: TodoIdType, offset: number) {
            this.applyAndStage(new TodoPositionChanged(id, offset));
        }
    }

    class Todo {
        readonly isCompleted: boolean = false;
        constructor(
            readonly id: TodoIdType,
            public title: string
        ) { }
    }

    class CompletedTodo extends Todo {
        readonly isCompleted: boolean = true;
        constructor(
            id: TodoIdType,
            title: string,
            readonly completionDate: Date
        ) {
            super(id, title);
        }
    }
}
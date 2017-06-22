import { v4 as uuid } from "uuid";
import { AggregateRoot } from "./aggregate-root";
import { TodoAdded, TodoCompleted, TodoPositionChanged, TodoRemoved, TodoRenamed, TodoUncompleted } from "./events";
import { CompletedTodo, Todo, TodoIdType } from "./todo";

export class TodoList extends AggregateRoot {
    protected _todos: (Todo | CompletedTodo)[];
    get todos(): Todo[] {
        return this._todos.filter(x => !x.isCompleted);
    }
    get completedTodos(): CompletedTodo[] {
        return (this._todos.filter(x => x.isCompleted) as CompletedTodo[])
            .sort((x, y) => {
                return y.completionTimestamp - x.completionTimestamp;
            });
    }
    protected init(): void {
        super.init();
        this._todos = [];
    }

    // Domain Event Handlers
    protected TodoAdded(e: TodoAdded): void {
        if (!this.id) {
            this._id = e.aggregateId;
        }
        this._todos.push(new Todo(e.todoId, e.todoName));
    }
    protected TodoRemoved(e: TodoRemoved): void {
        let i = this._todos.findIndex(x => x.id === e.todoId);
        if (i !== -1) {
            this._todos.splice(i, 1);
        }
    }
    protected TodoCompleted(e: TodoCompleted): void {
        let i = this._todos.findIndex(x => x.id === e.todoId);
        if (i !== -1) {
            let oldTodo = this._todos[i];
            let newTodo = new CompletedTodo(oldTodo.id, oldTodo.name, e.todoCompletionTimestamp);
            this._todos[i] = newTodo;
        }
    }
    protected TodoUncompleted(e: TodoUncompleted): void {
        let i = this._todos.findIndex(x => x.id === e.todoId);
        if (i !== -1) {
            let oldTodo = this._todos[i];
            let newTodo = new Todo(oldTodo.id, oldTodo.name);
            this._todos[i] = newTodo;
        }
    }
    protected TodoRenamed(e: TodoRenamed): void {
        let todo = this._todos.find(x => x.id === e.todoId);
        if (todo) {
            todo.name = e.todoName;
        }
    }
    protected TodoPositionChanged(e: TodoPositionChanged): void {
        let incompleteTodoPositions: number[] = this._todos.reduce<number[]>((p, c, i) => {
            if (!c.isCompleted) {
                p.push(i);
            }
            return p;
        }, new Array<number>());
        let from = incompleteTodoPositions.findIndex(x => this._todos[x].id === e.todoId);
        if (from === -1) {
            return;
        }
        let to = from + e.todoOffset;
        if (to < 0) {
            to = 0;
        } else if (to > incompleteTodoPositions.length - 1) {
            to = incompleteTodoPositions.length - 1;
        }
        if (from === to) {
            return;
        }
        if (to < from) {
            for (let i = to; i < from; i++) {
                arraySwap(this._todos, incompleteTodoPositions[from], incompleteTodoPositions[i]);
            }
        } else {
            for (let i = to; i > from; i--) {
                arraySwap(this._todos, incompleteTodoPositions[from], incompleteTodoPositions[i]);
            }
        }
        function arraySwap(arr: Array<any>, x: number, y: number) {
            let a = arr[x];
            arr[x] = arr[y];
            arr[y] = a;
        }
    }

    add(id: TodoIdType, name: string) {
        let agId = this.id || uuid();
        this.applyAndStage(new TodoAdded(agId, id, name));
    }
    remove(id: TodoIdType) {
        this.applyAndStage(new TodoRemoved(this.id, id));
    }
    complete(id: TodoIdType, completionTimestamp: number) {
        this.applyAndStage(new TodoCompleted(this.id, id, completionTimestamp));
    }
    uncomplete(id: TodoIdType) {
        this.applyAndStage(new TodoUncompleted(this.id, id));
    }
    rename(id: TodoIdType, name: string) {
        this.applyAndStage(new TodoRenamed(this.id, id, name));
    }
    changePosition(id: TodoIdType, offset: number) {
        this.applyAndStage(new TodoPositionChanged(this.id, id, offset));
    }
}

import * as React from "react";
import { CompletedTodo, TodoIdType } from "../domain/todo";
import { CompletedTodoListItem } from "./completed-todo-list-item";

export interface CompletedTodoListProps {
  todos: CompletedTodo[];
  uncompleteTodo(id: TodoIdType): void;
  deleteTodo(id: TodoIdType): void;
  renameTodo(id: TodoIdType, name: string): void;
}

export class CompletedTodoList extends React.PureComponent<CompletedTodoListProps> {
  render() {
    return (
      <div className="list-group">
        {this.props.todos.map(todo =>
          <CompletedTodoListItem
            key={todo.id}
            todo={todo}
            uncompleteTodo={this.props.uncompleteTodo}
            deleteTodo={this.props.deleteTodo}
            renameTodo={this.props.renameTodo}
          />)}
      </div>
    );
  }
}

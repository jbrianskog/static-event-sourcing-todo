import * as React from "react";
import { Todo } from "../domain/todo";
import { HistoryTodoListItem } from "./history-todo-list-item";

export interface HistoryTodoListProps {
  todos: Todo[];
}

export class HistoryTodoList extends React.PureComponent<HistoryTodoListProps> {
  render() {
    return (
      <div className="list-group">
        {this.props.todos.map(todo =>
          <HistoryTodoListItem
            key={todo.id}
            todo={todo}
          />)}
      </div>
    );
  }
}

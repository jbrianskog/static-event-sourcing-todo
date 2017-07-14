import * as React from "react";
import { CompletedTodo } from "../domain/todo";
import { HistoryCompletedTodoListItem } from "./history-completed-todo-list-item";

export interface HistoryCompletedTodoListProps {
  todos: CompletedTodo[];
}

export class HistoryCompletedTodoList extends React.PureComponent<HistoryCompletedTodoListProps> {
  render() {
    return (
      <div className="list-group">
        {this.props.todos.map(todo =>
          <HistoryCompletedTodoListItem
            key={todo.id}
            todo={todo}
          />)}
      </div>
    );
  }
}

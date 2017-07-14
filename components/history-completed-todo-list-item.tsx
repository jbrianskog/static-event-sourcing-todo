import * as React from "react";
import { CompletedTodo } from "../domain/todo";
import { CompletedTodoTitle } from "./completed-todo-title";

export interface HistoryCompletedTodoListItemProps {
  todo: CompletedTodo;
}

export class HistoryCompletedTodoListItem extends React.PureComponent<HistoryCompletedTodoListItemProps> {
  render() {
    return (
      <div className="list-group-item list-group-item-success">
        <div className="todo-list-todo-panel">
          <CompletedTodoTitle title={this.props.todo.name} completionDate={new Date(this.props.todo.completionTimestamp)} />
        </div>
      </div>
    );
  }
}

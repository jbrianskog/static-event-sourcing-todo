import * as React from "react";
import { TodoTitle } from "./todo-title";

export interface CompletedTodoTitleProps {
  title: string;
  completionDate: Date;
}

export class CompletedTodoTitle extends React.PureComponent<CompletedTodoTitleProps> {
  render() {
    return (
      <div className="todo-list-todo-title">
        {this.props.title}<br />
        <small>Completed on {this.props.completionDate.toLocaleDateString()}</small>
      </div>
    );
  }
}

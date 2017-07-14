import * as React from "react";

export interface TodoTitleProps {
  title: string;
}

export class TodoTitle extends React.PureComponent<TodoTitleProps> {
  render() {
    return (
      <div className="todo-list-todo-title">{this.props.title}</div>
    );
  }
}

import * as React from "react";
import { Todo } from "../domain/todo";
import { TodoRenameForm } from "./todo-rename-form";

export interface TodoRenamePanelProps {
  todo: Todo;
  renameTodo(name: string): void;
  showDefaultPanel(): void;
}

export class TodoRenamePanel extends React.PureComponent<TodoRenamePanelProps> {
  render() {
    return (
      <div className="list-group-item">
        <TodoRenameForm {...this.props} />
      </div>
    );
  }
}

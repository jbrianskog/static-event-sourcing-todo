import * as React from "react";
import { Todo } from "../domain/todo";
import { TodoRenameForm } from "./todo-rename-form";

export interface CompletedTodoRenamePanelProps {
  todo: Todo;
  renameTodo(name: string): void;
  showDefaultPanel(): void;
}

export class CompletedTodoRenamePanel extends React.PureComponent<CompletedTodoRenamePanelProps> {
  render() {
    return (
      <div className="list-group-item list-group-item-success">
        <TodoRenameForm {...this.props} />
      </div>
    );
  }
}

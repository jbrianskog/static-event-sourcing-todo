import * as React from "react";
import { Todo } from "../domain/todo";
import { TodoActionsPanelBtnGroup } from "./todo-actions-panel-btn-group";
import { TodoDeleteBtn } from "./todo-delete-btn";
import { TodoMoveDownBtn } from "./todo-move-down-btn";
import { TodoMoveUpBtn } from "./todo-move-up-btn";
import { TodoRenameBtn } from "./todo-rename-btn";
import { TodoTitle } from "./todo-title";

export interface TodoActionsPanelProps {
  todo: Todo;
  deleteTodo(): void;
  moveTodoUp(): void;
  moveTodoDown(): void;
  showDefaultPanel(): void;
  showRenamePanel(): void;
}

export class TodoActionsPanel extends React.PureComponent<TodoActionsPanelProps> {
  render() {
    return (
      <div className="list-group-item">
        <div className="todo-list-todo-panel">
          <TodoTitle title={this.props.todo.name} />
          <TodoActionsPanelBtnGroup showDefaultPanel={this.props.showDefaultPanel}>
            <TodoDeleteBtn deleteTodo={this.props.deleteTodo} />
            <TodoMoveUpBtn moveTodoUp={this.props.moveTodoUp} />
            <TodoMoveDownBtn moveTodoDown={this.props.moveTodoDown} />
            <TodoRenameBtn showRenamePanel={this.props.showRenamePanel} />
          </TodoActionsPanelBtnGroup>
        </div>
      </div>
    );
  }
}

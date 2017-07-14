import * as React from "react";
import { findDOMNode } from "react-dom";
import { Todo } from "../domain/todo";
import { TodoPanelBtnGroup } from "./todo-panel-btn-group";
import { TodoTitle } from "./todo-title";

export interface TodoPanelProps {
  todo: Todo;
  completeTodo(): void;
  showActionsPanel(): void;
}

export class TodoPanel extends React.PureComponent<TodoPanelProps> {
  btnGroup: HTMLElement;
  btnGroupRef: React.Ref<TodoPanelBtnGroup> = comp => {
    if (comp) {
      this.btnGroup = findDOMNode(comp);
    }
  }
  onClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
    if (!this.btnGroup.contains(e.target as HTMLElement)) {
      this.props.completeTodo();
    }
  }
  render() {
    return (
      <a onClick={this.onClick} className="list-group-item">
        <div className="todo-list-todo-panel">
          <TodoTitle title={this.props.todo.name} />
          <TodoPanelBtnGroup
            ref={this.btnGroupRef}
            showActionsPanel={this.props.showActionsPanel} />
        </div>
      </a>
    );
  }
}

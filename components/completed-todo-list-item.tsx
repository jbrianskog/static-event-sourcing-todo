import * as React from "react";
import { CompletedTodo, TodoIdType } from "../domain/todo";
import { CompletedTodoActionsPanel } from "./completed-todo-actions-panel";
import { CompletedTodoPanel } from "./completed-todo-panel";
import { CompletedTodoRenamePanel } from "./completed-todo-rename-panel";

export interface CompletedTodoListItemProps {
  todo: CompletedTodo;
  uncompleteTodo(id: TodoIdType): void;
  deleteTodo(id: TodoIdType): void;
  renameTodo(id: TodoIdType, name: string): void;
}

enum PanelType {
  DefaultPanel,
  ActionsPanel,
  RenamePanel,
}

interface CompletedTodoListItemState {
  panel: PanelType;
}

export class CompletedTodoListItem extends React.PureComponent<CompletedTodoListItemProps, CompletedTodoListItemState> {
  constructor(props: CompletedTodoListItemProps) {
    super(props);
    this.state = {
      panel: PanelType.DefaultPanel
    };
  }
  uncompleteTodo = () => {
    this.props.uncompleteTodo(this.props.todo.id);
  }
  deleteTodo = () => {
    this.props.deleteTodo(this.props.todo.id);
  }
  renameTodo = (name: string) => {
    this.props.renameTodo(this.props.todo.id, name);
  }
  showDefaultPanel = () => {
    this.setState({
      panel: PanelType.DefaultPanel
    });
  }
  showActionsPanel = () => {
    this.setState({
      panel: PanelType.ActionsPanel
    });
  }
  showRenamePanel = () => {
    this.setState({
      panel: PanelType.RenamePanel
    });
  }
  render() {
    let panel: JSX.Element | null;
    switch (this.state.panel) {
      case PanelType.DefaultPanel: {
        panel =
          <CompletedTodoPanel
            todo={this.props.todo}
            uncompleteTodo={this.uncompleteTodo}
            showActionsPanel={this.showActionsPanel}
          />;
        break;
      }
      case PanelType.ActionsPanel: {
        panel =
          <CompletedTodoActionsPanel
            todo={this.props.todo}
            deleteTodo={this.deleteTodo}
            showDefaultPanel={this.showDefaultPanel}
            showRenamePanel={this.showRenamePanel}
          />;
        break;
      }
      case PanelType.RenamePanel: {
        panel =
          <CompletedTodoRenamePanel
            todo={this.props.todo}
            renameTodo={this.renameTodo}
            showDefaultPanel={this.showDefaultPanel}
          />;
        break;
      }
      default: {
        panel = null;
        break;
      }
    }
    return panel;
  }
}

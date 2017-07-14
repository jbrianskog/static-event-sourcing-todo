import * as React from "react";
import OnClickOut, { InjectedOnClickOutProps } from "react-onclickoutside";

export interface TodoActionsPanelBtnGroupProps {
  showDefaultPanel(): void;
}

class TodoActionsPanelBtnGroupInner extends React.PureComponent<TodoActionsPanelBtnGroupProps & InjectedOnClickOutProps> {
  handleClickOutside = () => {
    this.props.showDefaultPanel();
  }
  render() {
    return (
      <div className="todo-list-todo-btn-group">
        <div className="btn-group" role="group">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const TodoActionsPanelBtnGroup = OnClickOut<TodoActionsPanelBtnGroupProps>(TodoActionsPanelBtnGroupInner);

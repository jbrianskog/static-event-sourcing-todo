import * as React from "react";

export interface TodoPanelBtnGroupProps {
  showActionsPanel(): void;
}

export class TodoPanelBtnGroup extends React.PureComponent<TodoPanelBtnGroupProps> {
  render() {
    return (
      <div className="todo-list-todo-btn-group">
        <button onClick={this.props.showActionsPanel} type="button" className="btn btn-link" aria-label="Actions">
          <span className="glyphicon glyphicon-cog" aria-hidden="true" />
        </button>
      </div>
    );
  }
}

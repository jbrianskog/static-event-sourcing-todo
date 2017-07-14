import * as React from "react";

export interface TodoMoveDownBtnProps {
  moveTodoDown(): void;
}

export class TodoMoveDownBtn extends React.PureComponent<TodoMoveDownBtnProps> {
  render() {
    return (
      <button onClick={this.props.moveTodoDown} type="button" className="btn btn-link" aria-label="Move down">
        <span className="glyphicon glyphicon-chevron-down" aria-hidden="true" />
      </button>
    );
  }
}

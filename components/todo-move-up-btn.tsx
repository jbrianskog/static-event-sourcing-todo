import * as React from "react";

export interface TodoMoveUpBtnProps {
  moveTodoUp(): void;
}

export class TodoMoveUpBtn extends React.PureComponent<TodoMoveUpBtnProps> {
  render() {
    return (
      <button onClick={this.props.moveTodoUp} type="button" className="btn btn-link" aria-label="Move up">
        <span className="glyphicon glyphicon-chevron-up" aria-hidden="true" />
      </button>
    );
  }
}

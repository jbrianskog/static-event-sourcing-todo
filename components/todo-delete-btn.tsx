import * as React from "react";

export interface TodoDeleteBtnProps {
  deleteTodo(): void;
}

export class TodoDeleteBtn extends React.PureComponent<TodoDeleteBtnProps> {
  render() {
    return (
      <button onClick={this.props.deleteTodo} type="button" className="btn btn-link" aria-label="Delete">
        <span className="glyphicon glyphicon-trash" aria-hidden="true" />
      </button>
    );
  }
}

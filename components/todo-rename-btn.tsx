import * as React from "react";

export interface TodoRenameBtnProps {
  showRenamePanel(): void;
}

export class TodoRenameBtn extends React.PureComponent<TodoRenameBtnProps> {
  render() {
    return (
      <button onClick={this.props.showRenamePanel} type="button" className="btn btn-link"  aria-label="Rename">
        <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
      </button>
    );
  }
}

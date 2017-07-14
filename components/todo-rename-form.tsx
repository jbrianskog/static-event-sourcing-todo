import * as React from "react";
import OnClickOut, { InjectedOnClickOutProps } from "react-onclickoutside";
import { Todo } from "../domain/todo";

export interface TodoRenameFormProps {
  todo: Todo;
  renameTodo(name: string): void;
  showDefaultPanel(): void;
}

interface TodoRenameFormState {
  value: string;
}

class TodoRenameFormInner extends React.PureComponent<TodoRenameFormProps & InjectedOnClickOutProps, TodoRenameFormState> {
  constructor(props: TodoRenameFormProps & InjectedOnClickOutProps) {
    super(props);
    this.state = {
      value: this.props.todo.name,
    };
  }
  handleClickOutside = () => {
    this.props.showDefaultPanel();
  }
  onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ value: e.target.value });
  }
  onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    this.props.renameTodo(this.state.value);
    this.props.showDefaultPanel();
  }
  render() {
    let inputId = "todoRenameInput-" + this.props.todo.id;
    return (
      <form role="form" onSubmit={this.onSubmit}>
        <label htmlFor={inputId} className="sr-only">New Name</label>
        <div className="input-group">
          <input id={inputId} name="name" type="text" className="form-control" onChange={this.onChange} value={this.state.value} required />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-success" aria-label="Rename To-do">
              <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
            </button>
          </span>
        </div>
      </form>
    );
  }
}

export const TodoRenameForm = OnClickOut<TodoRenameFormProps>(TodoRenameFormInner);

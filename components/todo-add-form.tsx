import * as React from "react";

export interface TodoAddFormProps {
  addTodo(name: string): void;
}

interface TodoAddFormState {
  value: string;
}

export class TodoAddForm extends React.PureComponent<TodoAddFormProps, TodoAddFormState> {
  constructor(props: TodoAddFormProps) {
    super(props);
    this.state = {
      value: "",
    };
  }
  reset = () => {
    this.setState({ value: "" });
  }
  onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ value: e.target.value });
  }
  onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    this.props.addTodo(this.state.value);
    this.reset();
  }
  render() {
    let inputId = "todoAddInput";
    return (
      <form role="form" onSubmit={this.onSubmit}>
        <label htmlFor={inputId} className="sr-only">New To-do Name</label>
        <div className="input-group">
          <input id={inputId} name="name" type="text" className="form-control" placeholder="What do you need to do?" onChange={this.onChange} value={this.state.value} required />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-success" aria-label="Add To-do">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
          </span>
        </div>
      </form>
    );
  }
}

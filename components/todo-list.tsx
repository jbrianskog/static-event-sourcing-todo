import * as React from "react";
import { Todo, TodoIdType } from "../domain/todo";
import { TodoListItem } from "./todo-list-item";

export interface TodoListProps {
  todos: Todo[];
  completeTodo(id: TodoIdType): void;
  deleteTodo(id: TodoIdType): void;
  moveTodoUp(id: TodoIdType): void;
  moveTodoDown(id: TodoIdType): void;
  renameTodo(id: TodoIdType, name: string): void;
}

export class TodoList extends React.PureComponent<TodoListProps> {
  render() {
    return (
      <div className="list-group">
        {this.props.todos.map(todo =>
          <TodoListItem
            key={todo.id}
            todo={todo}
            completeTodo={this.props.completeTodo}
            deleteTodo={this.props.deleteTodo}
            moveTodoUp={this.props.moveTodoUp}
            moveTodoDown={this.props.moveTodoDown}
            renameTodo={this.props.renameTodo}
          />)}
      </div>
    );
  }
}

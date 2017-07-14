import * as React from "react";
import { CompletedTodo, Todo, TodoIdType } from "../domain/todo";
import { CompletedTodoList } from "./completed-todo-list";
import { TodoAddForm } from "./todo-add-form";
import { TodoList } from "./todo-list";

export interface TodoListPanelProps {
  todos: Todo[];
  completedTodos: CompletedTodo[];
  addTodo(name: string): void;
  completeTodo(id: TodoIdType): void;
  uncompleteTodo(id: TodoIdType): void;
  deleteTodo(id: TodoIdType): void;
  moveTodoUp(id: TodoIdType): void;
  moveTodoDown(id: TodoIdType): void;
  renameTodo(id: TodoIdType, name: string): void;
}

export class TodoListPanel extends React.PureComponent<TodoListPanelProps> {
  render() {
    return (
      <div>
        <TodoAddForm addTodo={this.props.addTodo} />
        <br />
        <h3 className="sr-only">To-dos</h3>
        <TodoList
          todos={this.props.todos}
          completeTodo={this.props.completeTodo}
          deleteTodo={this.props.deleteTodo}
          moveTodoUp={this.props.moveTodoUp}
          moveTodoDown={this.props.moveTodoDown}
          renameTodo={this.props.renameTodo}
        />
        {this.props.completedTodos.length
          ? <div>
            <h3 className="sr-only">Completed To-dos</h3>
            <CompletedTodoList
              todos={this.props.completedTodos}
              uncompleteTodo={this.props.uncompleteTodo}
              deleteTodo={this.props.deleteTodo}
              renameTodo={this.props.renameTodo}
            />
          </div>
          : null
        }
      </div>
    );
  }
}

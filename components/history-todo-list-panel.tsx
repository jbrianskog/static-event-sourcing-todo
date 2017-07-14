import * as React from "react";
import { CompletedTodo, Todo } from "../domain/todo";
import { HistoryCompletedTodoList } from "./history-completed-todo-list";
import { HistoryTodoList } from "./history-todo-list";

export interface HistoryTodoListPanelProps {
  todos: Todo[];
  completedTodos: CompletedTodo[];
}

export class HistoryTodoListPanel extends React.PureComponent<HistoryTodoListPanelProps> {
  render() {
    return (
      <div>
        <h3 className="sr-only">To-dos</h3>
        <HistoryTodoList todos={this.props.todos} />
        {this.props.completedTodos.length
          ? <div>
            <h3 className="sr-only">Completed To-dos</h3>
            <HistoryCompletedTodoList todos={this.props.completedTodos}
            />
          </div>
          : null
        }
      </div>
    );
  }
}

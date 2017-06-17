import { Todo, CompletedTodo } from "../domain/todo";
import { templateClone, setContentElement } from "../utils";

export function todoTitleController(todo: Todo | CompletedTodo): DocumentFragment {
    let titleFragment = templateClone("todoTitleTemplate");
    setContentElement(titleFragment, "name", todo.name);
    if (todo.isCompleted) {
        let completionDateFragment = templateClone("todoCompletionDateTemplate");
        let date = new Date((todo as CompletedTodo).completionTimestamp);
        setContentElement(completionDateFragment, "completionDate", date.toLocaleDateString());
        titleFragment.appendChild(completionDateFragment);
    }
    return titleFragment;
}
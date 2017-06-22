import { Dependencies } from "../dependencies";
import { CompletedTodo, Todo } from "../domain/todo";
import { fillContentElements, templateClone } from "../utils";

export function todoTitleController(di: Dependencies, todo: Todo | CompletedTodo): DocumentFragment {
    let titleFragment = document.createDocumentFragment();
    titleFragment.textContent = todo.name;
    if (todo.isCompleted) {
        let completionDateFragment = templateClone("todoCompletionDateTemplate");
        let date = new Date((todo as CompletedTodo).completionTimestamp);
        fillContentElements(completionDateFragment, "completionDate", date.toLocaleDateString());
        titleFragment.appendChild(completionDateFragment);
    }
    return titleFragment;
}

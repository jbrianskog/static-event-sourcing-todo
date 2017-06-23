import { v4 as uuid } from "uuid";
import { invalidNameInputHandler } from "../app.common";
import { Dependencies } from "../dependencies";
import { TodoList } from "../domain/todo-list";
import { AggregateIdType, domainEventsByAggregate, postDomainEvents } from "../event-store";
import { todoListEvents } from "../read";
import { findElement, templateClone } from "../utils";

export function addTodoFormController(di: Dependencies, todoListId: AggregateIdType): DocumentFragment {
    let fragment = templateClone("addTodoFormTemplate");
    let addTodoForm = findElement(fragment, "#addTodoForm") as HTMLFormElement;
    let addTodoInput = findElement(addTodoForm, "#addTodoInput") as HTMLInputElement;
    $(addTodoInput).on("invalid", invalidNameInputHandler);
    // This is to deal with the possibility that the user opens the app for the first time in two tabs
    // and adds a to-do to each new TodoList. TodoList ids are generated when the first Todo is
    // added to them. So, on first load, there are no Todos and no TodoLists, and this handler
    // can't know whether to create a new TodoList or load one that might have been made in another tab.
    // So, if the current TodoList has no id -- i.e. no todos have been added -- we check if any other
    // tab has added a new TodoList and use that id.
    async function submit(): Promise<void> {
        let events = (todoListId)
            ? await domainEventsByAggregate(todoListId)
            : await todoListEvents();
        let todoList = new TodoList(events);
        todoList.add(uuid(), addTodoInput.value);
        addTodoForm.reset();
        // This assignment is only necessary when the first Todo is added to a new TodoList.
        todoListId = todoList.id;
        await postDomainEvents(todoList.uncommittedEvents);
        await di.refreshLists(di, todoListId);
    }
    $(addTodoForm).submit(e => {
        e.preventDefault();
        submit().catch(console.log);
    });
    return fragment;
}

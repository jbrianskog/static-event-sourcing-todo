import { templateClone, findControllerElement, findElement, getRequiredAttribute } from "../utils";
import { todoListPanelController } from "./todo-list-panel-controller";
import { completedTodoListPanelController } from "./completed-todo-list-panel-controller";
import { eventListController } from "./event-list-controller";
import { TodoList } from "../domain/todo-list";
import { DomainEvent, allDomainEvents, postDomainEvents, domainEventsByAggregate } from "../event-store";
import { v4 as uuid } from "uuid";
import { refreshLists, invalidNameInputHandler } from "../app.common";
import { todoListEvents } from "../read";

export function bodyController(events: DomainEvent[]): DocumentFragment {
    let fragment = templateClone("bodyTemplate");
    let todoList = new TodoList(events);
    let todoListId = todoList.id;
    let addTodoForm = findElement(fragment, "#addTodoForm") as HTMLFormElement;
    let addTodoInput = findElement(addTodoForm, "#addTodoInput") as HTMLInputElement;
    $(addTodoInput).on("invalid", invalidNameInputHandler);
    $(addTodoForm).submit(function (e) {
        e.preventDefault();
        // This is to deal with the possibility that the user opens the app for the first time in two tabs
        // and adds a to-do to each new TodoList. TodoList ids are generated when the first Todo is
        // added to them. So, on first load, there are no Todos and no TodoLists, and this handler
        // can't know whether to create a new TodoList or load one that might have been made in another tab.
        // So, if the current TodoList has no id -- i.e. no todos have been added -- we check if any other
        // tab has added a new TodoList and use that id.
        let eventsPromise = (todoListId)
            ? domainEventsByAggregate(todoListId)
            : todoListEvents();
        eventsPromise.then((events) => {
            let todoList = new TodoList(events);
            todoList.add(uuid(), addTodoInput.value);
            addTodoForm.reset();
            // This assignment is only necessary when the first Todo is added to a new TodoList.
            todoListId = todoList.id;
            return postDomainEvents(todoList.uncommittedEvents);
        }).then(() => refreshLists(todoListId));
    });
    let $todoListDelegatedEventTarget = $(findElement(fragment, "#todolistDelegatedEventTarget"));
    $todoListDelegatedEventTarget.on("submit", ".renameTodoForm", function (e) {
        e.preventDefault();
        domainEventsByAggregate(todoListId)
            .then(events => {
                let todoList = new TodoList(events);
                let todoName = $(e.currentTarget).find("input[name='name']").val();
                let todoId = getRequiredAttribute(e.currentTarget, "data-estd-todo-id");
                todoList.rename(todoId, todoName);
                return postDomainEvents(todoList.uncommittedEvents);
            }).then(() => refreshLists(todoListId));
    });
    // Need to handle keypress here because the completeTodoBtn is an <a> without an href,
    // so tabbing to it and pressing enter doesn't trigger a click event like it would with a <button>.
    // I want completeTodoBtn to act like a <button>, but it has another <button> inside of it (todoActionsBtn),
    // so browsers and Bootstrap styling wouldn't work if it was a <button> (HTML spec says no interactive content
    // inside interactive content). By using an <a> with no href I get the a.list-group-item Bootstrap styling.
    $todoListDelegatedEventTarget.on("click keypress", ".completeTodoBtn", function (e) {
        completeTodoBtnHandler(e, true);
    });
    $todoListDelegatedEventTarget.on("click keypress", ".uncompleteTodoBtn", function (e) {
        completeTodoBtnHandler(e, false);
    });
    function completeTodoBtnHandler(e: JQueryEventObject, isComplete: boolean): void {
        // only handle "enter" keypresses
        if (e.type === "keypress" && e.which !== 13) {
            return;
        }
        // short-circuit if this event has bubbled up from the todoActionsBtn (which is inside (un)complete todo buttons)
        var todoActionsBtn = $(e.currentTarget).find(".todoActionsBtn")[0];
        if (todoActionsBtn === e.target || $.contains(todoActionsBtn, e.target)) {
            return;
        }
        domainEventsByAggregate(todoListId)
            .then(events => {
                let todoList = new TodoList(events);
                let todoId = getRequiredAttribute(e.currentTarget, "data-estd-todo-id");
                if (isComplete) {
                    todoList.complete(todoId, Date.now());
                } else {
                    todoList.uncomplete(todoId);
                }
                return postDomainEvents(todoList.uncommittedEvents);
            }).then(() => refreshLists(todoListId));
    }
    $todoListDelegatedEventTarget.on("click", ".moveTodoUpBtn", function (e) {
        domainEventsByAggregate(todoListId)
            .then(events => {
                let todoList = new TodoList(events);
                let todoId = getRequiredAttribute(e.currentTarget, "data-estd-todo-id");
                todoList.changePosition(todoId, -1);
                return postDomainEvents(todoList.uncommittedEvents);
            }).then(() => refreshLists(todoListId));
    });
    $todoListDelegatedEventTarget.on("click", ".moveTodoDownBtn", function (e) {
        domainEventsByAggregate(todoListId)
            .then(events => {
                let todoList = new TodoList(events);
                let todoId = getRequiredAttribute(e.currentTarget, "data-estd-todo-id");
                todoList.changePosition(todoId, 1);
                return postDomainEvents(todoList.uncommittedEvents);
            }).then(() => refreshLists(todoListId));
    });
    $todoListDelegatedEventTarget.on("click", ".deleteTodoBtn", function (e) {
        domainEventsByAggregate(todoListId)
            .then(events => {
                let todoList = new TodoList(events);
                let todoId = getRequiredAttribute(e.currentTarget, "data-estd-todo-id");
                todoList.remove(todoId);
                return postDomainEvents(todoList.uncommittedEvents);
            }).then(() => refreshLists(todoListId));
    });
    $todoListDelegatedEventTarget.on("click", ".todoActionsBtn", function (e) {
        var $defaultPanel = $(e.currentTarget).closest(".todoPanelDefault"),
            $actionsPanel = $defaultPanel.next(),
            $bothPanels = $defaultPanel.add($actionsPanel),
            actionsBtnGroup = $actionsPanel.find(".todoActionsPanelBtnGroup")[0],
            eventNamespace = "click.todoActionsPanelClose:" + e.timeStamp.toString().replace(".", "");
        $bothPanels.toggle();

        // This handler will close (i.e. toggle) the ActionsPanel when the user clicks anywhere in the document outside of the actionsBtnGroup.
        // eventNamespace is unique (probably) so each instance of this handler can only detach itself.
        $(document).on(eventNamespace, function (closeEvent) {
            // Short-circuit when handler is triggered by event that created it.
            // This happens because this handler is created in the todolistDelegatedEventTarget handler but attached to the document.
            // So, when the todolistDelegatedEventTarget handler returns, the click event that triggered it will still bubble to the document.
            if (e.originalEvent === closeEvent.originalEvent) {
                return;
            }
            if (!$.contains(actionsBtnGroup, closeEvent.target)) {
                $bothPanels.toggle();
            }
            $(document).off(eventNamespace);
        });
    });
    $todoListDelegatedEventTarget.on("click", ".renameTodoBtn", function (e) {
        var $actionsPanel = $(e.currentTarget).closest(".todoActionsPanel");
        var $renamePanel = $actionsPanel.next();
        $actionsPanel.add($renamePanel).toggle();
        $renamePanel.find(".renameTodoBtnClickFocusTarget").first().focus();
    });
    $todoListDelegatedEventTarget.on("blur", ".renameTodoForm", function (e) {
        if (!(e.relatedTarget && $.contains(e.currentTarget, e.relatedTarget))) {
            var $renamePanel = $(e.currentTarget).closest(".todoRenamePanel");
            $renamePanel.prev().prev().add($renamePanel).toggle();
        }
    });

    findControllerElement(fragment, "todoListPanelController")
        .appendChild(todoListPanelController(todoList.todos));
    findControllerElement(fragment, "completedTodoListPanelController")
        .appendChild(completedTodoListPanelController(todoList.completedTodos));
    findControllerElement(fragment, "eventListController")
        .appendChild(eventListController(events));
    return fragment;
}
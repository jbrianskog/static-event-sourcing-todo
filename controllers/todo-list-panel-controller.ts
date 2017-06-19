import { Dependencies } from "../dependencies";
import { DomainEvent, domainEventsByAggregate, postDomainEvents, AggregateIdType } from "../event-store";
import { templateClone, findElement, getRequiredAttribute, fillControllerElements } from "../utils";
import { TodoList } from "../domain/todo-list";
import { todoIdDataAttrName } from "../app.common";

export function todoListPanelController(di: Dependencies, events: DomainEvent[]): DocumentFragment {
    let fragment = templateClone("todoListPanelTemplate");
    let todoList = new TodoList(events);
    let todoListId = todoList.id;
    let $todoListDelegatedEventTarget = $(findElement(fragment, "#todolistDelegatedEventTarget"));
    $todoListDelegatedEventTarget.on("submit", ".renameTodoForm", function (e) {
        e.preventDefault();
        domainEventsByAggregate(todoListId)
            .then(events => {
                let todoList = new TodoList(events);
                let todoName = $(e.currentTarget).find("input[name='name']").val();
                let todoId = getRequiredAttribute(e.currentTarget, todoIdDataAttrName);
                todoList.rename(todoId, todoName);
                return postDomainEvents(todoList.uncommittedEvents);
            }).then(() => refreshLists(di, todoListId));
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
                let todoId = getRequiredAttribute(e.currentTarget, todoIdDataAttrName);
                if (isComplete) {
                    todoList.complete(todoId, Date.now());
                } else {
                    todoList.uncomplete(todoId);
                }
                return postDomainEvents(todoList.uncommittedEvents);
            }).then(() => refreshLists(di, todoListId));
    }
    $todoListDelegatedEventTarget.on("click", ".moveTodoUpBtn", function (e) {
        domainEventsByAggregate(todoListId)
            .then(events => {
                let todoList = new TodoList(events);
                let todoId = getRequiredAttribute(e.currentTarget, todoIdDataAttrName);
                todoList.changePosition(todoId, -1);
                return postDomainEvents(todoList.uncommittedEvents);
            }).then(() => refreshLists(di, todoListId));
    });
    $todoListDelegatedEventTarget.on("click", ".moveTodoDownBtn", function (e) {
        domainEventsByAggregate(todoListId)
            .then(events => {
                let todoList = new TodoList(events);
                let todoId = getRequiredAttribute(e.currentTarget, todoIdDataAttrName);
                todoList.changePosition(todoId, 1);
                return postDomainEvents(todoList.uncommittedEvents);
            }).then(() => refreshLists(di, todoListId));
    });
    $todoListDelegatedEventTarget.on("click", ".deleteTodoBtn", function (e) {
        domainEventsByAggregate(todoListId)
            .then(events => {
                let todoList = new TodoList(events);
                let todoId = getRequiredAttribute(e.currentTarget, todoIdDataAttrName);
                todoList.remove(todoId);
                return postDomainEvents(todoList.uncommittedEvents);
            }).then(() => refreshLists(di, todoListId));
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

    fillControllerElements(fragment, "addTodoFormController", di.addTodoFormController(di, todoListId));
    fillControllerElements(fragment, "incompleteTodoListController", di.incompleteTodoListController(di, todoList.todos));
    fillControllerElements(fragment, "completedTodoListController", di.completedTodoListController(di, todoList.completedTodos));
    return fragment;
}

export function refreshLists(di: Dependencies, todoListId: AggregateIdType): Promise<void> {
    return domainEventsByAggregate(todoListId)
        .then(events => {
            let todoList = new TodoList(events);
            fillControllerElements(document, "incompleteTodoListController", di.incompleteTodoListController(di, todoList.todos));
            fillControllerElements(document, "completedTodoListController", di.completedTodoListController(di, todoList.completedTodos));
            fillControllerElements(document, "eventListController", di.eventListController(di, events));
        });
}
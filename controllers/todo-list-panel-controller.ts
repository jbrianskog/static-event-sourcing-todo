import { Dependencies } from "../dependencies";
import { DomainEvent, domainEventsByAggregate, postDomainEvents, AggregateIdType } from "../event-store";
import { templateClone, findElement, getRequiredAttribute, fillControllerElements } from "../utils";
import { TodoList } from "../domain/todo-list";
import { todoIdDataAttrName } from "../app.common";
import { v4 as uuid } from "uuid";

export function todoListPanelController(di: Dependencies, events: DomainEvent[]): DocumentFragment {
    let fragment = templateClone("todoListPanelTemplate");
    let todoList = new TodoList(events);
    let todoListId = todoList.id;
    let $todoListDelegatedEventTarget = $(findElement(fragment, "#todolistDelegatedEventTarget"));
    $todoListDelegatedEventTarget.on("submit", ".renameTodoForm", e => {
        e.preventDefault();
        domainEventsByAggregate(todoListId)
            .then(refreshEvents => {
                let refreshTodoList = new TodoList(refreshEvents);
                let todoName = $(e.currentTarget).find("input[name='name']").val();
                let todoId = getRequiredAttribute(e.currentTarget, todoIdDataAttrName);
                refreshTodoList.rename(todoId, todoName);
                return postDomainEvents(refreshTodoList.uncommittedEvents);
            }).then(() => di.refreshLists(di, todoListId))
            .catch(console.log);
    });
    // Need to handle keypress here because the completeTodoBtn is an <a> without an href,
    // so tabbing to it and pressing enter doesn't trigger a click event like it would with a <button>.
    // I want completeTodoBtn to act like a <button>, but it has another <button> inside of it (todoActionsBtn),
    // so browsers and Bootstrap styling wouldn't work if it was a <button> (HTML spec says no interactive content
    // inside interactive content). By using an <a> with no href I get the a.list-group-item Bootstrap styling.
    $todoListDelegatedEventTarget.on("click keypress", ".completeTodoBtn", e => {
        completeTodoBtnHandler(e, true);
    });
    $todoListDelegatedEventTarget.on("click keypress", ".uncompleteTodoBtn", e => {
        completeTodoBtnHandler(e, false);
    });
    function completeTodoBtnHandler(e: JQueryEventObject, isComplete: boolean): void {
        // only handle "enter" keypresses
        if (e.type === "keypress" && e.which !== 13) {
            return;
        }
        // short-circuit if this event has bubbled up from the todoActionsBtn (which is inside (un)complete todo buttons)
        let todoActionsBtn = $(e.currentTarget).find(".todoActionsBtn")[0];
        if (todoActionsBtn === e.target || $.contains(todoActionsBtn, e.target)) {
            return;
        }
        domainEventsByAggregate(todoListId)
            .then(refreshEvents => {
                let refreshTodoList = new TodoList(refreshEvents);
                let todoId = getRequiredAttribute(e.currentTarget, todoIdDataAttrName);
                if (isComplete) {
                    refreshTodoList.complete(todoId, Date.now());
                } else {
                    refreshTodoList.uncomplete(todoId);
                }
                return postDomainEvents(refreshTodoList.uncommittedEvents);
            }).then(() => di.refreshLists(di, todoListId))
            .catch(console.log);
    }
    $todoListDelegatedEventTarget.on("click", ".moveTodoUpBtn", e => {
        domainEventsByAggregate(todoListId)
            .then(refreshEvents => {
                let refreshTodoList = new TodoList(refreshEvents);
                let todoId = getRequiredAttribute(e.currentTarget, todoIdDataAttrName);
                refreshTodoList.changePosition(todoId, -1);
                return postDomainEvents(refreshTodoList.uncommittedEvents);
            }).then(() => di.refreshLists(di, todoListId))
            .catch(console.log);
    });
    $todoListDelegatedEventTarget.on("click", ".moveTodoDownBtn", e => {
        domainEventsByAggregate(todoListId)
            .then(refreshEvents => {
                let refreshTodoList = new TodoList(refreshEvents);
                let todoId = getRequiredAttribute(e.currentTarget, todoIdDataAttrName);
                refreshTodoList.changePosition(todoId, 1);
                return postDomainEvents(refreshTodoList.uncommittedEvents);
            }).then(() => di.refreshLists(di, todoListId))
            .catch(console.log);
    });
    $todoListDelegatedEventTarget.on("click", ".deleteTodoBtn", e => {
        domainEventsByAggregate(todoListId)
            .then(refreshEvents => {
                let refeshTodoList = new TodoList(refreshEvents);
                let todoId = getRequiredAttribute(e.currentTarget, todoIdDataAttrName);
                refeshTodoList.remove(todoId);
                return postDomainEvents(refeshTodoList.uncommittedEvents);
            }).then(() => di.refreshLists(di, todoListId))
            .catch(console.log);
    });
    $todoListDelegatedEventTarget.on("click", ".todoActionsBtn", e => {
        let $defaultPanel = $(e.currentTarget).closest(".todoPanelDefault");
        let $actionsPanel = $defaultPanel.next();
        let $bothPanels = $defaultPanel.add($actionsPanel);
        let actionsBtnGroup = $actionsPanel.find(".todoActionsPanelBtnGroup")[0];
        let eventNamespace = "click.todoActionsPanelClose:" + uuid();
        $bothPanels.toggle();

        // This handler will close (i.e. toggle) the ActionsPanel when the user clicks anywhere in the document outside of the actionsBtnGroup.
        // eventNamespace is unique (probably) so each instance of this handler can only detach itself.
        $(document).on(eventNamespace, closeEvent => {
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
    $todoListDelegatedEventTarget.on("click", ".renameTodoBtn", e => {
        let $actionsPanel = $(e.currentTarget).closest(".todoActionsPanel");
        let $renamePanel = $actionsPanel.next();
        $actionsPanel.add($renamePanel).toggle();
        $renamePanel.find(".renameTodoBtnClickFocusTarget").first().focus();
    });
    $todoListDelegatedEventTarget.on("blur", ".renameTodoForm", e => {
        if (!(e.relatedTarget && $.contains(e.currentTarget, e.relatedTarget))) {
            let $renamePanel = $(e.currentTarget).closest(".todoRenamePanel");
            $renamePanel.prev().prev().add($renamePanel).toggle();
        }
    });

    fillControllerElements(fragment, "addTodoFormController", di.addTodoFormController(di, todoListId));
    fillControllerElements(fragment, "incompleteTodoListController", di.incompleteTodoListController(di, todoList.todos));
    fillControllerElements(fragment, "completedTodoListController", di.completedTodoListController(di, todoList.completedTodos));
    return fragment;
}

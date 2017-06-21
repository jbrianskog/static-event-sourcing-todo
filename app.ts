import "./site.css";
import { fillControllerElements } from "./utils";
import { todoListEvents } from "./read";
import { Dependencies } from "./dependencies";
import { bodyController } from "./controllers/body-controller";
import { incompleteTodoListController } from "./controllers/incomplete-todo-list-controller";
import { completedTodoListController } from "./controllers/completed-todo-list-controller";
import { todoListController } from "./controllers/todo-list-controller";
import { todoListGroupController } from "./controllers/todo-list-group-controller";
import { todoController } from "./controllers/todo-controller";
import { todoTitlePanelController } from "./controllers/todo-title-panel-controller";
import { todoTitleController } from "./controllers/todo-title-controller";
import { todoActionsPanelController } from "./controllers/todo-actions-panel-controller";
import { todoActionsPanelButtonsController } from "./controllers/todo-actions-panel-buttons-controller";
import { todoRenamePanelController } from "./controllers/todo-rename-panel-controller";
import { eventListController } from "./controllers/event-list-controller";
import { eventListGroupController } from "./controllers/event-list-group-controller";
import { eventTextController } from "./controllers/event-text-controller";
import { addTodoFormController } from "./controllers/add-todo-form-controller";
import { todoListPanelController } from "./controllers/todo-list-panel-controller";
import { historyTodoListPanelController } from "./controllers/history-todo-list-panel-controller";
import { historyTodoController } from "./controllers/history-todo-controller";
import { historyTodoTitlePanelController } from "./controllers/history-todo-title-panel-controller";
import { refreshLists, refreshBody } from "./app.common";

if (!window.indexedDB) {
    window.alert("Your browser doesn't support IndexedDB (the browser feature this app uses to store your To-dos). Update your browser to its latest version.");
}

const di: Dependencies = {
    bodyController,
    todoListPanelController,
    addTodoFormController,
    incompleteTodoListController,
    completedTodoListController,
    todoListController,
    todoListGroupController,
    todoController,
    todoTitlePanelController,
    todoTitleController,
    todoActionsPanelController,
    todoActionsPanelButtonsController,
    todoRenamePanelController,
    eventListController,
    eventListGroupController,
    eventTextController,
    refreshLists,
    refreshBody,
    historyTodoListPanelController,
    historyTodoController,
    historyTodoTitlePanelController,
};

todoListEvents()
    .then(events => {
        fillControllerElements(document, "bodyController", di.bodyController(di, events));
    }).catch(console.log);

import "./site.css";
import { allDomainEvents, domainEventsByAggregate } from "./event-store";
import { bodyController } from "./controllers/body-controller";
import { fillControllerElements } from "./utils";
import { todoListEvents } from "./read";

if (!window.indexedDB) {
    window.alert("Your browser doesn't support IndexedDB (the browser feature this app uses to store your To-dos). Update your browser to its latest version.");
}

todoListEvents()
    .then(events => {
        fillControllerElements(document, "bodyController", bodyController(events));
    });
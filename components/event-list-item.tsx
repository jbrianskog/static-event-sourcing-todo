import * as React from "react";
import { DomainEvent, DomainEventType } from "../event-store";

export interface EventListItemProps {
  event: DomainEvent;
  showHistoryVersion(version: number): void;
}

export class EventListItem extends React.PureComponent<EventListItemProps> {
  showHistory: React.MouseEventHandler<HTMLButtonElement> = e => {
    this.props.showHistoryVersion(this.props.event.id);
  }
  render() {
    return (
      <button onClick={this.showHistory} className="list-group-item event-list-item">{this.props.event.id} : {DomainEventType[this.props.event.type]}</button>
    );
  }
}

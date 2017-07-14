import * as React from "react";
import OnClickOut, { InjectedOnClickOutProps } from "react-onclickoutside";
import { DomainEvent } from "../event-store";
import { EventListItem } from "./event-list-item";

export interface EventListProps {
  events: DomainEvent[];
  showHistoryVersion(version: number): void;
  showCurrentVersion(): void;
}

export class EventListInner extends React.PureComponent<EventListProps & InjectedOnClickOutProps> {
  handleClickOutside = () => {
    this.props.showCurrentVersion();
  }
  render() {
    return (
      <div className="list-group">
        {this.props.events.map(event =>
          <EventListItem
            key={event.id}
            event={event}
            showHistoryVersion={this.props.showHistoryVersion}
          />)}
      </div>
    );
  }
}

export const EventList = OnClickOut<EventListProps>(EventListInner);

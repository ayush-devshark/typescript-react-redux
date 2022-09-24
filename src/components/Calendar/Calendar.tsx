import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addZero } from '../../lib/utils';
import { RootState } from '../../redux/store';
import {
  selectUserEventsArray,
  loadUserEvents,
  UserEvent,
} from '../../redux/user-events';
import './Calendar.css';
import EventItem from './EventItem';

const mapState = (state: RootState) => ({
  events: selectUserEventsArray(state),
});

const mapDispatch = {
  loadUserEvents,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const createDayKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${year}-${addZero(month)}-${addZero(day)}`;
};

const groupEventsByDay = (events: UserEvent[]) => {
  const groups: Record<string, UserEvent[]> = {};

  const addToGroup = (dateKey: string, event: UserEvent) => {
    if (groups[dateKey] === undefined) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(event);
  };

  events.forEach((event) => {
    const dateStartKey = createDayKey(new Date(event.dateStart));
    const dateEndKey = createDayKey(new Date(event.dateEnd));

    addToGroup(dateStartKey, event);

    if (dateEndKey === dateStartKey) {
      addToGroup(dateEndKey, event);
    }
  });

  return groups;
};

const Calendar: React.FC<Props> = ({ events, loadUserEvents }) => {
  useEffect(() => {
    loadUserEvents();
  }, [loadUserEvents]);

  let groupEvents: ReturnType<typeof groupEventsByDay> | undefined;
  let sortedGroupKeys: string[] | undefined;

  if (events.length) {
    groupEvents = groupEventsByDay(events);
    sortedGroupKeys = Object.keys(groupEvents).sort(
      (date1, date2) => +new Date(date2) - +new Date(date1)
    );
  }

  return groupEvents && sortedGroupKeys ? (
    <div className="calendar">
      {sortedGroupKeys.map((dateKey) => {
        const events = groupEvents![dateKey];
        const groupDate = new Date(dateKey);
        const day = groupDate.getDate();
        const month = groupDate.toLocaleDateString(undefined, {
          month: 'long',
        });
        return (
          <div className="calendar-day">
            <div className="calendar-day-label">
              <span>
                {day} {month}
              </span>
            </div>
            <div className="calendar-events">
              {events.map((event) => (
                <EventItem event={event} key={`$event_${event.id}`} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p>Loading ...</p>
  );
};

export default connector(Calendar);

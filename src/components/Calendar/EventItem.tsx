import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteUserEvent,
  updateUserEvent,
  UserEvent,
} from '../../redux/user-events';

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(event.title);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };

  const handleTitleClick = () => {
    setEditable(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(updateUserEvent({ ...event, title }));
    }
    setEditable(false);
  };

  return (
    <div className="calendar-event" key={event.id}>
      <div className="calendar-event-info">
        <div className="calendar-event-time">10:00 - 12:00</div>
        <div className="calendar-event-title">
          {!editable ? (
            <span onClick={handleTitleClick}>{event.title}</span>
          ) : (
            <input
              type="text"
              value={title}
              ref={inputRef}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </div>
      </div>
      <button
        className="calendar-event-delete-button"
        onClick={handleDeleteClick}
      >
        &times;
      </button>
    </div>
  );
};

export default EventItem;

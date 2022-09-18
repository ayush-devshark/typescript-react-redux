import { AnyAction } from 'redux';

interface UserEvent {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

//normalizing the data
interface UserEventsState {
  byIds: Record<UserEvent['id'], UserEvent>;
  allIds: UserEvent['id'][];
}

const initialState: UserEventsState = {
  byIds: {},
  allIds: [],
};

const userEventReducer = (
  state: UserEventsState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userEventReducer;

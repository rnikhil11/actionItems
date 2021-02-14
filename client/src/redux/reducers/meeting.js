import { SET_PARTICIPANTS, SET_AS_HOST } from "../actionTypes";

const initialState = {
  participants: [],
  hosts: [],
};

const meeting = (state = initialState, action) => {
  switch (action.type) {
    case SET_PARTICIPANTS: {
      return {
        ...state,
        participants: action.value,
      };
    }
    case SET_AS_HOST: {
      return {
        ...state,
        hosts: [...state.hosts, action.value],
      };
    }
    default: {
      return state;
    }
  }
};

export default meeting;

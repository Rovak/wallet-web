import {Client} from "../services/api";

export const SET_WITNESSES = 'SET_WITNESSES';

export const setWitnesses = (witnesses = []) => ({
  type: SET_WITNESSES,
  witnesses,
});

export const loadWitnesses = () => async (dispatch, getState) => {
  dispatch(setWitnesses(await Client.getWitnesses()));
};

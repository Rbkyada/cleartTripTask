import { ADD_OR_REMOVE_NOTE, GET_USER, LOG_OUT } from '@Keys';
import { UserDefault } from '@Default/UserDefault';

export const getUserDetail = () => ({
  type: GET_USER,
});

export const userLogout = () => ({
  type: LOG_OUT,
});

export const addOrRemoveNotes = (payload: UserDefault) => ({
  type: ADD_OR_REMOVE_NOTE,
  payload,
});

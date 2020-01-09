import { createAction } from 'redux-actions';
import * as type from './actionTypes';

export const addTodo = createAction(type.ADD_TODO);

export const setVisibility = createAction(type.SET_VISIBILITY);

export const toggleTodo = createAction(type.TOGGLETODO);

export const deleteTodo = createAction(type.DELETE_TODO);
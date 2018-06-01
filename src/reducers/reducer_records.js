import { FETCH_RECORDS } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_RECORDS:
			return action.payload;
		default:
			return state;
	}
}
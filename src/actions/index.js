import { FETCH_RECORDS, ADD_RECORD, DELETE_RECORD } from './types';
import { fetchAllRecords, addRecord, deleteRecord } from '../fakeBackend/api.js';

export function fetchAllRecordsAction() {

    const request = fetchAllRecords();

    return {
        type: FETCH_RECORDS,
        payload: request
    };
}

export function addRecordAction({name, nickname, date, roomNr}, callback) {

    const request = addRecord({name, nickname, date, roomNr})
                    .then(() => callback());

    return {
        type: ADD_RECORD,
        payload: request
    };
}

export function deleteRecordAction(id, callback) {
    const request = deleteRecord(id)
                    .then(() => callback());

    return {
        type: DELETE_RECORD,
        payload: request
    };
}

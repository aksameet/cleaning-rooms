const getRecords = () => {
  const data = localStorage.getItem('itsg-interview-data');
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

const generateId = () => {
  const records = getRecords();
  if (records.length) {
    return records[records.length - 1].id + 1;
  }
  return 0;
};

export const fetchAllRecords = () => new Promise((resolve) => {
  setTimeout(() => resolve(getRecords()), 1000);
});

export const addRecord = ({name, nickname, date, roomNr}) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (!name || !name.trim().length) {
      reject(new Error('name required'));
    }
    if (!nickname || !nickname.trim().length) {
      reject(new Error('nickname required'));
    }
    if (!date) {
      reject(new Error('date required'));
    }
    if (typeof roomNr !== 'number') {
      reject(new Error('roomNr required'));
    }
    const records = getRecords();
    if (records.length > 0 && new Date(records[records.length - 1].date).getTime() > new Date(date).getTime()) {
      reject(new Error('date too old'));
    }

    if (records.some(record => record.roomNr === roomNr)) {
      reject (new Error('this room was already cleaned'));
    }

    const id = generateId();
    localStorage.setItem('itsg-interview-data', JSON.stringify([...records, {id, name, nickname, date, roomNr}]));
    resolve(id);
  }, 1000);
});

export const deleteRecord = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const records = getRecords();
    const newRecords = records.filter(record => record.id !== id);
    if (records.length !== newRecords.length + 1) {
      reject (new Error('such record doesn\'t exist'));

    }
    localStorage.setItem('itsg-interview-data', JSON.stringify(newRecords));
    resolve();
  }, 1000);
});